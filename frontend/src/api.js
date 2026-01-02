import axios from "axios";

const API_BASE = "https://ngo-cms-internship.onrender.com";

export const registerUser = (data) => {
  return axios.post(
    `${API_BASE}/api/auth/register/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const loginUser = (data) => {
  return axios.post(
    `${API_BASE}/api/auth/login/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

