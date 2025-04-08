import { Router } from 'express'
import SubcategoriaController from './subcategoria.controller'

const router = Router()

router.get('/subcategoria', SubcategoriaController.findAll)

router.get('/subcategoria/:id', SubcategoriaController.findById)

router.post('/subcategoria', SubcategoriaController.create)

router.put('/subcategoria/:id', SubcategoriaController.update)

router.delete('/subcategoria/:id', SubcategoriaController.delete)

export default router
