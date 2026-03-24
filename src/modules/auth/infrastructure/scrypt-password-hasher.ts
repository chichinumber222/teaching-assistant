import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { PasswordHasher } from "../domain/password-hasher";

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;

export class ScryptPasswordHasher implements PasswordHasher {
  hash(password: string): string {
    const salt = randomBytes(SALT_LENGTH).toString("hex");
    const derivedKey  = scryptSync(password, salt, KEY_LENGTH).toString("hex");
    return `${salt}:${derivedKey}`;
  }

  compare(password: string, passwordHash: string): boolean {
    const [salt, storedDerivedKey] = passwordHash.split(":");
    if (!salt || !storedDerivedKey) {
      return false;
    }
    const derivedKey  = scryptSync(password, salt, KEY_LENGTH);
    const storedDerivedKeyBuffer = Buffer.from(storedDerivedKey, "hex");
    if (derivedKey.length !== storedDerivedKeyBuffer.length) {
      return false;
    }
    return timingSafeEqual(derivedKey, storedDerivedKeyBuffer);
  }
}