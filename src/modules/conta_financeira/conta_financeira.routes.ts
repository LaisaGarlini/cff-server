import { Router } from 'express'
import ContaFinanceiraController from './conta_financeira.controller'

const router = Router()

router.get('/conta_financeira', ContaFinanceiraController.findAll)

router.get('/conta_financeira/:id', ContaFinanceiraController.findById)

router.post('/conta_financeira', ContaFinanceiraController.create)

router.put('/conta_financeira/:id', ContaFinanceiraController.update)

router.delete('/conta_financeira/:id', ContaFinanceiraController.delete)

export default router
