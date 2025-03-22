import { Request, Response } from 'express';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { UsuarioDto } from '../dtos/usuario';

const usuarioRepository = new UsuarioRepository();

export class UsuarioController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome }: UsuarioDto = req.body;
      if (!nome) {
        res.status(400).json({ message: 'Nome é obrigatório'})
      }
      const usuario = await usuarioRepository.create(nome);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar o usuário', error });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await usuarioRepository.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar os usuários', error });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await usuarioRepository.findById(Number(id));
      if (!usuario) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        res.status(200).json(usuario);
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o usuário', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome }: UsuarioDto = req.body;
      const [updatedCount, updatedUsuarios] = await usuarioRepository.update(Number(id), nome);
      if (updatedCount === 0) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        res.status(200).json(updatedUsuarios);
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCount = await usuarioRepository.delete(Number(id));
      if (deletedCount === 0) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar o usuário', error });
    }
  }
}
