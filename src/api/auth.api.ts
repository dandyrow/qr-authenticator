import { UserCreds } from "@/types/stateTypes";

const APIURL = "http://localhost:8080";

export const requestTokens = async ( userCreds: UserCreds ): Promise<Response> => {
  return fetch(APIURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCreds),
  });
};
