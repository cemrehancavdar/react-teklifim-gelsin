import jwt_decode from "jwt-decode";
import { BASE_URL } from "../constants/url";




async function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  try {
    const data = await fetch(
      `${BASE_URL}/auth/login`,
      requestOptions,
    );

    const json = await data.json();

    if (data.status) {
      localStorage.setItem("auth_token", JSON.stringify(json.auth_token));
      localStorage.setItem("refresh_token", JSON.stringify(json.refresh_token));
    }
    return { status: json.status, message: json.message };
  } catch (error) {
    console.error(error);
    return { status: "fail", message: "Bir hata oluştu." };
  }
}

async function register(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  try {
    const data = await fetch(
      `${BASE_URL}/auth/register`,
      requestOptions,
    );

    const json = await data.json();

    return { status: json.status, message: json.message };
  } catch (error) {
    console.error(error);
    return { status: "fail", message: "Bir hata oluştu." };
  }
}

async function refreshAuthToken() {
  const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  try {
    const data = await fetch(
      `${BASE_URL}/auth/refresh`,
      requestOptions,
    );

    const json = await data.json();

    if (data.status) {
      localStorage.setItem("auth_token", JSON.stringify(json.auth_token));
    }
  } catch (error) {
    console.error(error);
  }
}

function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("refresh_token");
}

function checkJWT() {
  if (localStorage.getItem("auth_token")) {
    try {
      const token = jwt_decode(localStorage.getItem("auth_token"));
      const currentDate = new Date();
      if (token.exp * 1000 < currentDate.getTime()) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
}

export const authenticationService = {
  login,
  logout,
  register,
  refreshAuthToken,
  checkJWT,
};
