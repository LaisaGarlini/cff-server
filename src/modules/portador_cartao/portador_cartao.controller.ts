import { Request, Response } from 'express'
import { PortadorCartaoRepository } from './portador_cartao.repository'
import { PortadorCartaoDto } from './portador_cartao.dto'

class PortadorCartaoController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const portadores_cartoes = await PortadorCartaoRepository.findAll()
            if (portadores_cartoes.length === 0) {
                res.status(404).json({ message: 'Nenhum portador-cartão encontrado.' })
                return
            }
            res.json(portadores_cartoes)
        } catch (error) {
            console.error('Erro ao listar portadores-cartões:', error)
            res.status(500).json({
                message: 'Erro interno ao listar portadores-cartões.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const portadores_cartoes = await PortadorCartaoRepository.findById(+id)
            if (!portadores_cartoes) {
                res.status(404).json({ message: `Portador-cartão com ID ${id} não encontrado.` })
                return
            }
            res.json(portadores_cartoes)
        } catch (error) {
            console.error('Erro ao buscar portador-cartão por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar portador-cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, portador_id, cartao_id }: PortadorCartaoDto = req.body

            if (!usuario_id || !portador_id || !cartao_id === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "portador_id" e "cartao_id" são obrigatórios.',
                })
                return
            }

            const novoPortadorCartao = await PortadorCartaoRepository.create({ usuario_id, portador_id, cartao_id })
            res.status(201).json({
                message: 'Portador-cartão criado com sucesso.',
                data: novoPortadorCartao,
            })
        } catch (error) {
            console.error('Erro ao criar portador-cartão:', error)
            res.status(500).json({
                message: 'Erro interno ao criar portador-cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, portador_id, cartao_id } = req.body

            if (!usuario_id && !portador_id && cartao_id === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "portador_id" ou "cartao_id" deve ser fornecido.',
                })
                return
            }

            const conta_financeira = await PortadorCartaoRepository.findById(+id)
            if (!conta_financeira) {
                res.status(404).json({ message: `Portador-cartão com ID ${id} não encontrado.` })
                return
            }

            await PortadorCartaoRepository.update({ id: +id, usuario_id, portador_id, cartao_id })
            res.json({
                message: 'Portador-cartão atualizado com sucesso.',
                data: conta_financeira,
            })
        } catch (error) {
            console.error('Erro ao atualizar portador-cartão:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar portador-cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const portadorCartaoDeletado = await PortadorCartaoRepository.delete(+id)
            if (!portadorCartaoDeletado) {
                res.status(404).json({ message: `Portador-cartão com ID ${id} não encontrado.` })
                return
            }
            res.json({ message: 'Portador-cartão deletado com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar portador-cartão:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar portador-cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new PortadorCartaoController()
