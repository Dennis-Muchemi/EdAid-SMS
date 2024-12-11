import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isPending: loading, refetch } = useQuery({
      queryKey: ['reviews'],
      queryFn: async () => {
          const { data } = await axiosSecure.get(`/reviews`);
          console.log("API Response:", data);
          // Validate the response and ensure it is always an array
          return Array.isArray(data) ? data : [];
      },
      onError: (error) => {
          console.error("Error fetching reviews:", error);
      },
  });

  return [data || [], loading, refetch]; // Always return an array
};


export default useReviews;