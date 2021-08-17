import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../constants/url";
import { authenticationService } from "../services/authentication.service";
const { refreshAuthToken } = authenticationService;

async function putOffer(offerid) {
  refreshAuthToken();
  const token = JSON.parse(localStorage.getItem("auth_token"));
  const data = await fetch(`${BASE_URL}/app/choose_offer`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ offer_id: offerid }),
  });
  const json = data.json();
  return json;
}

export function useOfferMutation() {
  const queryClient = useQueryClient();
  return useMutation((offerid) => putOffer(offerid), {
    onSettled: () => {
      queryClient.invalidateQueries("loans");
    },
  });
}
