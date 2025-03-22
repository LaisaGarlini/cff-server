import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';

const router = Router();
const usuarioController = new UsuarioController();

router.post('/usuario', usuarioController.create);

router.get('/usuario', usuarioController.findAll);

router.get('/usuario/:id', usuarioController.findById);

router.put('/usuario/:id', usuarioController.update);

router.delete('/usuario/:id', usuarioController.delete);

export default router;
