import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useScholearShips = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading: loading, refetch } = useQuery({
        queryKey: ['allScholarShip'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/ScholarShip`);
            // Ensure the response is an array
            if (!Array.isArray(data)) {
                console.error("Expected an array but received:", data);
                return [];
            }
            return data;
        },
        onError: (error) => {
            console.error("Error fetching scholarships:", error);
        },
    });

    // Always return an array, even if `data` is undefined or invalid
    const allScholarShip = Array.isArray(data) ? data : [];

    return [allScholarShip, loading, refetch];
};

export default useScholearShips;
