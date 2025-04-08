import { CartaoDto } from './cartao.dto'
import { Cartao } from './cartao.model'

export const CartaoRepository = {
    async findAll(): Promise<CartaoDto[]> {
        return await Cartao.findAll()
    },

    async findById(id: number): Promise<CartaoDto | null> {
        return await Cartao.findByPk(id)
    },

    async create(data: Omit<CartaoDto, 'id'>): Promise<CartaoDto> {
        return await Cartao.create(data)
    },

    async update(data: Partial<CartaoDto>): Promise<boolean> {
        const cartao = await Cartao.findByPk(data.id)

        if (cartao) {
            await cartao.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const cartao = await Cartao.findByPk(id)

        if (cartao) {
            await cartao.destroy()
            return true
        }

        return false
    },
}
