import { Router } from 'express'
import PortadorController from './portador.controller'

const router = Router()

router.get('/portador', PortadorController.findAll)

router.get('/portador/:id', PortadorController.findById)

router.post('/portador', PortadorController.create)

router.put('/portador/:id', PortadorController.update)

router.delete('/portador/:id', PortadorController.delete)

export default router
