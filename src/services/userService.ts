import showErrorModal from "../utils/showErrorsModal";
import axiosInstance from "./axiosconfig";

export const createUser = async (values: any, role = "client") => {
  try {
    let response = await axiosInstance.post(`users/auth/register`, {
      ...values,
      role,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error);
    showErrorModal(error?.response?.data);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    let response = await axiosInstance.post(`users/auth/login`, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error);
    showErrorModal(error?.response?.data);
  }
};
