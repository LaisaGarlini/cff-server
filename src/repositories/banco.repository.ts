import { BancoDto } from '../dtos/banco'
import { Banco } from '../models/banco'

export const BancoRepository = {
    async findAll(): Promise<BancoDto[]> {
        return await Banco.findAll()
    },

    async findById(id: number): Promise<BancoDto | null> {
        return await Banco.findByPk(id)
    },

    async create(data: Omit<BancoDto, 'id'>): Promise<BancoDto> {
        return await Banco.create(data)
    },

    async update(data: Partial<BancoDto>): Promise<boolean> {
        const banco = await Banco.findByPk(data.id)

        if (banco) {
            await banco.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const banco = await Banco.findByPk(id)

        if (banco) {
            await Banco.destroy()
            return true
        }

        return false
    },
}
