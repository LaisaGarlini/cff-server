import { Router } from 'express'
import BancoController from '../controllers/banco.controller'

const router = Router()

router.get('/banco', BancoController.findAll)

router.get('/banco/:id', BancoController.findById)

router.post('/banco', BancoController.create)

router.put('/banco/:id', BancoController.update)

router.delete('/banco/:id', BancoController.delete)

export default router
