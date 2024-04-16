/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const RolesController = () => import('#controllers/roles_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.jobs() // /jobs

router
  .group(() => {
    router.get('/health', ({ response }) => {
      return response.status(200).json('Server running normaly.')
    })
    router
      .group(() => {
        router.post('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])
      })
      .prefix('auth')

    router
      .group(() => {
        router.get('/', [RolesController, 'index'])
        router.post('/', [RolesController, 'store'])
        router.get('/:id', [RolesController, 'show'])
        router.put('/:id', [RolesController, 'update'])
        router.delete('/:id', [RolesController, 'delete'])
      })
      .prefix('roles')
      .use(middleware.auth({ guards: ['api'] }))

    router
      .group(() => {
        router.get('/', [UsersController, 'index'])
        router.post('/', [UsersController, 'store'])
        router.get('/:id', [UsersController, 'show'])
        router.put('/:id', [UsersController, 'update'])
        router.delete('/:id', [UsersController, 'delete'])
      })
      .prefix('users')
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')
