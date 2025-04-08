import { Request, Response } from 'express'
import { SubcategoriaRepository } from './subcategoria.repository'

class SubcategoriaController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const subcategorias = await SubcategoriaRepository.findAll()
            if (subcategorias.length === 0) {
                res.status(404).json({ message: 'Nenhuma subcategoria encontrada.' })
                return
            }
            res.json(subcategorias)
        } catch (error) {
            console.error('Erro ao listar subcategoria:', error)
            res.status(500).json({
                message: 'Erro interno ao listar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const subcategoria = await SubcategoriaRepository.findById(+id)
            if (!subcategoria) {
                res.status(404).json({ message: `Subcategoria com ID ${id} não encontrada.` })
                return
            }
            res.json(subcategoria)
        } catch (error) {
            console.error('Erro ao buscar subcategoria por ID:', error)
            res.status(500).json({
                message: 'Erro interno ao buscar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { usuario_id, categoria_id, nome, tipo, ativo } = req.body

            if (!usuario_id || !categoria_id || !nome || tipo === undefined) {
                res.status(400).json({
                    message: 'Os campos "usuario_id", "categoria_id", "nome" e "ativo" são obrigatórios.',
                })
                return
            }

            const novaSubcategoria = await SubcategoriaRepository.create({ usuario_id, categoria_id, nome, tipo, ativo })
            res.status(201).json({
                message: 'Subcategoria criada com sucesso.',
                data: novaSubcategoria,
            })
        } catch (error) {
            console.error('Erro ao criar subcategoria:', error)
            res.status(500).json({
                message: 'Erro interno ao criar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { usuario_id, categoria_id, nome, tipo, ativo } = req.body

            if (!usuario_id && !categoria_id && !nome && !tipo && ativo === undefined) {
                res.status(400).json({
                    message: 'Pelo menos um dos campos "usuario_id", "categoria_id", "nome", "tipo" ou "ativo" deve ser fornecido.',
                })
                return
            }

            const subcategoria = await SubcategoriaRepository.findById(+id)
            if (!subcategoria) {
                res.status(404).json({ message: `Subcategoria com ID ${id} não encontrada.` })
                return
            }

            await SubcategoriaRepository.update({ id: +id, usuario_id, categoria_id, nome, tipo, ativo })
            res.json({
                message: 'Subcategoria atualizada com sucesso.',
                data: subcategoria,
            })
        } catch (error) {
            console.error('Erro ao atualizar subcategoria:', error)
            res.status(500).json({
                message: 'Erro interno ao atualizar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const subcategoria = await SubcategoriaRepository.delete(+id)
            if (!subcategoria) {
                res.status(404).json({ message: `Subcategoria com ID ${id} não encontrada.` })
                return
            }
            res.json({ message: 'Subcategoria deletada com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar subcategoria:', error)
            res.status(500).json({
                message: 'Erro interno ao deletar subcategoria.',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined,
            })
        }
    }
}

export default new SubcategoriaController()
