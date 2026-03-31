import { getAuthDependencies } from "./auth-dependencies"
import { createAuthServices } from "./create-auth-services"

export function buildAuthServices() {
  const deps = getAuthDependencies();
  return createAuthServices(deps);
}
