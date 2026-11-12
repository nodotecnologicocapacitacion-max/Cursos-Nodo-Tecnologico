export type ScreenId = 'catalog' | 'classroom' | 'dashboard' | 'makerspace' | 'certificates' | 'showcase' | 'screens_gallery';

export type Language = 'es' | 'en';

export interface Course {
  id: string;
  slug: string;
  title: { es: string; en: string };
  tagline: { es: string; en: string };
  category: 'ai' | 'robotics' | 'web' | 'data' | 'cyber' | 'design';
  categoryLabel: { es: string; en: string };
  level: { es: string; en: string };
  durationWeeks: number;
  totalHours: number;
  modality: { es: string; en: string };
  nextCohortDate: string;
  spotsLeft: number;
  rating: number;
  enrolledStudents: number;
  instructor: {
    name: string;
    role: { es: string; en: string };
    company: string;
  };
  syllabus: {
    moduleNumber: number;
    title: { es: string; en: string };
    topics: string[];
  }[];
  skills: string[];
  image: string;
  fallbackGradient: string;
}

export interface LabStation {
  id: string;
  name: { es: string; en: string };
  room: string;
  description: { es: string; en: string };
  equipment: string[];
  capacity: number;
  currentAvailableSlots: number;
  operatingHours: string;
  safetyTier: { es: string; en: string };
  image: string;
}

export interface StudentProfile {
  name: string;
  idNumber: string;
  cohort: string;
  enrolledCourseId: string;
  completionPercentage: number;
  attendanceRate: number;
  completedCredits: number;
  currentStreakDays: number;
}

export interface ProjectSubmission {
  id: string;
  title: string;
  author: string;
  cohort: string;
  track: string;
  summary: { es: string; en: string };
  votes: number;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface CertificateRecord {
  certificateId: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  verificationHash: string;
  grade: string;
  hours: number;
  instructorSignature: string;
  directorSignature: string;
}
