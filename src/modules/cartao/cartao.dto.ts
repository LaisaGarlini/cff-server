export interface CartaoDto {
    id?: number
    usuario_id: number
    conta_financeira_id: number
    bandeira_id: number
    apelido: string
    tipo: number
    ativo: boolean
    principal: boolean
}
