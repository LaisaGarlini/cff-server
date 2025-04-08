import { Table, Column, Model, ForeignKey, BelongsTo, Default, DataType } from 'sequelize-typescript'
import { Usuario } from '../usuario/usuario.model'
import { ContaFinanceira } from '../conta_financeira/conta_financeira.model'

@Table({
    tableName: 'portador',
})
export class Portador extends Model {
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

    @ForeignKey(() => ContaFinanceira)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    conta_financeira_id!: number

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    nome!: string

    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
        comment: '1 = Pix; 2 = Cartão de Crédito; 3 = Cartão de Débito; 4 = Cartão de Débito e Crédito; 5 = Dinheiro',
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

    @BelongsTo(() => ContaFinanceira)
    conta_financeira!: ContaFinanceira
}
