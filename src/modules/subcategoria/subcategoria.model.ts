import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, Default, BelongsTo } from 'sequelize-typescript'
import { Usuario } from '../usuario/usuario.model'
import { Categoria } from '../categoria/categoria.model'

@Table({
    tableName: 'subcategoria',
})
export class Subcategoria extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @ForeignKey(() => Usuario)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    usuario_id!: number

    @ForeignKey(() => Categoria)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    categoria_id!: number

    @AllowNull(false)
    @Column(DataType.STRING(150))
    nome!: string

    @AllowNull(false)
    @Column({ type: DataType.INTEGER, comment: '1 = Receita/Entrada; 2 = Despesa/Saída' })
    tipo!: number

    @AllowNull(false)
    @Default(true)
    @Column(DataType.BOOLEAN)
    ativo!: boolean

    @BelongsTo(() => Usuario)
    usuario!: Usuario

    @BelongsTo(() => Categoria)
    categoria!: Categoria
}
