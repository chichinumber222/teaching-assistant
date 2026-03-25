import { AuthenticateUser } from "@/modules/auth/application/authenticate-user";
import { ScryptPasswordHasher } from "./scrypt-password-hasher";
import { SqliteUserRepository } from "./sqlite-user-repository";

const authenticateUser = new AuthenticateUser(
  new SqliteUserRepository(),
  new ScryptPasswordHasher(),
);

const user = authenticateUser.execute({
  email: "teacher@example.com",
  password: "wromg-password",
});

console.log("Authenticated user:", user);
