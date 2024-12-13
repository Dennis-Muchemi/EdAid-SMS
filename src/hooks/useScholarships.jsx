import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useScholarships = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading: loading, refetch, isError, error } = useQuery({
        queryKey: ['allScholarShip'],
        queryFn: async () => {
            try {
                // Fetch data from the API
                const response = await axiosSecure.get(`/ScholarShip`);

                // Ensure the response is an array
                if (!Array.isArray(response.data)) {
                    console.error("Expected an array but received:", response.data);
                    throw new Error("API response is not a valid array");
                }

                return response.data;
            } catch (err) {
                console.error("Error fetching scholarships:", err);
                throw err; // Let React Query handle the error state
            }
        },
        onError: (error) => {
            console.error("Error fetching scholarships:", error);
        },
    });

    // Default to an empty array if data is undefined or invalid
    const allScholarShip = Array.isArray(data) ? data : [];

    return [allScholarShip, loading, refetch, isError, error];
};

export default useScholarships;
