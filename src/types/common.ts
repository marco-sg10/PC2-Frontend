export interface ApiError {
  message: string
  code?: string
  // TODO: ADAPTAR: Agregar otros campos según el contrato real del backend
}

export interface PageResponse<T> {
  items: T[]
  page: number
  size: number
  totalItems: number
  totalPages: number
}
