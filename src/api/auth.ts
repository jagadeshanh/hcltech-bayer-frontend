import api from "./index";

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
