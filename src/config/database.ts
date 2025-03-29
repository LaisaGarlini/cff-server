import { Sequelize } from 'sequelize-typescript'
import { Usuario } from '../models/usuario'
import dotenv from 'dotenv'
import { Categoria } from '../models/categoria'
import { Banco } from '../models/banco'

dotenv.config()

const isDev = process.env.NODE_ENV === 'development'
const deveRecriarTabelas = isDev && process.env.RECRIAR_TABELAS === 'true'

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    models: [Usuario, Categoria, Banco],
    logging: false,
    //   logging: isDev ? console.log : false,
})

async function sincronizarBancoDeDados() {
    try {
        // await sequelize.authenticate();
        await sequelize.sync({ force: deveRecriarTabelas })
        console.log('Banco de dados sincronizado.')
        if (deveRecriarTabelas) {
            console.log('Tabelas recriadas. Inserindo dados padrão...')

            const usuario = await Usuario.create({
                nome: 'Usuário de Teste',
            })

            const categoria = await Categoria.create({
                nome: 'Categoria de Teste',
                usuario_id: usuario.id,
            })

            const banco = await Banco.create({
                nome: 'Banco de Teste',
                usuario_id: usuario.id,
            })
        }
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error)
    }
}

sincronizarBancoDeDados()

export { sequelize }
