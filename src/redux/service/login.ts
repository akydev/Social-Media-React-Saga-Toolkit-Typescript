import authFetch from "../../axiosbase/custom";
import { ILogin } from "../type/ILogin";

async function loginService(data: ILogin): Promise<ILogin> {
  const response = await authFetch.post("/auth/login", data);
  return response.data;
}

export default loginService;
