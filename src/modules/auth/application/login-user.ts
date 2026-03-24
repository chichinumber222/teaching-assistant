import { AuthenticateUser } from "./authenticate-user";
import { SessionRepository } from "../domain/session-repository";
import { Session } from "../domain/session";
import { User } from "../domain/user";

export type LoginUserInput = {
  email: string;
  password: string;
  ipAddress: string | null;
  userAgent: string | null;
};

export type LoginUserResult = {
  user: User;
  session: Session;
};

const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

export class LoginUser {
  constructor(
    private readonly authenticateUser: AuthenticateUser,
    private readonly sessionRepository: SessionRepository,
  ) {}

  execute(input: LoginUserInput): LoginUserResult {
    const user = this.authenticateUser.execute({
      email: input.email,
      password: input.password,
    });

    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

    const session = this.sessionRepository.create({
      userId: user.id,
      expiresAt,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    });

    return { user, session };
  }
}
