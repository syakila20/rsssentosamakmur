"use client";

import { useMemo, useState } from "react";
import { IDoctorCard } from "@/types/type";

export interface BookingSlot {
  label: string;
  value: string;
  isFull: boolean;
}

interface UseDoctorBookingOptions {
  fullBookedDays?: string[];
  fullBookedSlots?: Record<string, string[]>;
}

export const militaryToTime = (time: number) => {
  const str = String(time).padStart(4, "0");

  const hour = str.slice(0, 2);
  const minute = str.slice(2, 4);

  return `${hour}:${minute}`;
};

const doctorDayToJsDay = (doctorDay: number) => {
  return doctorDay === 7 ? 0 : doctorDay;
};

const jsDayToDoctorDay = (jsDay: number) => {
  return jsDay === 0 ? 7 : jsDay;
};

export default function useDoctorBooking(
  doctor: IDoctorCard,
  options?: UseDoctorBookingOptions,
) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [monthOffset, setMonthOffset] = useState(0);

  const fullBookedDays = options?.fullBookedDays ?? [];

  const fullBookedSlots = options?.fullBookedSlots ?? {};

  const today = new Date();

  const formatDate = (date: Date) => {
    const y = date.getFullYear();

    const m = String(date.getMonth() + 1).padStart(2, "0");

    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  const isFullDay = (date: Date) => {
    return fullBookedDays.includes(formatDate(date));
  };

  const baseDate = useMemo(() => {
    return new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  }, [monthOffset]);

  const daysArray = useMemo(() => {
    const year = baseDate.getFullYear();

    const month = baseDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(year, month + 1, 0).getDate();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from(
        { length: totalDays },
        (_, index) => new Date(year, month, index + 1),
      ),
    ];
  }, [baseDate]);

  /**
   * doctor day:
   * 1 = monday
   * 2 = tuesday
   * 3 = wednesday
   * 4 = thursday
   * 5 = friday
   * 6 = saturday
   * 7 = sunday
   */
  const availableDaysIndex = useMemo(() => {
    return doctor.schedules.map((schedule) => doctorDayToJsDay(schedule.day));
  }, [doctor.schedules]);

  const isDateAvailable = (date: Date) => {
    const jsDay = date.getDay();

    const isPracticeDay = availableDaysIndex.includes(jsDay);

    const isPastDate =
      monthOffset === 0 &&
      new Date(date.getFullYear(), date.getMonth(), date.getDate()) <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const fullDay = isFullDay(date);

    return isPracticeDay && !isPastDate && !fullDay;
  };

  const getAvailableSlots = (): BookingSlot[] => {
    if (!selectedDate) return [];

    const doctorDay = jsDayToDoctorDay(selectedDate.getDay());

    const schedules = doctor.schedules.filter(
      (schedule) => schedule.day === doctorDay,
    );

    if (!schedules.length) return [];

    const dateKey = formatDate(selectedDate);

    const bookedRanges = fullBookedSlots[dateKey] ?? [];

    return schedules.map((schedule) => {
      const range = `${schedule.startTime}-${schedule.endTime}`;

      return {
        label: `${militaryToTime(schedule.startTime)} - ${militaryToTime(schedule.endTime)}`,
        value: range,
        isFull: bookedRanges.includes(range),
      };
    });
  };

  const nextMonth = () => {
    if (monthOffset >= 4) return;

    setMonthOffset((prev) => prev + 1);

    setSelectedDate(null);

    setSelectedTime(null);
  };

  const prevMonth = () => {
    if (monthOffset <= 0) return;

    setMonthOffset((prev) => prev - 1);

    setSelectedDate(null);

    setSelectedTime(null);
  };

  return {
    selectedDate,
    setSelectedDate,

    selectedTime,
    setSelectedTime,

    monthOffset,

    baseDate,

    daysArray,

    nextMonth,
    prevMonth,

    isDateAvailable,
    isFullDay,

    getAvailableSlots,
  };
}
