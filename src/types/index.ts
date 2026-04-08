export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  class?: string;
  enrolledCourses?: string[];
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  facultyId?: string;
  createdAt: string;
}

export interface Batch {
  id: string;
  courseId: string;
  name: string;
  schedule: string;
  students: string[];
}

export interface Lesson {
  id: string;
  batchId: string;
  title: string;
  type: 'live' | 'recorded' | 'pdf' | 'assignment';
  contentUrl: string;
  date: string;
  subject: string;
}

export interface Test {
  id: string;
  batchId: string;
  title: string;
  duration: number;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Submission {
  id: string;
  testId: string;
  studentId: string;
  score: number;
  answers: number[];
  submittedAt: string;
}

export interface Doubt {
  id: string;
  studentId: string;
  batchId: string;
  question: string;
  status: 'open' | 'resolved';
  answer?: string;
  facultyId?: string;
  createdAt: string;
}
