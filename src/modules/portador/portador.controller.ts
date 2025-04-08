import { Request, Response } from 'express'
import { PortadorRepository } from './portador.repository'
import { PortadorDto } from './portador.dto'

class PortadorController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const portadores = await PortadorRepository.findAll()
            if (portadores.length === 0) {
                res.status(404).json({ message: 'Nenhum portador encontrado.' })
                return
            }
            res.json(portadores)
        } catch (error) {
            console.error('Erro ao listar portadores:', error)
            res.status(500).json({
                message: 'Erro interno ao listar portadores.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const portador = await PortadorRepository.findById(+id)
            if (!portador) {
                res.status(404).json({ message: `Portador com ID ${id} não encontrado.` })
                return
            }
            res.json(portador)
        } catch (error) {
            console.error('Erro ao buscar portador por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar portador.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, conta_financeira_id, nome, tipo, ativo }: PortadorDto = req.body

            if (!usuario_id || !conta_financeira_id || !nome || !tipo || !ativo === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "conta_financeira_id", "nome", e "tipo" são obrigatórios.',
                })
                return
            }

            const novoPortador = await PortadorRepository.create({ usuario_id, conta_financeira_id, nome, tipo, ativo })
            res.status(201).json({
                message: 'Portador criado com sucesso.',
                data: novoPortador,
            })
        } catch (error) {
            console.error('Erro ao criar portador:', error)
            res.status(500).json({
                message: 'Erro interno ao criar portador.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, conta_financeira_id, nome, tipo, ativo } = req.body

            if (!usuario_id && !conta_financeira_id && nome && tipo && ativo === undefined) {
                res.status(400).json({
                    message:
                        'Pelo menos um dos campos "usuario_id", "conta_financeira_id", "nome", "tipo", "ativo" ou "principal" deve ser fornecido.',
                })
                return
            }

            const portador = await PortadorRepository.findById(+id)
            if (!portador) {
                res.status(404).json({ message: `Portador com ID ${id} não encontrado.` })
                return
            }

            await PortadorRepository.update({ id: +id, nome })
            res.json({
                message: 'Portador atualizado com sucesso.',
                data: portador,
            })
        } catch (error) {
            console.error('Erro ao atualizar portador:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar portador.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const portadorDeletado = await PortadorRepository.delete(+id)
            if (!portadorDeletado) {
                res.status(404).json({ message: `Portador com ID ${id} não encontrado.` })
                return
            }
            res.json({ message: 'Portador deletado com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar portador:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar portador.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new PortadorController()
