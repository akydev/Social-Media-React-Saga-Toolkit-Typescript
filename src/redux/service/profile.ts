import adminFetch from "../../axiosbase/interceptors";

async function profileService(id: string) {
  const response = await adminFetch.get(`/user/${id}`);
  return response.data;
}

export default profileService;
