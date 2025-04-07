import { Router } from 'express'
import CategoriaController from './categoria.controller'

const router = Router()

router.get('/categoria', CategoriaController.findAll)

router.get('/categoria/:id', CategoriaController.findById)

router.post('/categoria', CategoriaController.create)

router.put('/categoria/:id', CategoriaController.update)

router.delete('/categoria/:id', CategoriaController.delete)

export default router
