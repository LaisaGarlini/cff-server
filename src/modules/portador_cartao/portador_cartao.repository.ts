import { PortadorCartaoDto } from './portador_cartao.dto'
import { PortadorCartao } from './portador_cartao.model'

export const PortadorCartaoRepository = {
    async findAll(): Promise<PortadorCartaoDto[]> {
        return await PortadorCartao.findAll()
    },

    async findById(id: number): Promise<PortadorCartaoDto | null> {
        return await PortadorCartao.findByPk(id)
    },

    async create(data: Omit<PortadorCartaoDto, 'id'>): Promise<PortadorCartaoDto> {
        return await PortadorCartao.create(data)
    },

    async update(data: Partial<PortadorCartaoDto>): Promise<boolean> {
        const portador_cartao = await PortadorCartao.findByPk(data.id)

        if (portador_cartao) {
            await portador_cartao.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const portador_cartao = await PortadorCartao.findByPk(id)

        if (portador_cartao) {
            await portador_cartao.destroy()
            return true
        }

        return false
    },
}
