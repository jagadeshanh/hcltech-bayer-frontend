"use client";

import { createAppointment, fetchDoctorsWithSlots } from "@/api/auth";
import Link from "next/link";
import { useState, useEffect } from "react";

// Update interface for doctor type
interface Doctor {
  name: string;
  specialization: string;
  availableTimeSlots: string[];
  docId: string;
}

export default function BookingPage() {
  // Update state definitions
  const [doctors, setDoctors] = useState<Doctor[]>([]);
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
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [appointmentSuccess, setAppointmentSuccess] = useState<{
    show: boolean;
    details?: {
      docName: string;
      date: string;
      time: string;
      reason: string;
      patientName: string;
    };
  }>({ show: false });
  const [fetchError, setFetchError] = useState<string>("");

  // Add useEffect to fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetchDoctorsWithSlots();
        console.log(response);
        if (Array.isArray(response?.data)) {
          setDoctors(response?.data);
        } else {
          setFetchError("Invalid response format from server");
          setDoctors([]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setFetchError("Failed to fetch doctors");
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  // Update handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
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
      try {
        const selectedDoc = doctors.find((doc) => doc.name === selectedDoctor);
        if (!selectedDoc) return;

        const timeOnly = selectedTime.split(" - ")[0];

        const appointmentData = {
          docName: selectedDoc.name,
          docId: selectedDoc.docId,
          date: selectedDate,
          time: timeOnly,
          reason: reasonForVisit,
        };
        console.log("Sending appointment data:", appointmentData);
        const response = await createAppointment(appointmentData);
        console.log(response);
        if (response.message === "Appointment created successfully") {
          setAppointmentSuccess({
            show: true,
            details: response.appointment,
          });

          // Clear form
          setSelectedDoctor("");
          setSelectedDate("");
          setSelectedTime("");
          setReasonForVisit("");
          setAdditionalNotes("");
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    }
  };

  // Update doctor selection to update available time slots
  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorName = e.target.value;
    setSelectedDoctor(doctorName);
    const selectedDoc = doctors.find((doc) => doc.name === doctorName);
    setTimeSlots(selectedDoc?.availableTimeSlots || []);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {appointmentSuccess.show && appointmentSuccess.details && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center mb-2">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              <h3 className="text-green-800 font-medium">
                Appointment Booked Successfully!
              </h3>
            </div>
            <div className="text-sm text-green-700 space-y-1">
              <p>
                <span className="font-medium">Doctor:</span>{" "}
                {appointmentSuccess.details.docName}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(appointmentSuccess.details.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {appointmentSuccess.details.time}
              </p>
              <p>
                <span className="font-medium">Reason:</span>{" "}
                {appointmentSuccess.details.reason}
              </p>
              <p>
                <span className="font-medium">Patient:</span>{" "}
                {appointmentSuccess.details.patientName}
              </p>
            </div>
            <button
              onClick={() => setAppointmentSuccess({ show: false })}
              className="mt-3 text-sm text-green-600 hover:text-green-800"
            >
              Dismiss
            </button>
          </div>
        )}

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
              onChange={handleDoctorChange}
              className={`mt-1 block w-full border p-2 ${
                formErrors.doctor ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">-- Select a Doctor --</option>
              {doctors &&
                doctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>
                    {doctor.name} - {doctor.specialization}
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

        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
