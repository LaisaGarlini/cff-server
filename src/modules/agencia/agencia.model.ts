import { Table, Column, Model, ForeignKey, BelongsTo, Default, DataType } from 'sequelize-typescript'
import { Usuario } from '../usuario/usuario.model'
import { Banco } from '../banco/banco.model'

@Table({
    tableName: 'agencia',
})
export class Agencia extends Model {
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

    @ForeignKey(() => Banco)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    banco_id!: number

    @Column({
        type: DataType.STRING(6),
        allowNull: false,
    })
    agencia!: string

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    ativo!: boolean

    @BelongsTo(() => Usuario)
    usuario!: Usuario

    @BelongsTo(() => Banco)
    banco!: Banco
}
