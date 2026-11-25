export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  // TODO: ADAPTAR: Agregar otros campos según el contrato real del backend
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  // TODO: ADAPTAR: Agregar otros campos según el contrato real del backend
}
