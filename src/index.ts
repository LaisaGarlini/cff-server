import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import UsuarioRoutes from './routes/usuario.routes';
import CategoriaRoutes from './routes/categoria.routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(UsuarioRoutes, CategoriaRoutes);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


async function testarConexao() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  // } finally {
  //   await sequelize.close();
  }
}

testarConexao();