import { GetCurrentUser } from "../application/get-current-user";
import { SqliteSessionRepository } from "./sqlite-session-repository";
import { SqliteUserRepository } from "./sqlite-user-repository";

const sessionRepository = new SqliteSessionRepository();
const userRepository = new SqliteUserRepository();

const getCurrentUser = new GetCurrentUser(sessionRepository, userRepository);

const sessionId = "2d6b6b39-99c1-4ca1-9050-1c5aa11a6dd7";

const result = getCurrentUser.execute({
  sessionId,
});

console.log("GetCurrentUser result:", result);
