import { UsuarioRepository } from '../repositories/usuario.repository'

async function inserirDadosPadrao() {
    try {
        const usuario = await UsuarioRepository.create('Teste')

        console.log('Dados padrão inseridos com sucesso.')
    } catch (error) {
        console.error('Erro ao inserir dados padrão:', error)
    }
}

export { inserirDadosPadrao }
