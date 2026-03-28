import { LogoutUserResultKind } from "./constants";

export type LogoutUserInput = {
  sessionId: string;
};

export type LogoutUserResult = {
  kind: LogoutUserResultKind.LOGGED_OUT;
};
