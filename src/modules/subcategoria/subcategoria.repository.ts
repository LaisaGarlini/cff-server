import { SubcategoriaDto } from './subcategoria.dto'
import { Subcategoria } from './subcategoria.model'

export const SubcategoriaRepository = {
    async findAll(): Promise<SubcategoriaDto[]> {
        return await Subcategoria.findAll()
    },

    async findById(id: number): Promise<SubcategoriaDto | null> {
        return await Subcategoria.findByPk(id)
    },

    async create(data: Omit<SubcategoriaDto, 'id'>): Promise<SubcategoriaDto> {
        return await Subcategoria.create(data)
    },

    async update(data: Partial<SubcategoriaDto>): Promise<boolean> {
        const subcategoria = await Subcategoria.findByPk(data.id)

        if (subcategoria) {
            await subcategoria.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const subcategoria = await Subcategoria.findByPk(id)

        if (subcategoria) {
            await subcategoria.destroy()
            return true
        }

        return false
    },
}
