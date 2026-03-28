import "./init";
import "@root/env-config";

import { createAuthServices } from "@/modules/auth/infrastructure/server/auth-service-factory";
import { UserRole } from "@/modules/auth/domain/user-role";
import { RegisterUserResultKind } from "@/modules/auth/application/register-user/constants";

const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

function insert() {
  const name = requireEnv(ADMIN_NAME, "ADMIN_NAME");
  const email = requireEnv(ADMIN_EMAIL, "ADMIN_EMAIL");
  const password = requireEnv(ADMIN_PASSWORD, "ADMIN_PASSWORD");

  const { registerUser } = createAuthServices();

  const result = registerUser.execute({
    name,
    email,
    password,
    role: UserRole.Admin,
  });

  if (result.kind === RegisterUserResultKind.REGISTERED) {
    console.log(`Admin created: ${result.user.email}`);
    return;
  }

  if (result.kind === RegisterUserResultKind.EMAIL_ALREADY_IN_USE) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  throw new Error(`Unexpected register result admin`);
}

insert();
