import type { HttpClient } from "@/shared/lib/http/http-client";
import type { UserRole } from "@/modules/auth/domain/user-role";

export type RegisterRequestDto = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type UpdateCurrentUserRequestDto = {
  name: string;
  email: string;
};

export type UpdatePasswordRequestDto = {
  currentPassword: string;
  newPassword: string;
};

export type AuthResponseDto = {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type RegisterResponseDto = AuthResponseDto;
export type LoginResponseDto = AuthResponseDto;
export type CurrentUserResponseDto = AuthResponseDto;

export class AuthApiClient {
  constructor(private readonly httpClient: HttpClient) {}

  async register(payload: RegisterRequestDto): Promise<RegisterResponseDto> {
    return this.httpClient.request<RegisterResponseDto, RegisterRequestDto>({
      method: "POST",
      url: "/api/auth/register",
      body: payload,
    });
  }

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

  async updateCurrentUser(
    payload: UpdateCurrentUserRequestDto,
  ): Promise<CurrentUserResponseDto> {
    return this.httpClient.request<
      CurrentUserResponseDto,
      UpdateCurrentUserRequestDto
    >({
      method: "PATCH",
      url: "/api/auth/me",
      body: payload,
    });
  }

  async updatePassword(payload: UpdatePasswordRequestDto): Promise<void> {
    await this.httpClient.request<void, UpdatePasswordRequestDto>({
      method: "PATCH",
      url: "/api/auth/me/password",
      body: payload,
    });
  }
}
