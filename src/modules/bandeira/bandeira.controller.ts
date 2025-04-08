import { Request, Response } from 'express'
import { BandeiraRepository } from './bandeira.repository'

class BandeiraController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const bandeiras = await BandeiraRepository.findAll()
            if (bandeiras.length === 0) {
                res.status(404).json({ message: 'Nenhuma bandeira encontrada.' })
                return
            }
            res.json(bandeiras)
        } catch (error) {
            console.error('Erro ao listar bandeiras:', error)
            res.status(500).json({
                message: 'Erro interno ao listar bandeiras.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const bandeira = await BandeiraRepository.findById(+id)
            if (!bandeira) {
                res.status(404).json({ message: `Bandeira com ID ${id} não encontrada.` })
                return
            }
            res.json(bandeira)
        } catch (error) {
            console.error('Erro ao buscar bandeira por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar bandeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, nome } = req.body

            if (!usuario_id || !nome === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id" e "nome" são obrigatórios.',
                })
                return
            }

            const novaBandeira = await BandeiraRepository.create({ usuario_id, nome })
            res.status(201).json({
                message: 'Bandeira criada com sucesso.',
                data: novaBandeira,
            })
        } catch (error) {
            console.error('Erro ao criar bandeira:', error)
            res.status(500).json({
                message: 'Erro interno ao criar bandeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, nome } = req.body

            if (!usuario_id && !nome === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id" ou "nome" deve ser fornecido.',
                })
                return
            }

            const bandeira = await BandeiraRepository.findById(+id)
            if (!bandeira) {
                res.status(404).json({ message: `Bandeira com ID ${id} não encontrada.` })
                return
            }

            await BandeiraRepository.update({ id: +id, usuario_id, nome })
            res.json({
                message: 'Bandeira atualizada com sucesso.',
                data: bandeira,
            })
        } catch (error) {
            console.error('Erro ao atualizar bandeira:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar bandeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const bandeira = await BandeiraRepository.delete(+id)
            if (!bandeira) {
                res.status(404).json({ message: `Bandeira com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Bandeira deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar bandeira:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar bandeira.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new BandeiraController()
