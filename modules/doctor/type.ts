export interface DoctorEducationPayload {
  degree: string;
  university: string;
  program?: string;
  graduationYear?: number | null;
}

export interface DoctorExperiencePayload {
  startYear: number;
  endYear?: number | null;
  title: string;
  place: string;
  description: string;
  descriptionJson?: string;
}

export interface DoctorSchedulePayload {
  day: number;
  startTime: number;
  endTime: number;
}

export interface CreateDoctorPayload {
  name: string;
  location: string;
  bio?: string;

  experience: string;

  price?: number | null;

  email?: string;
  phoneNumber?: string;

  image?: string;
  imagePublicId?: string;

  specialtyId: number;

  isOnline: boolean;
  isActive: boolean;

  educations: DoctorEducationPayload[];
  experiences: DoctorExperiencePayload[];
  schedules: DoctorSchedulePayload[];
}

export type UpdateDoctorPayload = CreateDoctorPayload;
