import { useReducer } from "react";

import {
  doctorReducer,
  DoctorEducation,
  DoctorExperience,
  DoctorFormState,
  DoctorSchedule,
  initialDoctorState,
} from "./doctor.reducer";
import { addArrayItem, removeArrayItem, updateArrayItem } from "./arrayState";
import { validateScheduleOverlap } from "../Form/lib/validation.schedule";
import { useToast } from "@/Component/Toast/useToast";
import { buildDoctorPayload } from "../Form/lib/payload";
import {
  createDoctorAction,
  updateDoctorAction,
} from "@/modules/doctor/doctor.action";

type Props = {
  initialState?: DoctorFormState;
};

export const createEmptySchedule = (): DoctorSchedule => ({
  day: null,
  startTime: null,
  endTime: null,
});

export function useDoctorForm({ initialState }: Props = {}) {
  const [state, dispatch] = useReducer(
    doctorReducer,
    initialState ?? initialDoctorState,
  );
  const toast = useToast();

  function setInitialData(payload: DoctorFormState) {
    dispatch({
      type: "SET_INITIAL_DATA",
      payload,
    });
  }

  function updateField<K extends keyof DoctorFormState>(
    field: K,
    value: DoctorFormState[K],
  ) {
    dispatch({
      type: "UPDATE_FIELD",
      field,
      value,
    });
  }

  function setEducations(payload: DoctorEducation[]) {
    dispatch({
      type: "SET_EDUCATIONS",
      payload,
    });
  }

  function setExperiences(payload: DoctorExperience[]) {
    dispatch({
      type: "SET_EXPERIENCES",
      payload,
    });
  }

  function addEducation() {
    dispatch({
      type: "SET_EDUCATIONS",
      payload: addArrayItem(state.educations, {
        degree: "",
        program: "",
        university: "",
        graduationYear: undefined,
      }),
    });
  }

  function removeEducation(index: number) {
    dispatch({
      type: "SET_EDUCATIONS",
      payload: removeArrayItem(state.educations, index),
    });
  }

  function updateEducation<K extends keyof DoctorEducation>(
    index: number,
    field: K,
    value: DoctorEducation[K],
  ) {
    dispatch({
      type: "SET_EDUCATIONS",
      payload: updateArrayItem(state.educations, index, field, value),
    });
  }

  function addExperience() {
    dispatch({
      type: "SET_EXPERIENCES",
      payload: addArrayItem(state?.experiences, {
        startYear: "",
        endYear: "",
        title: "",
        place: "",
        description: "",
        descriptionJson: "",
      }),
    });
  }

  function removedExperience(index: number) {
    dispatch({
      type: "SET_EXPERIENCES",
      payload: removeArrayItem(state?.experiences, index),
    });
  }

  function updatedExperience<K extends keyof DoctorExperience>(
    index: number,
    field: K,
    value: DoctorExperience[K],
  ) {
    dispatch({
      type: "SET_EXPERIENCES",
      payload: updateArrayItem(state.experiences, index, field, value),
    });
  }

  function addSchedule() {
    dispatch({
      type: "SET_SCHEDULES",
      payload: addArrayItem(state?.schedules, createEmptySchedule()),
    });
  }

  function removedSchedule(index: number) {
    dispatch({
      type: "SET_SCHEDULES",
      payload: removeArrayItem(state?.schedules, index),
    });
  }

  function updatedSchedule<K extends keyof DoctorSchedule>(
    index: number,
    field: K,
    value: DoctorSchedule[K],
  ) {
    dispatch({
      type: "SET_SCHEDULES",
      payload: updateArrayItem(state.schedules, index, field, value),
    });
  }

  async function submit(isCreate: boolean, id?: number) {
    const message = validateScheduleOverlap(state.schedules);

    if (message) {
      toast.warning(message);
      return;
    }

    const payload = buildDoctorPayload(state);

    const response = isCreate
      ? await createDoctorAction(payload)
      : await updateDoctorAction(id!, payload);

    if (!response.success) {
      toast.danger(response?.message || "");
      return;
    }

    toast.success(response.message || "");
  }

  return {
    state,
    setInitialData,
    updateField,
    setEducations,
    setExperiences,
    submit,
    education: {
      state: state?.educations,
      add: addEducation,
      remove: removeEducation,
      update: updateEducation,
    },
    experience: {
      state: state?.experiences,
      add: addExperience,
      remove: removedExperience,
      update: updatedExperience,
    },
    schedule: {
      state: state?.schedules,
      add: addSchedule,
      remove: removedSchedule,
      update: updatedSchedule,
    },
  };
}
