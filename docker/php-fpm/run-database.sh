#!/bin/bash

php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
