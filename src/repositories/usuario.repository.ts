import { UsuarioDto } from '../dtos/usuario';
import { Usuario } from '../models/usuario';

export class UsuarioRepository {
  async create(nome: string): Promise<Usuario> {
    return Usuario.create({nome});
  }

  async findAll(): Promise<Usuario[]> {
    return Usuario.findAll();
  }

  async findById(id: number): Promise<Usuario | null> {
    return Usuario.findByPk(id);
  }

  async update(id: number, nome: string): Promise<number[]> {
    return await Usuario.update({ nome }, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return Usuario.destroy({ where: { id } });
  }
}
