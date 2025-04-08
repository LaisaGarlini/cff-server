import { BandeiraDto } from './bandeira.dto'
import { Bandeira } from '../bandeira/bandeira.model'

export const BandeiraRepository = {
    async findAll(): Promise<BandeiraDto[]> {
        return await Bandeira.findAll()
    },

    async findById(id: number): Promise<BandeiraDto | null> {
        return await Bandeira.findByPk(id)
    },

    async create(data: Omit<BandeiraDto, 'id'>): Promise<BandeiraDto> {
        return await Bandeira.create(data)
    },

    async update(data: Partial<BandeiraDto>): Promise<boolean> {
        const bandeira = await Bandeira.findByPk(data.id)

        if (bandeira) {
            await bandeira.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const bandeira = await Bandeira.findByPk(id)

        if (bandeira) {
            await bandeira.destroy()
            return true
        }

        return false
    },
}
