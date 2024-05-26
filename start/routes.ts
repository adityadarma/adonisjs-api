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
const ProductCategoriesController = () => import('#controllers/product_categories_controller')
const ProductsController = () => import('#controllers/products_controller')
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
        router.post('/logout', [AuthController, 'logout']).use(middleware.auth({ guards: ['api'] }))
        router.get('/me', [AuthController, 'me']).use(middleware.auth({ guards: ['api'] }))
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

      router
      .group(() => {
        router.get('/', [ProductCategoriesController, 'index'])
        router.post('/', [ProductCategoriesController, 'store'])
        router.get('/:id', [ProductCategoriesController, 'show'])
        router.put('/:id', [ProductCategoriesController, 'update'])
        router.delete('/:id', [ProductCategoriesController, 'delete'])
      })
      .prefix('product-categories')
      .use(middleware.auth({ guards: ['api'] }))

      router
      .group(() => {
        router.get('/', [ProductsController, 'index'])
        router.post('/', [ProductsController, 'store'])
        router.get('/:id', [ProductsController, 'show'])
        router.put('/:id', [ProductsController, 'update'])
        router.delete('/:id', [ProductsController, 'delete'])
      })
      .prefix('products')
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('api')
