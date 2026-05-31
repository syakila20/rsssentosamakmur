export interface DoctorDTO {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  location: string;
  rating: number;
  experience: string;

  specialty: {
    label: string;
    slug: string;
  };

  isOnline: boolean;

  schedules: {
    day: number;
    startTime: number;
    endTime: number;
  }[];

  experiences: {
    title: string;
    description: string;
    startYear: number;
    endYear: number | null;
    place: string;
  }[];

  educations: {
    degree: string;
    university: string;
  }[];
}
