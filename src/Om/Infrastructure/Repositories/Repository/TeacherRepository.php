<?php

namespace App\Om\Infrastructure\Repositories\Repository;

use App\Common\ErrorType;
use App\Om\Domain\Entity\Teacher;
use App\Om\Domain\Entity\TeacherRepositoryInterface;
use App\Om\Infrastructure\Generator\AccessKeyGenerator;
use App\Om\Infrastructure\Repositories\Entity\Group;
use App\Om\Infrastructure\Repositories\Entity\Teacher as ORMTeacher;
use App\Om\Infrastructure\Repositories\Entity\TeacherGroup as ORMTeacherGroup;
use App\Om\Infrastructure\Hydrator\Hydrator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Exception;

/**
 * @extends ServiceEntityRepository<ORMTeacher>
 *
 * @method ORMTeacher|null find($id, $lockMode = null, $lockVersion = null)
 * @method ORMTeacher|null findOneBy(array $criteria, array $orderBy = null)
 * @method ORMTeacher[]    findAll()
 * @method ORMTeacher[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TeacherRepository extends ServiceEntityRepository implements TeacherRepositoryInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ORMTeacher::class);
    }

    public function createEmailToken(int $teacherId): string
    {
        $entityManager = $this->getEntityManager();
        $ORMTeacher = $this->find($teacherId);
        if (empty($ORMTeacher)) {
            throw new Exception("Element with index " . $teacherId . " is not exists", 500);
        }
        $generator = new AccessKeyGenerator();
        $token = $generator->generateAccessKey();
        $entityManager->flush();

        return $token;
    }

    public function checkExitedEmail(string $email): bool
    {
        $ORMTeacher = $this->findBy(['email' => $email]);
        return isset($ORMTeacher[0]);
    }

    public function get(int $id): Teacher
    {
        $ORMTeacher = $this->find($id);
        if (empty($ORMTeacher)) {
            throw new Exception("Element with current index " . $id . " does not exist", ErrorType::NOT_FOUND->value);
        }
        $entityManager = $this->getEntityManager()->getRepository(Group::class)->getEntityManager();
        $query = $entityManager->createQuery('SELECT g.id
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Group g INNER JOIN App\Om\Infrastructure\Repositories\Entity\TeacherGroup teacher_group
                                                  WHERE teacher_group.teacher_id = :id AND g.id = teacher_group.group_id
                                                  ORDER BY g.id ASC'
        )->setParameter('id', $id);
        $groupResult = $query->getResult();
        $groupsList = [];
        if (!empty($groupResult)) {
            for ($i = 0; $i < count($groupResult); $i++) {
                $groupId = $groupResult[$i]["id"];
                if (!is_int($groupId)) {
                    throw new Exception("groupId is not integer", 420);
                }
                $groupsList[] = $groupId;
            }
        }
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Teacher::class, [
                "firstName" => $ORMTeacher->getFirstName(),
                "lastName" => $ORMTeacher->getLastName(),
                "email" => $ORMTeacher->getEmail(),
                "password" => $ORMTeacher->getPassword(),
                "groupIdList" => $groupsList,
                "id" => $ORMTeacher->getId(),
            ]
        );
    }

    public function store(Teacher $teacher): void
    {
        $ORMTeacher = new ORMTeacher();
        $entityManager = $this->getEntityManager();

        $ORMTeacher->setId($teacher->getId());
        $ORMTeacher->setFirstName($teacher->getFirstName());
        $ORMTeacher->setLastName($teacher->getLastName());
        $ORMTeacher->setEmail($teacher->getEmail());
        $ORMTeacher->setPassword($teacher->getPassword());

        $generator = new AccessKeyGenerator();
        $token = $generator->generateAccessKey();
        $ORMTeacher->setLoginKey($token);

        $entityManager->persist($ORMTeacher);
        $entityManager->flush();
        $this->addGroupAffiliation($teacher->getId(), $teacher->getGroupIdList());
    }

    public function update(Teacher $teacher): void
    {
        $entityManager = $this->getEntityManager();
        $ORMTeacher = $this->find($teacher->getId());

        $ORMTeacher->setId($teacher->getId());
        $ORMTeacher->setFirstName($teacher->getFirstName());
        $ORMTeacher->setLastName($teacher->getLastName());
        $ORMTeacher->setEmail($teacher->getEmail());
        $ORMTeacher->setPassword($teacher->getPassword());
        $this->updateGroupAffiliation($teacher->getId(), $teacher->getGroupIdList());
        $entityManager->persist($ORMTeacher);
        $entityManager->flush();
    }

    public function updateGroupAffiliation(int $teacherId, array $groupsList): void
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('DELETE
                                                  FROM App\Om\Infrastructure\Repositories\Entity\TeacherGroup teacher_group
                                                  WHERE teacher_group.teacher_id = :id'
        )->setParameter('id', $teacherId);
        $query->getResult();
        foreach ($groupsList as $groupId) {
            $ORMTeacherGroup = new ORMTeacherGroup();
            $ORMTeacherGroup->setTeacherId($teacherId);
            $ORMTeacherGroup->setGroupId($groupId);
            $entityManager->persist($ORMTeacherGroup);
            $entityManager->flush();
        }
    }

    public function addGroupAffiliation(int $teacherId, array $groupsList): void
    {
        $entityManager = $this->getEntityManager()->getRepository(Group::class)->getEntityManager();
        foreach ($groupsList as $groupId) {
            $ORMTeacherGroup = new ORMTeacherGroup();
            $ORMTeacherGroup->setTeacherId($teacherId);
            $ORMTeacherGroup->setGroupId($groupId);
            $entityManager->persist($ORMTeacherGroup);
            $entityManager->flush();
        }
    }

    public function takeNewId(): int
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery('SELECT max(t.id)
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Teacher t'
        );
        return $query->getResult()[0][1] + 1;
    }

}
