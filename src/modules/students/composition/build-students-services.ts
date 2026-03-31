import { getAuthDependencies } from "@/modules/auth/composition/auth-dependencies"
import { getStudentsDependencies } from "./students-dependencies"
import { createStudentsServices } from "./create-students-services"

export function buildStudentsServices() {
  const studentsDeps = getStudentsDependencies();
  const authDeps = getAuthDependencies();
  return createStudentsServices({
    ...studentsDeps,
    userRepository: authDeps.userRepository,
  });
}
