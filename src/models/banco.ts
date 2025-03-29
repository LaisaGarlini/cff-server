import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, Default, BelongsTo } from 'sequelize-typescript'
import { Usuario } from './usuario'

@Table({
    tableName: 'banco',
})
export class Banco extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @ForeignKey(() => Usuario)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    usuario_id!: number

    @AllowNull(false)
    @Column(DataType.STRING(150))
    nome!: string

    @AllowNull(false)
    @Default(true)
    @Column(DataType.BOOLEAN)
    ativo!: boolean

    @BelongsTo(() => Usuario)
    usuario!: Usuario
}
