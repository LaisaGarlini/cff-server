import { UsuarioRepository } from '../repositories/usuario.repository';

async function inserirDadosPadrao() {
    const usuarioRepository = new UsuarioRepository;
  try {
    const usuario = await usuarioRepository.create('Teste')

    console.log('Dados padrão inseridos com sucesso.');
  } catch (error) {
    console.error('Erro ao inserir dados padrão:', error);
  }
}

export { inserirDadosPadrao };