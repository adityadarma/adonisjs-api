/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import RolesController from '#controllers/roles_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.group(() => {
    router.get('/', [RolesController, 'index'])
    router.post('/', [RolesController, 'store'])
    router.get('/:id', [RolesController, 'show'])
    router.put('/:id', [RolesController, 'update'])
    router.delete('/:id', [RolesController, 'delete'])
  }).prefix('roles')

  router.group(() => {
    router.get('/', [UsersController, 'index'])
    router.post('/', [UsersController, 'store'])
    router.get('/:id', [UsersController, 'show'])
    router.put('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
  }).prefix('users')
}).prefix('api')
