import { Request, Response } from 'express'
import { BancoRepository } from './banco.repository'

class BancoController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const bancos = await BancoRepository.findAll()
            if (bancos.length === 0) {
                res.status(404).json({ message: 'Nenhum banco encontrado.' })
                return
            }
            res.json(bancos)
        } catch (error) {
            console.error('Erro ao listar bancos:', error)
            res.status(500).json({
                message: 'Erro interno ao listar bancos.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const banco = await BancoRepository.findById(+id)
            if (!banco) {
                res.status(404).json({ message: `Banco com ID ${id} não encontrado.` })
                return
            }
            res.json(banco)
        } catch (error) {
            console.error('Erro ao buscar banco por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar banco.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, nome, ativo } = req.body

            if (!usuario_id || !nome || ativo === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "nome" e "ativo" são obrigatórios.',
                })
                return
            }

            const novoBanco = await BancoRepository.create({ usuario_id, nome, ativo })
            res.status(201).json({
                message: 'Banco criado com sucesso.',
                data: novoBanco,
            })
        } catch (error) {
            console.error('Erro ao criar banco:', error)
            res.status(500).json({
                message: 'Erro interno ao criar banco.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, nome, ativo } = req.body

            if (!usuario_id && !nome && ativo === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "nome" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const banco = await BancoRepository.findById(+id)
            if (!banco) {
                res.status(404).json({ message: `Banco com ID ${id} não encontrado.` })
                return
            }

            await BancoRepository.update({ id: +id, usuario_id, nome, ativo })
            res.json({
                message: 'Banco atualizada com sucesso.',
                data: banco,
            })
        } catch (error) {
            console.error('Erro ao atualizar banco:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar banco.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const banco = await BancoRepository.delete(+id)
            if (!banco) {
                res.status(404).json({ message: `Banco com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Banco deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar banco:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar banco.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new BancoController()
