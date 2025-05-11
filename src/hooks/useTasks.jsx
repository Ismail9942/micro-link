import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useTasks = (email) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: tasks = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", email],
    queryFn: async () => {
      const endpoint = email ? `/tasks?email=${email}` : "/tasks";
      const { data } = await axiosPublic.get(endpoint);
      return data;
    },
  });
  return [tasks, loading, refetch];
};

export default useTasks;
