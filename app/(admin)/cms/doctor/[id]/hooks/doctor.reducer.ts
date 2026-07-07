/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOption } from "@/types/type";

export interface DoctorEducation {
  id?: number;
  degree: string;
  university: string;
  graduationYear?: number;
  program: string;
}

export interface DoctorExperience {
  id?: number;
  startYear: number | "";
  endYear: number | "";
  title?: string;
  place: string;
  description: string;
  descriptionJson: string;
}

export interface DoctorSchedule {
  id?: number;
  day: number | null;
  startTime: number | null;
  endTime: number | null;
}

export interface DoctorFormState {
  name: string;
  specialtyId: string;
  location: string;
  bio: string;
  experience: string;
  price: number;
  email: string;
  phoneNumber: string;
  image: string;
  imagePublicId: string;
  isOnline: boolean;
  isActive: boolean;
  educations: DoctorEducation[];
  experiences: DoctorExperience[];
  schedules: DoctorSchedule[];
  loading: boolean;
  error: string | null;
}

export const initialDoctorState: DoctorFormState = {
  name: "",
  specialtyId: "",
  location: "",
  bio: "",
  experience: "",
  price: 0,
  email: "",
  phoneNumber: "",
  image: "",
  imagePublicId: "",
  isOnline: false,
  isActive: true,
  educations: [],
  experiences: [],
  schedules: [],
  loading: false,
  error: null,
};

export type DoctorAction =
  | {
      type: "SET_INITIAL_DATA";
      payload: DoctorFormState;
    }
  | {
      type: "UPDATE_FIELD";
      field: keyof DoctorFormState;
      value: any;
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_ERROR";
      payload: string | null;
    }
  | {
      type: "SET_EDUCATIONS";
      payload: DoctorEducation[];
    }
  | {
      type: "SET_EXPERIENCES";
      payload: DoctorExperience[];
    }
  | {
      type: "SET_SCHEDULES";
      payload: DoctorSchedule[];
    };

export function doctorReducer(
  state: DoctorFormState,
  action: DoctorAction,
): DoctorFormState {
  switch (action.type) {
    case "SET_INITIAL_DATA":
      return action.payload;

    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SET_EDUCATIONS":
      return {
        ...state,
        educations: action.payload,
      };

    case "SET_EXPERIENCES":
      return {
        ...state,
        experiences: action.payload,
      };

    case "SET_SCHEDULES":
      return {
        ...state,
        schedules: action.payload,
      };

    default:
      return state;
  }
}
