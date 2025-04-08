export interface SubcategoriaDto {
    id?: number
    usuario_id: number
    categoria_id: number
    nome: string
    tipo: number // 1 = Receita/Entrada; 2 = Despesa/Saída
    ativo: boolean
}
