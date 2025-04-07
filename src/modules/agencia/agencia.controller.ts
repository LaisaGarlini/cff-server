import { Request, Response } from 'express'
import { AgenciaRepository } from './agencia.repository'

class AgenciaController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const agencias = await AgenciaRepository.findAll()
            if (agencias.length === 0) {
                res.status(404).json({ message: 'Nenhuma agência encontrada.' })
                return
            }
            res.json(agencias)
        } catch (error) {
            console.error('Erro ao listar agências:', error)
            res.status(500).json({
                message: 'Erro interno ao listar agências.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const agencia = await AgenciaRepository.findById(+id)
            if (!agencia) {
                res.status(404).json({ message: `Agência com ID ${id} não encontrada.` })
                return
            }
            res.json(agencia)
        } catch (error) {
            console.error('Erro ao buscar agência por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar agência.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, banco_id, agencia, ativo } = req.body

            if (!usuario_id || !banco_id || !agencia === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "banco_id" e "agencia" são obrigatórios.',
                })
                return
            }

            const novaAgencia = await AgenciaRepository.create({ usuario_id, banco_id, agencia, ativo })
            res.status(201).json({
                message: 'Agência criada com sucesso.',
                data: novaAgencia,
            })
        } catch (error) {
            console.error('Erro ao criar agência:', error)
            res.status(500).json({
                message: 'Erro interno ao criar agência.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, banco_id, agencia, ativo } = req.body

            if (!usuario_id && !banco_id && agencia && ativo === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "banco_id", "agencia" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const agenciaa = await AgenciaRepository.findById(+id)
            if (!agenciaa) {
                res.status(404).json({ message: `Agência com ID ${id} não encontrada.` })
                return
            }

            await AgenciaRepository.update({ id: +id, usuario_id, banco_id, agencia, ativo })
            res.json({
                message: 'Agência atualizada com sucesso.',
                data: agenciaa,
            })
        } catch (error) {
            console.error('Erro ao atualizar agência:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar agência.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const agenciaa = await AgenciaRepository.delete(+id)
            if (!agenciaa) {
                res.status(404).json({ message: `Agência com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Agência deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar agência:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar agência.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new AgenciaController()
