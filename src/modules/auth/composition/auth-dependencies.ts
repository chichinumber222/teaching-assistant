import { ScryptPasswordHasher } from "@/modules/auth/infrastructure/server/scrypt-password-hasher";
import { SqliteSessionRepository } from "@/modules/auth/infrastructure/server/sqlite-session-repository";
import { SqliteUserRepository } from "@/modules/auth/infrastructure/server/sqlite-user-repository";

export function getAuthDependencies() {
  const userRepository = new SqliteUserRepository();
  const sessionRepository = new SqliteSessionRepository();
  const passwordHasher = new ScryptPasswordHasher();

  return { userRepository, sessionRepository, passwordHasher };
}
