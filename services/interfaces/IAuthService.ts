// interfaces/IAuthService.ts
export interface RegisterDTO {
  name: string;
  email: string;
  username: string;
  password: string;
  roles: number[];
}

export interface JwtPayload {
  userId: number;
  email: string;
}

export interface IAuthService {
  register(data: RegisterDTO): Promise<{ message: string }>;
  login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }>;
  refreshToken(token: string): Promise<{ accessToken: string }>;
}
