import { Request, Response } from 'express';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { UsuarioDto } from '../dtos/usuario';

class UsuarioController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome }: UsuarioDto = req.body;

      if (!nome) {
        res.status(400).json({ message: 'Nome é obrigatório' });
        return;
      }

      // Crie o objeto conforme esperado pelo repositório
      const usuario = await UsuarioRepository.create({ nome });
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar o usuário', error });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await UsuarioRepository.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao listar os usuários', error });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await UsuarioRepository.findById(Number(id));

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

      // Corrigido para retornar um valor booleano
      const updated = await UsuarioRepository.update({ id: Number(id), nome });

      if (!updated) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await UsuarioRepository.delete(Number(id));

      if (!deleted) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar o usuário', error });
    }
  }
}

export default new UsuarioController();
