import { AuthenticateUser } from "@/modules/auth/application/authenticate-user";
import { GetCurrentUser } from "@/modules/auth/application/get-current-user";
import { LoginUser } from "@/modules/auth/application/login-user";
import { LogoutUser } from "@/modules/auth/application/logout-user";
import { RegisterUser } from "@/modules/auth/application/register-user";
import { ScryptPasswordHasher } from "./scrypt-password-hasher";
import { SqliteSessionRepository } from "./sqlite-session-repository";
import { SqliteUserRepository } from "./sqlite-user-repository";

export function createAuthServices() {
  const userRepository = new SqliteUserRepository();
  const sessionRepository = new SqliteSessionRepository();
  const passwordHasher = new ScryptPasswordHasher();

  const authenticateUser = new AuthenticateUser(
    userRepository,
    passwordHasher,
  );

  return {
    registerUser: new RegisterUser(userRepository, passwordHasher),
    authenticateUser,
    loginUser: new LoginUser(authenticateUser, sessionRepository),
    logoutUser: new LogoutUser(sessionRepository),
    getCurrentUser: new GetCurrentUser(sessionRepository, userRepository),
  };
}