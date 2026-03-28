import { AuthenticateUser } from "@/modules/auth/application/authenticate-user";
import {
  InspectSession,
  ResolveSession,
} from "@/modules/auth/application/resolve-session";
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
  const inspectSession = new InspectSession(sessionRepository, userRepository);
  const authenticateUser = new AuthenticateUser(userRepository, passwordHasher);

  return {
    registerUser: new RegisterUser(userRepository, passwordHasher),
    authenticateUser,
    loginUser: new LoginUser(authenticateUser, sessionRepository),
    logoutUser: new LogoutUser(sessionRepository),
    resolveSession: new ResolveSession(inspectSession, sessionRepository),
    inspectSession,
  };
}
