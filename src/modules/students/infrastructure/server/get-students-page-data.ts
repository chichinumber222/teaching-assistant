import "server-only";

import { buildStudentsServices } from "@/modules/students/composition/build-students-services";
import { ListStudentsResultKind } from "@/modules/students/application/list-students/constants";
import type { Student } from "@/modules/students/domain/student";

type GetStudentsPageDataInput = {
  teacherId: string;
};

type GetStudentsPageDataResult =
  | {
      ok: true;
      students: Student[];
    }
  | {
      ok: false;
    };

export function getStudentsPageData({
  teacherId,
}: GetStudentsPageDataInput): GetStudentsPageDataResult {
  try {
    const { listStudents } = buildStudentsServices();

    const result = listStudents.execute({
      teacherUserId: teacherId,
    });

    if (result.kind !== ListStudentsResultKind.LISTED) {
      return {
        ok: false,
      };
    }

    return {
      ok: true,
      students: result.students,
    };
  } catch {
    return {
      ok: false,
    };
  }
}
