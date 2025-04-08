import { Router } from 'express'
import CartaoController from './cartao.controller'

const router = Router()

router.get('/cartao', CartaoController.findAll)

router.get('/cartao/:id', CartaoController.findById)

router.post('/cartao', CartaoController.create)

router.put('/cartao/:id', CartaoController.update)

router.delete('/cartao/:id', CartaoController.delete)

export default router
