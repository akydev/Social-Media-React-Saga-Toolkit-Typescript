import adminFetch from "../../axiosbase/interceptors";

async function timelineService(id: string) {
  const response = await adminFetch.get(`/post/${id}/timeline`);
  return response.data;
}

export default timelineService;
