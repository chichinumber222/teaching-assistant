import "server-only";

import { getAiDependencies } from "./ai-dependencies";
import { createAiServices } from "./create-ai-services";
import { buildStudentsServices } from "@/modules/students/composition/build-students-services";

export function buildAiServices() {
  const aiDeps = getAiDependencies();
  const studentsServicesDeps = buildStudentsServices();
  return createAiServices({
    ...aiDeps,
    getStudentContext: studentsServicesDeps.getStudentContext,
  });
}
