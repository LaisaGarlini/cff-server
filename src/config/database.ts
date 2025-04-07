import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { Usuario } from '../modules/usuario/usuario.model'
import { Banco } from '../modules/banco/banco.model'
import { Agencia } from '../modules/agencia/agencia.model'
import { ContaFinanceira } from '../modules/conta_financeira/conta_financeira.model'
import { Portador } from '../models/portador.model'
import { Cartao } from '../models/cartao.model'
import { PortadorCartao } from '../models/portador_cartao.model'
import { Categoria } from '../modules/categoria/categoria.model'

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
    models: [Usuario, Banco, Agencia, ContaFinanceira, Portador, Cartao, PortadorCartao, Categoria],
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

            const categoria = await Categoria.create({
                usuario_id: usuario.id,
                nome: 'Categoria de Teste',
            })
        }
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error)
    }
}

sincronizarBancoDeDados()

export { sequelize }
