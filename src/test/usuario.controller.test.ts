import { Request, Response } from 'express'
import UsuarioController from '../controllers/usuario.controller'
import { UsuarioRepository } from '../repositories/usuario.repository'

jest.mock('../repositories/usuario.repository')

describe('UsuarioController', () => {
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let responseObject: any

    beforeEach(() => {
        mockRequest = {}
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockImplementation((result) => {
                responseObject = result
                return mockResponse
            }),
        }
        responseObject = {}
        jest.clearAllMocks()
    })

    describe('create', () => {
        it('deve criar um novo usuário', async () => {
            const mockUsuario = { id: 1, nome: 'Teste' }
            mockRequest.body = { nome: 'Teste' }
            ;(UsuarioRepository.create as jest.Mock).mockResolvedValue(mockUsuario)

            await UsuarioController.create(mockRequest as Request, mockResponse as Response)

            expect(UsuarioRepository.create).toHaveBeenCalledWith({ nome: 'Teste' })
            expect(mockResponse.status).toHaveBeenCalledWith(201)
            expect(responseObject).toEqual(mockUsuario)
        })

        it('deve retornar 400 se o nome estiver faltando', async () => {
            mockRequest.body = {}

            await UsuarioController.create(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(400)
            expect(responseObject.message).toEqual('Nome é obrigatório')
        })

        it('deve retornar 500 em caso de erro', async () => {
            mockRequest.body = { nome: 'Teste' }
            const mockError = new Error('Erro de teste')
            ;(UsuarioRepository.create as jest.Mock).mockRejectedValue(mockError)

            await UsuarioController.create(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(responseObject.message).toEqual('Erro ao criar o usuário')
        })
    })

    describe('findAll', () => {
        it('deve retornar todos os usuários', async () => {
            const mockUsuarios = [{ id: 1, nome: 'Teste' }]
            ;(UsuarioRepository.findAll as jest.Mock).mockResolvedValue(mockUsuarios)

            await UsuarioController.findAll(mockRequest as Request, mockResponse as Response)

            expect(UsuarioRepository.findAll).toHaveBeenCalled()
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(responseObject).toEqual(mockUsuarios)
        })

        it('deve retornar 500 em caso de erro', async () => {
            const mockError = new Error('Erro de teste')
            ;(UsuarioRepository.findAll as jest.Mock).mockRejectedValue(mockError)

            await UsuarioController.findAll(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(responseObject.message).toEqual('Erro ao listar os usuários')
        })
    })

    describe('findById', () => {
        it('deve retornar um usuário pelo ID', async () => {
            const mockUsuario = { id: 1, nome: 'Teste' }
            mockRequest.params = { id: '1' }
            ;(UsuarioRepository.findById as jest.Mock).mockResolvedValue(mockUsuario)

            await UsuarioController.findById(mockRequest as Request, mockResponse as Response)

            expect(UsuarioRepository.findById).toHaveBeenCalledWith(1)
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(responseObject).toEqual(mockUsuario)
        })

        it('deve retornar 404 se o usuário não for encontrado', async () => {
            mockRequest.params = { id: '999' }
            ;(UsuarioRepository.findById as jest.Mock).mockResolvedValue(null)

            await UsuarioController.findById(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(404)
            expect(responseObject.message).toEqual('Usuário não encontrado')
        })

        it('deve retornar 500 em caso de erro', async () => {
            mockRequest.params = { id: '1' }
            const mockError = new Error('Erro de teste')
            ;(UsuarioRepository.findById as jest.Mock).mockRejectedValue(mockError)

            await UsuarioController.findById(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(responseObject.message).toEqual('Erro ao buscar o usuário')
        })
    })

    describe('update', () => {
        it('deve atualizar um usuário existente', async () => {
            mockRequest.params = { id: '1' }
            mockRequest.body = { nome: 'Teste Atualizado' }
            ;(UsuarioRepository.update as jest.Mock).mockResolvedValue(true)

            await UsuarioController.update(mockRequest as Request, mockResponse as Response)

            expect(UsuarioRepository.update).toHaveBeenCalledWith({ id: 1, nome: 'Teste Atualizado' })
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(responseObject.message).toEqual('Usuário atualizado com sucesso')
        })

        it('deve retornar 404 se o usuário não for encontrado', async () => {
            mockRequest.params = { id: '999' }
            mockRequest.body = { nome: 'Teste Atualizado' }
            ;(UsuarioRepository.update as jest.Mock).mockResolvedValue(false)

            await UsuarioController.update(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(404)
            expect(responseObject.message).toEqual('Usuário não encontrado')
        })

        it('deve retornar 500 em caso de erro', async () => {
            mockRequest.params = { id: '1' }
            mockRequest.body = { nome: 'Teste Atualizado' }
            const mockError = new Error('Erro de teste')
            ;(UsuarioRepository.update as jest.Mock).mockRejectedValue(mockError)

            await UsuarioController.update(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(responseObject.message).toEqual('Erro ao atualizar o usuário')
        })
    })

    describe('delete', () => {
        it('deve deletar um usuário existente', async () => {
            mockRequest.params = { id: '1' }
            ;(UsuarioRepository.delete as jest.Mock).mockResolvedValue(true)

            await UsuarioController.delete(mockRequest as Request, mockResponse as Response)

            expect(UsuarioRepository.delete).toHaveBeenCalledWith(1)
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(responseObject.message).toEqual('Usuário deletado com sucesso')
        })

        it('deve retornar 404 se o usuário não for encontrado', async () => {
            mockRequest.params = { id: '999' }
            ;(UsuarioRepository.delete as jest.Mock).mockResolvedValue(false)

            await UsuarioController.delete(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(404)
            expect(responseObject.message).toEqual('Usuário não encontrado')
        })

        it('deve retornar 500 em caso de erro', async () => {
            mockRequest.params = { id: '1' }
            const mockError = new Error('Erro de teste')
            ;(UsuarioRepository.delete as jest.Mock).mockRejectedValue(mockError)

            await UsuarioController.delete(mockRequest as Request, mockResponse as Response)

            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(responseObject.message).toEqual('Erro ao deletar o usuário')
        })
    })
})
