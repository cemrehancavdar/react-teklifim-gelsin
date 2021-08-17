import { useQuery } from "react-query";
import { BASE_URL } from "../constants/url";
import { authenticationService } from "../services/authentication.service";
const { refreshAuthToken } = authenticationService;

async function fetchReasons() {
  refreshAuthToken();
  const token = JSON.parse(localStorage.getItem("auth_token"));
  const data = await fetch(`${BASE_URL}/app/reasons`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = data.json();
  return json;
}

export function useReasons() {
  return useQuery("reasons", fetchReasons);
}
