import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sequelize } from './config/database'
import UsuarioRoutes from './modules/usuario/usuario.routes'
import BancoRoutes from './modules/banco/banco.routes'
import AgenciaRoutes from './modules/agencia/agencia.routes'
import CategoriaRoutes from './modules/categoria/categoria.routes'
import ContaFinanceiraRoutes from './modules/conta_financeira/conta_financeira.routes'
import CartaoRoutes from './modules/cartao/cartao.routes'
import PortadorRoutes from './modules/portador/portador.routes'
import PortadorCartaoRoutes from './modules/portador_cartao/portador_cartao.routes'
import BandeiraRoutes from './modules/bandeira/bandeira.routes'
import SubcategoriaRoutes from './modules/subcategoria/subcategoria.routes'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(
    UsuarioRoutes,
    BancoRoutes,
    AgenciaRoutes,
    ContaFinanceiraRoutes,
    BandeiraRoutes,
    CartaoRoutes,
    PortadorRoutes,
    PortadorCartaoRoutes,
    CategoriaRoutes,
    SubcategoriaRoutes,
)

app.get('/', (req, res) => {
    res.send('Hello from backend!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

async function testarConexao() {
    try {
        await sequelize.authenticate()
        console.log('Conexão com o banco de dados estabelecida com sucesso.')
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error)
        // } finally {
        //   await sequelize.close();
    }
}

testarConexao()
