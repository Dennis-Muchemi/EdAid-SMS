import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useScholarships = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading: loading, refetch, isError, error } = useQuery({
        queryKey: ['allScholarShip'],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/ScholarShip`);
                // Ensure the response is an array
                if (!Array.isArray(data)) {
                    console.error("Expected an array but received:", data);
                    return [];  // Return an empty array if data is not in the expected format
                }
                return data;
            } catch (err) {
                console.error("Error fetching scholarships:", err);
                return [];  // Return an empty array in case of an error
            }
        },
        onError: (error) => {
            console.error("Error fetching scholarships:", error);
        },
    });

    // Always return an array, even if `data` is undefined or invalid
    const allScholarShip = Array.isArray(data) ? data : [];

    return [allScholarShip, loading, refetch, isError, error];
};

export default useScholarships;
