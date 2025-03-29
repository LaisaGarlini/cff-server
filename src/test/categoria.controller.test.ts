import { Request, Response } from 'express';
import CategoriaController from '../controllers/categoria.controller';
import { CategoriaRepository } from '../repositories/categoria.repository';

jest.mock('../repositories/categoria.repository');

describe('CategoriaController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    responseObject = {};
    
    // Configurar o mock para rastrear chamadas encadeadas
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };
    
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar todas as categorias', async () => {
      const mockCategorias = [{ id: 1, nome: 'Teste', ativo: true }];
      (CategoriaRepository.findAll as jest.Mock).mockResolvedValue(mockCategorias);

      await CategoriaController.findAll(mockRequest as Request, mockResponse as Response);

      expect(CategoriaRepository.findAll).toHaveBeenCalled();
      // Verifica se json foi chamado com os valores esperados
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategorias);
      expect(responseObject).toEqual(mockCategorias);
    });

    it('deve retornar 404 se nenhuma categoria for encontrada', async () => {
      (CategoriaRepository.findAll as jest.Mock).mockResolvedValue([]);

      await CategoriaController.findAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject.message).toEqual('Nenhuma categoria encontrada.');
    });

    it('deve retornar 500 em caso de erro', async () => {
      const mockError = new Error('Erro de teste');
      (CategoriaRepository.findAll as jest.Mock).mockRejectedValue(mockError);

      await CategoriaController.findAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject.message).toEqual('Erro interno ao listar categorias.');
    });
  });

  describe('findById', () => {
    it('deve retornar uma categoria pelo ID', async () => {
      const mockCategoria = { id: 1, nome: 'Teste', ativo: true };
      mockRequest.params = { id: '1' };
      (CategoriaRepository.findById as jest.Mock).mockResolvedValue(mockCategoria);

      await CategoriaController.findById(mockRequest as Request, mockResponse as Response);

      expect(CategoriaRepository.findById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCategoria);
      expect(responseObject).toEqual(mockCategoria);
    });

    it('deve retornar 404 se a categoria não for encontrada', async () => {
      mockRequest.params = { id: '999' };
      (CategoriaRepository.findById as jest.Mock).mockResolvedValue(null);

      await CategoriaController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject.message).toEqual('Categoria com ID 999 não encontrada.');
    });

    it('deve retornar 500 em caso de erro', async () => {
      mockRequest.params = { id: '1' };
      const mockError = new Error('Erro de teste');
      (CategoriaRepository.findById as jest.Mock).mockRejectedValue(mockError);

      await CategoriaController.findById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject.message).toEqual('Erro interno ao buscar categoria.');
    });
  });

  describe('create', () => {
    it('deve criar uma nova categoria', async () => {
      const mockCategoria = { id: 1, usuario_id: 1, nome: 'Teste', ativo: true };
      mockRequest.body = { usuario_id: 1, nome: 'Teste', ativo: true };
      (CategoriaRepository.create as jest.Mock).mockResolvedValue(mockCategoria);

      await CategoriaController.create(mockRequest as Request, mockResponse as Response);

      expect(CategoriaRepository.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject.message).toEqual('Categoria criada com sucesso.');
      expect(responseObject.data).toEqual(mockCategoria);
    });

    // ... outros testes do create ...
  });

  describe('update', () => {
    it('deve atualizar uma categoria existente', async () => {
      const mockCategoria = { id: 1, usuario_id: 1, nome: 'Teste', ativo: true };
      mockRequest.params = { id: '1' };
      mockRequest.body = { nome: 'Teste Atualizado' };
      (CategoriaRepository.findById as jest.Mock).mockResolvedValue(mockCategoria);
      (CategoriaRepository.update as jest.Mock).mockResolvedValue(undefined);

      await CategoriaController.update(mockRequest as Request, mockResponse as Response);

      expect(CategoriaRepository.update).toHaveBeenCalledWith({ id: 1, nome: 'Teste Atualizado' });
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Categoria atualizada com sucesso.',
        data: mockCategoria,
      });
    });

    // ... outros testes do update ...
  });

  describe('delete', () => {
    it('deve deletar uma categoria existente', async () => {
      mockRequest.params = { id: '1' };
      (CategoriaRepository.delete as jest.Mock).mockResolvedValue(true);

      await CategoriaController.delete(mockRequest as Request, mockResponse as Response);

      expect(CategoriaRepository.delete).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Categoria deletada com sucesso.' });
    });

    // ... outros testes do delete ...
  });
});