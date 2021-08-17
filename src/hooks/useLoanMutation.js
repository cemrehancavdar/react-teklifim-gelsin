import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../constants/url";
import { authenticationService } from "../services/authentication.service";

const { refreshAuthToken } = authenticationService;

async function postLoan(payload) {
  refreshAuthToken();
  const token = JSON.parse(localStorage.getItem("auth_token"));
  const data = await fetch(`${BASE_URL}/app/loans`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ...payload }),
  });
  // const json = data.json();
}

export function useLoanMutation() {
  const queryClient = useQueryClient();
  return useMutation((offerid) => postLoan(offerid), {
    onSettled: () => {
      queryClient.invalidateQueries("loans");
    },
  });
}
