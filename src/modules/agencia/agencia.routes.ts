import { Router } from 'express'
import AgenciaController from './agencia.controller'

const router = Router()

router.get('/agencia', AgenciaController.findAll)

router.get('/agencia/:id', AgenciaController.findById)

router.post('/agencia', AgenciaController.create)

router.put('/agencia/:id', AgenciaController.update)

router.delete('/agencia/:id', AgenciaController.delete)

export default router
