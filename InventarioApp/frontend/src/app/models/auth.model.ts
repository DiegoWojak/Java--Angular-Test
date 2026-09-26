export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  expiraEnMs: number;
  username: string;
  rol: string;
}
