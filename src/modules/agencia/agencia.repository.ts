import { AgenciaDto } from './agencia.dto'
import { Agencia } from '../agencia/agencia.model'

export const AgenciaRepository = {
    async findAll(): Promise<AgenciaDto[]> {
        return await Agencia.findAll()
    },

    async findById(id: number): Promise<AgenciaDto | null> {
        return await Agencia.findByPk(id)
    },

    async create(data: Omit<AgenciaDto, 'id'>): Promise<AgenciaDto> {
        return await Agencia.create(data)
    },

    async update(data: Partial<AgenciaDto>): Promise<boolean> {
        const Agenciaa = await Agencia.findByPk(data.id)

        if (Agenciaa) {
            await Agenciaa.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const Agenciaa = await Agencia.findByPk(id)

        if (Agenciaa) {
            await Agenciaa.destroy()
            return true
        }

        return false
    },
}
