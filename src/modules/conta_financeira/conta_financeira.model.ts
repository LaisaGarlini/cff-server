import { Table, Column, Model, ForeignKey, BelongsTo, Default, DataType } from 'sequelize-typescript'
import { Usuario } from '../usuario/usuario.model'
import { Agencia } from '../agencia/agencia.model'

@Table({
    tableName: 'conta_financeira',
})
export class ContaFinanceira extends Model {
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

    @ForeignKey(() => Agencia)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    agencia_id!: number

    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    nome!: string

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    numero!: string

    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
        comment: '1 - Corrente, 2 - Poupança, 3 - Conta Salário, 4 - Investimentos',
    })
    tipo!: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    ativo!: boolean

    @BelongsTo(() => Usuario)
    usuario!: Usuario

    @BelongsTo(() => Agencia)
    agencia!: Agencia
}
