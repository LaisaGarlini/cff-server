import { Request, Response } from 'express'
import { CategoriaRepository } from './categoria.repository'

class CategoriaController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const categorias = await CategoriaRepository.findAll()
            if (categorias.length === 0) {
                res.status(404).json({ message: 'Nenhuma categoria encontrada.' })
                return
            }
            res.json(categorias)
        } catch (error) {
            console.error('Erro ao listar categorias:', error)
            res.status(500).json({
                message: 'Erro interno ao listar categorias.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const categoria = await CategoriaRepository.findById(+id)
            if (!categoria) {
                res.status(404).json({ message: `Categoria com ID ${id} não encontrada.` })
                return
            }
            res.json(categoria)
        } catch (error) {
            console.error('Erro ao buscar categoria por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar categoria.',
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

            const novaCategoria = await CategoriaRepository.create({ usuario_id, nome, ativo })
            res.status(201).json({
                message: 'Categoria criada com sucesso.',
                data: novaCategoria,
            })
        } catch (error) {
            console.error('Erro ao criar categoria:', error)
            res.status(500).json({
                message: 'Erro interno ao criar categoria.',
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

            const categoria = await CategoriaRepository.findById(+id)
            if (!categoria) {
                res.status(404).json({ message: `Categoria com ID ${id} não encontrada.` })
                return
            }

            await CategoriaRepository.update({ id: +id, usuario_id, nome, ativo })
            res.json({
                message: 'Categoria atualizada com sucesso.',
                data: categoria,
            })
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar categoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const categoria = await CategoriaRepository.delete(+id)
            if (!categoria) {
                res.status(404).json({ message: `Categoria com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Categoria deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar categoria:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar categoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new CategoriaController()
