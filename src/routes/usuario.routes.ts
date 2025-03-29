import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controller';

const router = Router();

router.post('/usuario', UsuarioController.create);

router.get('/usuario', UsuarioController.findAll);

router.get('/usuario/:id', UsuarioController.findById);

router.put('/usuario/:id', UsuarioController.update);

router.delete('/usuario/:id', UsuarioController.delete);

export default router;
