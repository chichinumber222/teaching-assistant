import type { HttpClient } from "@/shared/lib/http/http-client";
import type { UserRole } from "@/modules/auth/domain/user-role";

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type AuthUserDto = {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponseDto = {
  user: AuthUserDto;
};

export type CurrentUserResponseDto = {
  user: AuthUserDto;
};

export class AuthApiClient {
  constructor(private readonly httpClient: HttpClient) {}

  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    return this.httpClient.request<LoginResponseDto, LoginRequestDto>({
      method: "POST",
      url: "/api/auth/login",
      body: payload,
    });
  }

  async logout(): Promise<void> {
    await this.httpClient.request<void>({
      method: "POST",
      url: "/api/auth/logout",
    });
  }

  async getCurrentUser(): Promise<CurrentUserResponseDto> {
    return this.httpClient.request<CurrentUserResponseDto>({
      method: "GET",
      url: "/api/auth/me",
    });
  }
}
