import { Table, Column, Model, ForeignKey, BelongsTo, Default, DataType } from 'sequelize-typescript'
import { Usuario } from '../usuario/usuario.model'

@Table({
    tableName: 'bandeira',
})
export class Bandeira extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    usuario_id!: number

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    nome!: string

    @BelongsTo(() => Usuario)
    usuario!: Usuario
}
