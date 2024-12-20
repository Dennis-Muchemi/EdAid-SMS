import { Helmet } from "react-helmet-async";
import useScholarships from "../../../hooks/useScholarships";
import ManageScholarshipsRow from '../../../components/Dashboard/Rows/ManageScholarshipsRow'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
const ManageScholarships = () => {
  const [allScholarShip, ,refetch] = useScholarships()
  const axiosSecure = useAxiosSecure()
  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/Scholarships/${id}`)
      return data
    },
    onSuccess: data => {
     console.log(data);
     refetch()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Scholarship has been deleted",
        showConfirmButton: false,
        timer: 1500
    });
    },
  })
//  
  const handleDelete = async id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
      if ( result.isConfirmed) {
        await mutateAsync(id)
        
      }
  });
  }
  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <Helmet>
        <title>Manage Scholarships</title>
      </Helmet>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Scholarship name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    University Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Subject Category
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Applied Degree
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Application Fees
                  </th>

                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{/* User data table row */}
                {
                  allScholarShip.map(scholarship => <ManageScholarshipsRow key={scholarship._id} scholarship={scholarship} handleDelete={handleDelete}></ManageScholarshipsRow>)
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageScholarships;