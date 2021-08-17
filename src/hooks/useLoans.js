import { useQuery } from "react-query";
import { BASE_URL } from "../constants/url";
import { authenticationService } from "../services/authentication.service";

const { refreshAuthToken } = authenticationService;

async function fetchLoans() {
  refreshAuthToken();
  const token = JSON.parse(localStorage.getItem("auth_token"));
  const data = await fetch(`${BASE_URL}/app/loans`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await data.json();
  return json;
}

export function useLoans() {
  return useQuery("loans", fetchLoans);
}
