/** Formato de error que devuelve el backend (ApiError.java). */
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errores?: CampoError[];
}

export interface CampoError {
  campo: string;
  mensaje: string;
}