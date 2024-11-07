"use client";

import { useState } from "react";

const doctors = [
  { id: 1, name: "Dr. Smith" },
  { id: 2, name: "Dr. Johnson" },
  { id: 3, name: "Dr. Lee" },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
];

export default function BookingPage() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [formErrors, setFormErrors] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({
      doctor: "",
      date: "",
      time: "",
      reason: "",
    });

    let isValid = true;

    if (!selectedDoctor) {
      setFormErrors((prev) => ({
        ...prev,
        doctor: "Doctor selection is required",
      }));
      isValid = false;
    }
    if (!selectedDate) {
      setFormErrors((prev) => ({
        ...prev,
        date: "Date selection is required",
      }));
      isValid = false;
    }
    if (!selectedTime) {
      setFormErrors((prev) => ({
        ...prev,
        time: "Time selection is required",
      }));
      isValid = false;
    }
    if (!reasonForVisit) {
      setFormErrors((prev) => ({
        ...prev,
        reason: "Reason for visit is required",
      }));
      isValid = false;
    }

    if (isValid) {
      console.log("Form submitted:", {
        selectedDoctor,
        selectedDate,
        selectedTime,
        reasonForVisit,
        additionalNotes,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Book an Appointment
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select your doctor and time slot below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="doctor"
              className="block text-sm font-medium text-gray-700"
            >
              Select Doctor
            </label>
            <select
              id="doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className={`mt-1 block w-full border p-2 ${
                formErrors.doctor ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">-- Select a Doctor --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            {formErrors.doctor && (
              <p className="text-red-500 text-sm">{formErrors.doctor}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`mt-1 block w-full border p-2 ${
                formErrors.date ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {formErrors.date && (
              <p className="text-red-500 text-sm">{formErrors.date}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Available Time Slots
            </label>
            <select
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className={`mt-1 block w-full border p-2 ${
                formErrors.time ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">-- Select a Time Slot --</option>
              {timeSlots.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {formErrors.time && (
              <p className="text-red-500 text-sm">{formErrors.time}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for Visit
            </label>
            <input
              type="text"
              id="reason"
              value={reasonForVisit}
              onChange={(e) => setReasonForVisit(e.target.value)}
              className={`mt-1 block w-full border p-2 ${
                formErrors.reason ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              required
            />
            {formErrors.reason && (
              <p className="text-red-500 text-sm">{formErrors.reason}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Notes (optional)
            </label>
            <textarea
              id="notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
