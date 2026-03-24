export interface PasswordHasher {
  hash(password: string): string;
  compare(password: string, passwordHash: string): boolean;
}