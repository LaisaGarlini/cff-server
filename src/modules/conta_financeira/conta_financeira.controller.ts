import { Request, Response } from 'express'
import { ContaFinanceiraRepository } from './conta_financeira.repository'

class ContaFinanceiraController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const contas_financeiras = await ContaFinanceiraRepository.findAll()
            if (contas_financeiras.length === 0) {
                res.status(404).json({ message: 'Nenhuma conta financeira encontrada.' })
                return
            }
            res.json(contas_financeiras)
        } catch (error) {
            console.error('Erro ao listar contas financeiras:', error)
            res.status(500).json({
                message: 'Erro interno ao listar contas financeiras.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const conta_financeira = await ContaFinanceiraRepository.findById(+id)
            if (!conta_financeira) {
                res.status(404).json({ message: `Conta financeira com ID ${id} não encontrada.` })
                return
            }
            res.json(conta_financeira)
        } catch (error) {
            console.error('Erro ao buscar conta financeira por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar conta financeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, agencia_id, nome, numero, tipo, ativo } = req.body

            if (!usuario_id || !agencia_id || !nome || !numero || !tipo || !ativo === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "agencia_id", "nome", "numero" e "tipo" são obrigatórios.',
                })
                return
            }

            const novaContaFinanceira = await ContaFinanceiraRepository.create({ usuario_id, agencia_id, nome, numero, tipo, ativo })
            res.status(201).json({
                message: 'Conta financeira criada com sucesso.',
                data: novaContaFinanceira,
            })
        } catch (error) {
            console.error('Erro ao criar conta financeira:', error)
            res.status(500).json({
                message: 'Erro interno ao criar conta financeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, agencia_id, nome, numero, tipo, ativo } = req.body

            if (!usuario_id && !agencia_id && nome && numero && tipo && ativo === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "agencia_id", "nome", "numero" ou "tipo" deve ser fornecido.',
                })
                return
            }

            const conta_financeira = await ContaFinanceiraRepository.findById(+id)
            if (!conta_financeira) {
                res.status(404).json({ message: `Conta financeira com ID ${id} não encontrada.` })
                return
            }

            await ContaFinanceiraRepository.update({ id: +id, usuario_id, agencia_id, nome, numero, tipo, ativo })
            res.json({
                message: 'cConta financeira atualizada com sucesso.',
                data: conta_financeira,
            })
        } catch (error) {
            console.error('Erro ao atualizar conta financeira:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar conta financeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const conta_financeira = await ContaFinanceiraRepository.delete(+id)
            if (!conta_financeira) {
                res.status(404).json({ message: `Conta financeira com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Conta financeira deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar conta financeira:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar conta financeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new ContaFinanceiraController()
