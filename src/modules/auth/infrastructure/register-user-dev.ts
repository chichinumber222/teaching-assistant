import { RegisterUser } from "../application/register-user";
import { ScryptPasswordHasher } from "./scrypt-password-hasher";
import { SqliteUserRepository } from "./sqlite-user-repository";

const registerUser = new RegisterUser(
  new SqliteUserRepository(),
  new ScryptPasswordHasher(),
);

const user = registerUser.execute({
  email: "teacher@example.com",
  password: "12345678",
  role: "teacher",
});

console.log("Created user", user);
