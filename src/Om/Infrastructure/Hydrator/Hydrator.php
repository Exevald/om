<?php

declare(strict_types=1);

namespace App\Om\Infrastructure\Hydrator;

class Hydrator
{
    private array $reflectionMap = [];

    /**
     * @param string $class
     * @param array $data
     * @return mixed
     * @throws \ReflectionException
     */
    public function hydrate(string $class, array $data)
    {
        $reflection = $this->getReflection($class);

        $result = $reflection->newInstanceWithoutConstructor();
        foreach ($data as $name => $value)
        {
            $prop = $reflection->getProperty($name);
            if (!$prop->isPublic())
            {
                $prop->setAccessible(true);
            }
            $prop->setValue($result, $value);
        }
        return $result;
    }

    /**
     * @param string $class
     * @return \ReflectionClass
     * @throws \ReflectionException
     */
    private function getReflection(string $class): \ReflectionClass
    {
        if (!array_key_exists($class, $this->reflectionMap))
        {
            $this->reflectionMap[$class] = new \ReflectionClass($class);
        }
        return $this->reflectionMap[$class];
    }
}