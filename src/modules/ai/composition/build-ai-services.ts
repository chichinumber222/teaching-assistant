import "server-only";

import { getAiDependencies } from "./ai-dependencies";
import { createAiServices } from "./create-ai-services";

export function buildAiServices() {
  const deps = getAiDependencies();
  return createAiServices(deps);
}
