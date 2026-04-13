import { AuthenticateUser } from "@/modules/auth/application/authenticate-user";
import { ChangePassword } from "@/modules/auth/application/change-password";
import {
  InspectSession,
  ResolveSession,
} from "@/modules/auth/application/resolve-session";
import { LoginUser } from "@/modules/auth/application/login-user";
import { LogoutUser } from "@/modules/auth/application/logout-user";
import { RegisterUser } from "@/modules/auth/application/register-user";
import { UpdateUser } from "@/modules/auth/application/update-user";
import { UserRepository } from "@/modules/auth/domain/user-repository";
import { SessionRepository } from "@/modules/auth/domain/session-repository";
import { PasswordHasher } from "@/modules/auth/domain/password-hasher";

export type AuthDependencies = {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  passwordHasher: PasswordHasher;
};

export function createAuthServices(deps: AuthDependencies) {
  const { userRepository, sessionRepository, passwordHasher } = deps;

  const inspectSession = new InspectSession(sessionRepository, userRepository);
  const authenticateUser = new AuthenticateUser(userRepository, passwordHasher);

  return {
    registerUser: new RegisterUser(userRepository, passwordHasher),
    authenticateUser,
    loginUser: new LoginUser(authenticateUser, sessionRepository),
    logoutUser: new LogoutUser(sessionRepository),
    changePassword: new ChangePassword(userRepository, passwordHasher),
    updateUser: new UpdateUser(userRepository),
    resolveSession: new ResolveSession(inspectSession, sessionRepository),
    inspectSession,
  };
}
