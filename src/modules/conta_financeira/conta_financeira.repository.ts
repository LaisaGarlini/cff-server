import { ContaFinanceiraDto } from './conta_financeira.dto'
import { ContaFinanceira } from './conta_financeira.model'

export const ContaFinanceiraRepository = {
    async findAll(): Promise<ContaFinanceiraDto[]> {
        return await ContaFinanceira.findAll()
    },

    async findById(id: number): Promise<ContaFinanceiraDto | null> {
        return await ContaFinanceira.findByPk(id)
    },

    async create(data: Omit<ContaFinanceiraDto, 'id'>): Promise<ContaFinanceiraDto> {
        return await ContaFinanceira.create(data)
    },

    async update(data: Partial<ContaFinanceiraDto>): Promise<boolean> {
        const conta_financeira = await ContaFinanceira.findByPk(data.id)

        if (conta_financeira) {
            await conta_financeira.update(data)
            return true
        }

        return false
    },

    async delete(id: number): Promise<boolean> {
        const conta_financeira = await ContaFinanceira.findByPk(id)

        if (conta_financeira) {
            await conta_financeira.destroy()
            return true
        }

        return false
    },
}
