"use client";

import useDoctorBooking from "@/hooks/doctor/useDoctorBooking";
import { IDoctorCard } from "@/types/type";
import SafeImage from "@/Component/SafeImage/SafeImage";
import { formatDate, formatTime } from "@/lib/helperDate";
import LinkBack from "@/Component/LinkBack/LinkBack";

interface Props {
  doctor: IDoctorCard;
}

export default function DoctorDetail({ doctor }: Props) {
  const booking = useDoctorBooking(doctor);

  return (
    <section className="min-h-screen w-[94%] md:w-[95%] xl:w-[95%] mx-auto bg-linear-to-br from-fuchsia-50 to-teal-50 relative">
      <LinkBack
        title={
          <span className="inline-block text-sm px-4 py-1 border border-emerald-800/50 rounded-full text-emerald-800/50">
            Detail Dokter
          </span>
        }
        linkTo="/doctor"
      />
      <div className="grid lg:grid-cols-3 gap-5 mt-4">
        <div className="lg:col-span-2 space-y-12">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-72 shrink-0">
              <div className="relative w-full aspect-square">
                <SafeImage
                  src={doctor.image || ""}
                  alt={doctor.name}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    25vw
                  "
                  className="rounded-3xl object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                {doctor.specialty?.label}
              </span>

              <h1 className="mt-5 text-4xl lg:text-5xl font-bold text-slate-700">
                {doctor.name}
              </h1>

              <p className="mt-6 leading-8 text-slate-500">
                {doctor.bio ||
                  "Dokter profesional dengan pengalaman luas dalam memberikan pelayanan kesehatan yang komprehensif dan berorientasi pada kebutuhan pasien."}
              </p>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              Jadwal Praktik
            </h2>

            <div className="flex flex-wrap gap-3">
              {doctor.schedules
                ?.sort((a, b) => a.day - b.day)
                .map((schedule, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-between rounded-xl bg-white/70 border border-slate-100 px-4 py-3"
                  >
                    <span className="text-base text-slate-600">
                      {
                        [
                          "Minggu",
                          "Senin",
                          "Selasa",
                          "Rabu",
                          "Kamis",
                          "Jumat",
                          "Sabtu",
                        ][schedule.day]
                      }
                    </span>

                    <span className="font-medium text-emerald-600">
                      {formatTime(schedule.startTime)} -
                      {formatTime(schedule.endTime)}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {doctor?.experiences?.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-800">
                  Pengalaman Profesional
                </h2>

                <div className="flex-1 h-px bg-linear-to-r from-emerald-500 to-transparent" />
              </div>

              <div className="relative border-l border-emerald-200 pl-8">
                {doctor?.experiences.map((exp, index) => (
                  <div key={index} className="relative pb-10">
                    <div className="absolute -left-9.5 top-1 h-4 w-4 rounded-full bg-emerald-500" />

                    <p className="text-sm font-medium text-emerald-600">
                      {exp.startYear}
                      {exp.endYear ? ` - ${exp.endYear}` : " - Sekarang"}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-800">
                      {exp.title}
                    </h3>

                    <p className="text-slate-500">{exp.place}</p>

                    <p className="mt-3 text-slate-600 leading-7">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside>
          <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-700">
              Buat Janji Konsultasi
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Pilih tanggal dan jam konsultasi yang tersedia.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={booking.prevMonth}
                disabled={booking.monthOffset === 0}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-40 text-slate-800 disabled:cursor-not-allowed cursor-pointer"
              >
                Prev
              </button>

              <span className="font-medium text-slate-700">
                {booking.baseDate.toLocaleString("id-ID", {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <button
                onClick={booking.nextMonth}
                disabled={booking.monthOffset === 4}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-slate-800"
              >
                Next
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid grid-cols-7 gap-2 mb-3">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {booking.daysArray.map((date, index) => {
                  if (!date) return <div key={index} />;

                  const isAvailable = booking.isDateAvailable(date);
                  const isFullDay = booking.isFullDay(date);

                  const isSelected =
                    booking.selectedDate &&
                    booking.selectedDate.toDateString() === date.toDateString();

                  return (
                    <button
                      key={index}
                      disabled={!isAvailable}
                      onClick={() => {
                        booking.setSelectedDate(date);
                        booking.setSelectedTime(null);
                      }}
                      className={`
                        h-10
                        w-10
                        rounded-xl
                        text-sm
                        font-medium
                        transition
                        border
                        
                        ${
                          isSelected
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : isFullDay
                              ? "bg-rose-50 border-rose-200 text-rose-500"
                              : isAvailable
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                                : "bg-slate-100 border-slate-200 text-slate-400"
                        }
                      `}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
                  <span className="text-gray-600">Tersedia</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-600" />
                  <span className="text-gray-600">Dipilih</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-rose-100 border border-rose-300" />
                  <span className="text-gray-600">Penuh</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-200 border border-slate-300" />
                  <span className="text-gray-600">Tidak tersedia</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-medium text-slate-700">
                Pilih Jam Konsultasi
              </h3>

              {booking.selectedDate ? (
                <div className="grid grid-cols-2 gap-2">
                  {booking.getAvailableSlots().map((slot) => {
                    const selected = booking.selectedTime === slot.value;

                    return (
                      <button
                        key={slot.value}
                        disabled={slot.isFull}
                        onClick={() => booking.setSelectedTime(slot.value)}
                        className={`
                          rounded-xl
                          py-2
                          text-sm
                          border
                          transition

                          ${
                            selected
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : slot.isFull
                                ? "bg-rose-50 border-rose-200 text-rose-500"
                                : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                          }
                        `}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
                  Pilih tanggal terlebih dahulu
                </div>
              )}
            </div>

            {booking.selectedDate && booking.selectedTime && (
              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs uppercase text-slate-500">
                  Ringkasan Booking
                </p>

                <p className="mt-2 text-sm text-slate-700">
                  Hari : {formatDate(booking.selectedDate, "text")}
                </p>

                <p className="text-sm text-slate-700">
                  Jam :{" "}
                  {formatTime(Number(booking.selectedTime?.split("-")[0]))} -
                  {formatTime(Number(booking.selectedTime?.split("-")[1]))}
                </p>
              </div>
            )}

            <button
              disabled={!booking.selectedDate || !booking.selectedTime}
              className="mt-5 w-full rounded-2xl bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-700 disabled:bg-slate-300 disabled:text-slate-500"
            >
              Konfirmasi Booking
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
