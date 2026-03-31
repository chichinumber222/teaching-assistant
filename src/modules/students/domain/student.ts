export type Student = {
  id: string;
  teacherUserId: string;
  fullName: string;
  subject: string;
  level: string | null;
  goals: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};