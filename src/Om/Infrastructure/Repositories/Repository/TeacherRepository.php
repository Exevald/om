<?php

namespace App\Om\Infrastructure\Repositories\Repository;

use App\Common\ErrorType;
use App\Om\Domain\Entity\Teacher;
use App\Om\Domain\Entity\TeacherRepositoryInterface;
use App\Om\Infrastructure\Generator\AccessKeyGenerator;
use App\Om\Infrastructure\Repositories\Entity\Teacher as ORMTeacher;
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
        $hydrator = new Hydrator();
        return $hydrator->hydrate(Teacher::class, [
                "firstName" => $ORMTeacher->getFirstName(),
                "lastName" => $ORMTeacher->getLastName(),
                "email" => $ORMTeacher->getEmail(),
                "password" => $ORMTeacher->getPassword(),
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

        $entityManager->persist($ORMTeacher);
        $entityManager->flush();
    }

    public function update(Teacher $teacher): void
    {
        $entityManager = $this->getEntityManager();
        $ORMTeacher = $this->find($teacher->getId());

        $ORMTeacher->setFirstName($teacher->getFirstName());
        $ORMTeacher->setLastName($teacher->getLastName());
        $ORMTeacher->setEmail($teacher->getEmail());
        $ORMTeacher->setPassword($teacher->getPassword());

        $entityManager->flush();
    }

    public function takeNewId(): int
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery('SELECT max(a.id)
                                                  FROM App\Om\Infrastructure\Repositories\Entity\Teacher a'
        );

        return $query->getResult()[0][1] + 1;
    }

}
