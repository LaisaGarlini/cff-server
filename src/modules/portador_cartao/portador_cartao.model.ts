import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'
import { Usuario } from '../usuario/usuario.model'
import { Cartao } from '../cartao/cartao.model'
import { Portador } from '../portador/portador.model'

@Table({
    tableName: 'portador_cartao',
})
export class PortadorCartao extends Model {
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

    @ForeignKey(() => Portador)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    portador_id!: number

    @ForeignKey(() => Cartao)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cartao_id!: number

    @BelongsTo(() => Usuario)
    usuario!: Usuario

    @BelongsTo(() => Portador)
    portador!: Portador

    @BelongsTo(() => Cartao)
    cartao!: Cartao
}
