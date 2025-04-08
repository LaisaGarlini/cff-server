import { Router } from 'express'
import BandeiraController from './bandeira.controller'

const router = Router()

router.get('/bandeira', BandeiraController.findAll)

router.get('/bandeira/:id', BandeiraController.findById)

router.post('/bandeira', BandeiraController.create)

router.put('/bandeira/:id', BandeiraController.update)

router.delete('/bandeira/:id', BandeiraController.delete)

export default router
