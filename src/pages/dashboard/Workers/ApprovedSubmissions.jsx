import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApprovedSubmissions = () => {
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchApprovedSubmissions = async () => {
      const res = await axiosSecure.get("/approved-submissions");
      setApprovedSubmissions(res.data);
    };

    fetchApprovedSubmissions();
  }, [axiosSecure]);

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl text-center font-bold mb-10 mt-16">
        All Approved Task Submissions
      </h2>
      {approvedSubmissions.length > 0 ? (
        <div className="bg-white shadow-md mb-10">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-orange-100 text-left">
                  <th className="px-4 py-2 border border-gray-300">#</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Task Title
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Payable Amount
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Buyer Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((submission, index) => (
                  <tr key={submission._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2 max-w-60">
                      {submission.task_title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {submission.task_amount}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {submission.buyer_name}
                    </td>
                    <td className="border border-gray-300 p-2 font-bold capitalize text-green-500">
                      {submission.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 ">No submissions Approved.</p>
      )}
    </div>
  );
};

export default ApprovedSubmissions;
