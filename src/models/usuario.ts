import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'usuario',
})
export class Usuario extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  nome!: string;
}