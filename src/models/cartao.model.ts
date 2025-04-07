import { Table, Column, Model, ForeignKey, BelongsTo, Default, DataType, Scopes, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import { Usuario } from '../modules/usuario/usuario.model'
import { ContaFinanceira } from '../modules/conta_financeira/conta_financeira.model'
import { Op } from 'sequelize'

@Table({
    tableName: 'cartao',
    indexes: [
        {
            unique: true,
            fields: ['conta_financeira_id', 'principal'],
            where: {
                principal: true,
            },
            name: 'unique_conta_financeira_id_principal',
        },
    ],
})
export class Cartao extends Model {
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
    apelido!: string

    @Column({
        type: DataType.SMALLINT,
        allowNull: false,
        comment: '1 = Débito; 2 = Crédito; 3 = Débito e Crédito',
    })
    tipo!: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    ativo!: boolean

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    principal!: boolean

    @BelongsTo(() => Usuario)
    usuario!: Usuario

    @BelongsTo(() => ContaFinanceira)
    conta_financeira!: ContaFinanceira

    @BeforeCreate
    @BeforeUpdate
    static async checkPrincipalCartao(instance: Cartao) {
        if (instance.principal) {
            const existingPrincipal = await Cartao.findOne({
                where: {
                    conta_financeira_id: instance.conta_financeira_id,
                    principal: true,
                    id: { [Op.ne]: instance.id || null },
                },
            })

            if (existingPrincipal) {
                throw new Error('Já existe um cartão principal para esta conta financeira')
            }
        }
    }
}
