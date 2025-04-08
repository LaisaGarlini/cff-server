import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { Usuario } from '../modules/usuario/usuario.model'
import { Banco } from '../modules/banco/banco.model'
import { Agencia } from '../modules/agencia/agencia.model'
import { ContaFinanceira } from '../modules/conta_financeira/conta_financeira.model'
import { Portador } from '../modules/portador/portador.model'
import { Cartao } from '../modules/cartao/cartao.model'
import { PortadorCartao } from '../modules/portador_cartao/portador_cartao.model'
import { Categoria } from '../modules/categoria/categoria.model'
import { Bandeira } from '../modules/bandeira/bandeira.model'
import { Subcategoria } from '../modules/subcategoria/subcategoria.model'

dotenv.config()

process.env.TZ = 'America/Sao_Paulo'

const isDev = process.env.NODE_ENV === 'development'
const deveRecriarTabelas = isDev && process.env.RECRIAR_TABELAS === 'true'

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    models: [Usuario, Banco, Agencia, ContaFinanceira, Portador, Cartao, PortadorCartao, Bandeira, Categoria, Subcategoria],
    logging: false,
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true,
    },
    timezone: '-03:00',
    define: {
        timestamps: true,
        underscored: true,
        createdAt: 'data_criacao',
        updatedAt: 'data_atualizacao',
        // paranoid: true, // Ativar deleted_at para soft delete (opcional)
        // deletedAt: 'data_exclusao',
    },
})

async function sincronizarBancoDeDados() {
    try {
        await sequelize.sync({ force: deveRecriarTabelas })
        console.log('Banco de dados sincronizado.')

        if (deveRecriarTabelas) {
            console.log('Tabelas recriadas. Inserindo dados padrão...')

            const usuario = await Usuario.create({
                nome: 'Usuário de Teste',
            })

            const banco = await Banco.create({
                usuario_id: usuario.id,
                nome: 'Banco de Teste',
            })

            const agencia = await Agencia.create({
                usuario_id: usuario.id,
                banco_id: banco.id,
                agencia: '123',
                ativo: '1',
            })

            const conta_financeira = await ContaFinanceira.create({
                usuario_id: usuario.id,
                agencia_id: agencia.id,
                nome: 'Conta de Teste',
                numero: '123456',
                tipo: 1,
                ativo: true,
            })

            const bandeira = await Bandeira.create({
                usuario_id: usuario.id,
                nome: 'Bandeira de Teste',
            })

            const cartao = await Cartao.create({
                usuario_id: usuario.id,
                conta_financeira_id: conta_financeira.id,
                bandeira_id: bandeira.id,
                apelido: 'Cartão de Teste',
                tipo: 1,
                ativo: true,
                principal: true,
            })

            const portador = await Portador.create({
                usuario_id: usuario.id,
                conta_financeira_id: conta_financeira.id,
                nome: 'Portador de Teste',
                tipo: 1,
                ativo: true,
            })

            const portador_cartao = await PortadorCartao.create({
                usuario_id: usuario.id,
                portador_id: portador.id,
                cartao_id: cartao.id,
            })

            const categoria = await Categoria.create({
                usuario_id: usuario.id,
                nome: 'Categoria de Teste',
            })

            const subcategoria = await Subcategoria.create({
                usuario_id: usuario.id,
                categoria_id: categoria.id,
                nome: 'Subcategoria de Teste',
                tipo: 1,
                ativo: true,
            })
        }
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error)
    }
}

sincronizarBancoDeDados()

export { sequelize }
