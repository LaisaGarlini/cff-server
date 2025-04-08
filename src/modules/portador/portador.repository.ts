import { PortadorDto } from './portador.dto'
import { Portador } from './portador.model'

export const PortadorRepository = {
    async findAll(): Promise<PortadorDto[]> {
        return await Portador.findAll()
    },

    async findById(id: number): Promise<PortadorDto | null> {
        return await Portador.findByPk(id)
    },

    async create(data: Omit<PortadorDto, 'id'>): Promise<PortadorDto> {
        return await Portador.create(data)
    },

    async update(data: Partial<PortadorDto>): Promise<boolean> {
        const portador = await Portador.findByPk(data.id)

        if (portador) {
            await portador.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const portador = await Portador.findByPk(id)

        if (portador) {
            await portador.destroy()
            return true
        }

        return false
    },
}
