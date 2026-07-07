import { DoctorFormState } from "../../hooks/doctor.reducer";

function hasValue(...values: (string | number | null | undefined)[]) {
  return values.some((value) => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }

    return value !== null && value !== undefined;
  });
}

export function buildDoctorPayload(state: DoctorFormState) {
  return {
    ...state,
    specialtyId: Number(state?.specialtyId),
    educations: state.educations.filter((item) =>
      hasValue(item.university, item.program, item.degree, item.graduationYear),
    ),

    experiences: state.experiences.filter((item) =>
      hasValue(
        item.title,
        item.place,
        item.description,
        item.descriptionJson,
        item.startYear,
        item.endYear,
      ),
    ),

    schedules: state.schedules.filter((item) =>
      hasValue(item.day, item.startTime, item.endTime),
    ),
  };
}
