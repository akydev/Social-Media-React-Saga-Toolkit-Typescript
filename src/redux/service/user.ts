import adminFetch from "../../axiosbase/interceptors";

async function userService() {
  const response = await adminFetch.get("/user");
  return response.data;
}

export default userService;
