import { Request, Response } from 'express'
import { CartaoRepository } from './cartao.repository'
import { CartaoDto } from './cartao.dto'

class CartaoController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const cartoes = await CartaoRepository.findAll()
            if (cartoes.length === 0) {
                res.status(404).json({ message: 'Nenhum cartão encontrado.' })
                return
            }
            res.json(cartoes)
        } catch (error) {
            console.error('Erro ao listar cartões:', error)
            res.status(500).json({
                message: 'Erro interno ao listar cartões.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const cartao = await CartaoRepository.findById(+id)
            if (!cartao) {
                res.status(404).json({ message: `Cartão com ID ${id} não encontrado.` })
                return
            }
            res.json(cartao)
        } catch (error) {
            console.error('Erro ao buscar cartão por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, conta_financeira_id, bandeira_id, apelido, tipo, ativo, principal }: CartaoDto = req.body

            if (!usuario_id || !conta_financeira_id || !bandeira_id || !apelido || !tipo === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "conta_financeira_id", "apelido", e "tipo" são obrigatórios.',
                })
                return
            }

            const novoCartao = await CartaoRepository.create({
                usuario_id,
                conta_financeira_id,
                bandeira_id,
                apelido,
                tipo,
                ativo,
                principal,
            })
            res.status(201).json({
                message: 'Cartão criado com sucesso.',
                data: novoCartao,
            })
        } catch (error) {
            console.error('Erro ao criar cartão:', error)
            res.status(500).json({
                message: 'Erro interno ao criar cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, conta_financeira_id, bandeira_id, apelido, tipo, ativo, principal } = req.body

            if (!usuario_id && !conta_financeira_id && !bandeira_id && apelido && tipo && ativo && principal === undefined) {
                res.status(400).json({
                    message:
                        'Pelo menos um dos campos "usuario_id", "conta_financeira_id", "bandeira_id", "apelido", "tipo", "ativo" ou "principal" deve ser fornecido.',
                })
                return
            }

            const cartao = await CartaoRepository.findById(+id)
            if (!cartao) {
                res.status(404).json({ message: `Cartão com ID ${id} não encontrado.` })
                return
            }

            await CartaoRepository.update({ id: +id, usuario_id, conta_financeira_id, apelido, tipo, ativo, principal })
            res.json({
                message: 'Cartão atualizado com sucesso.',
                data: cartao,
            })
        } catch (error) {
            console.error('Erro ao atualizar cartão:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const cartaoDeletado = await CartaoRepository.delete(+id)
            if (!cartaoDeletado) {
                res.status(404).json({ message: `Cartão com ID ${id} não encontrado.` })
                return
            }
            res.json({ message: 'Cartão deletado com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar cartão:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar cartão.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new CartaoController()
