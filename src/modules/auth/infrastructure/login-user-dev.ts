import { AuthenticateUser } from "../application/authenticate-user";
import { LoginUser } from "../application/login-user";
import { ScryptPasswordHasher } from "./scrypt-password-hasher";
import { SqliteSessionRepository } from "./sqlite-session-repository";
import { SqliteUserRepository } from "./sqlite-user-repository";

const userRepository = new SqliteUserRepository();
const passwordHasher = new ScryptPasswordHasher();
const sessionRepository = new SqliteSessionRepository();

const authenticateUser = new AuthenticateUser(userRepository, passwordHasher);

const loginUser = new LoginUser(authenticateUser, sessionRepository);

const result = loginUser.execute({
  email: "teacher@example.com",
  password: "wrong-password",
  ipAddress: "127.0.0.1",
  userAgent: "dev-script",
});

console.log("Login result:", result);
