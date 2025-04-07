import { CategoriaDto } from './categoria.dto'
import { Categoria } from './categoria.model'

export const CategoriaRepository = {
    async findAll(): Promise<CategoriaDto[]> {
        return await Categoria.findAll()
    },

    async findById(id: number): Promise<CategoriaDto | null> {
        return await Categoria.findByPk(id)
    },

    async create(data: Omit<CategoriaDto, 'id'>): Promise<CategoriaDto> {
        return await Categoria.create(data)
    },

    async update(data: Partial<CategoriaDto>): Promise<boolean> {
        const categoria = await Categoria.findByPk(data.id)

        if (categoria) {
            await categoria.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const categoria = await Categoria.findByPk(id)

        if (categoria) {
            await categoria.destroy()
            return true
        }

        return false
    },
}
