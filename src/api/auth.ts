import api from "./index";

export interface Appointment {
  _id: string;
  date: string;
  time: string;
  docName?: string;
  patientName?: string;
  reason: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerUser = async (userData: {
  email: string;
  fullName: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAppointments = async (): Promise<Appointment[]> => {
  const token = localStorage.getItem("accessToken");
  const response = await api.get("/appointments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch appointments");
  }
  return response.data as Appointment[];
};

interface AppointmentData {
  docName: string;
  docId: string;
  date: string;
  time: string;
  reason: string;
}

export const fetchDoctorsWithSlots = async () => {
  const response = await api.get("/users/doctors/slots");
  if (response.status !== 200) {
    throw new Error("Failed to fetch doctors");
  }
  return response.data;
};

export const createAppointment = async (appointmentData: AppointmentData) => {
  const response = await api.post("/appointments", appointmentData);
  if (response.status !== 201) {
    throw new Error("Failed to create appointment");
  }
  return response.data;
};

export const handleApiError = (error: Error | unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};
