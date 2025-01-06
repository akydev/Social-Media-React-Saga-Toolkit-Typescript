import authFetch from "../../axiosbase/custom";
import { IRegistration } from "../type/IRegistration";

async function registrationService(
  data: IRegistration
): Promise<IRegistration> {
  const response = await authFetch.post("/auth/registration", data);
  return response.data;
}

export default registrationService;
