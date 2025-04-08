import { Router } from 'express'
import PortadorCartaoController from './portador_cartao.controller'

const router = Router()

router.get('/portador_cartao', PortadorCartaoController.findAll)

router.get('/portador_cartao/:id', PortadorCartaoController.findById)

router.post('/portador_cartao', PortadorCartaoController.create)

router.put('/portador_cartao/:id', PortadorCartaoController.update)

router.delete('/portador_cartao/:id', PortadorCartaoController.delete)

export default router
