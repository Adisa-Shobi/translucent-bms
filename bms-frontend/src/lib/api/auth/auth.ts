import { postRequest } from "../remote";
import { authEndpoints } from "./authEnpoints";

export const registerRequest = async (data: any) => {
  return await postRequest(authEndpoints.register.post.url, data);
};
