import { UsuarioDto } from './usuario.dto'
import { Usuario } from './usuario.model'

export const UsuarioRepository = {
    async findAll(): Promise<UsuarioDto[]> {
        return await Usuario.findAll()
    },

    async findById(id: number): Promise<UsuarioDto | null> {
        return await Usuario.findByPk(id)
    },

    async create(data: Omit<UsuarioDto, 'id'>): Promise<UsuarioDto> {
        return await Usuario.create(data)
    },

    async update(data: Partial<UsuarioDto>): Promise<boolean> {
        const usuarioInstance = await Usuario.findByPk(data.id)

        if (usuarioInstance) {
            await usuarioInstance.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const usuarioInstance = await Usuario.findByPk(id)

        if (usuarioInstance) {
            await usuarioInstance.destroy()
            return true
        }

        return false
    },
}
