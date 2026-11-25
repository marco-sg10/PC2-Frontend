// TODO: ADAPTAR: Modificar esta interfaz según el contrato real del recurso principal
export interface Resource {
  id: number
  name: string
  description?: string
  // TODO: ADAPTAR: Agregar otros atributos según el contrato real del backend
}

// TODO: ADAPTAR: Modificar esta interfaz según el contrato real del detalle del recurso
export interface ResourceDetail extends Resource {
  // TODO: ADAPTAR: Agregar atributos adicionales del detalle
  // Ejemplo: sesiones, turnos, opciones, etc.
  children?: ResourceChild[]
}

// TODO: ADAPTAR: Modificar esta interfaz según el contrato real de los elementos secundarios
export interface ResourceChild {
  id: number
  name: string
  // TODO: ADAPTAR: Agregar otros atributos según el contrato real
}

// TODO: ADAPTAR: Modificar esta interfaz según el contrato real de las operaciones
export interface OperationRequest {
  resourceId: number
  // TODO: ADAPTAR: Agregar campos según la operación específica
  // Ejemplo: sessionId, quantity, optionId, etc.
}
