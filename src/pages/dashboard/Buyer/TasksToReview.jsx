import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCoins } from "react-icons/fa6";

const TasksToReview = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const { data: pendingSubmissions = [], refetch } = useQuery({
    queryKey: ["pendingSubmissions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-submissions");
      return res.data;
    },
  });

  const handleApprove = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to change approve this submission?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        confirmButtonText: "Yes, Approve",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/approve-submission/${id}`);
          if (res.data.modifiedCount > 0) {
            toast.success("Submission approved successfully");
            refetch();
          }
        }
      });
    } catch (error) {
      console.error("Failed to approve submission", error);
    }
  };

  const handleReject = async (id, taskId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to change Reject this submission?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, Reject",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/reject-submission/${id}`, {
            taskId,
          });
          if (res.data.modifiedCount > 0) {
            toast.success("Submission rejected successfully");
            refetch();
          }
        }
      });
    } catch (error) {
      console.error("Failed to reject submission", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl text-center font-bold mb-10 mt-16">
        Task To Review
      </h2>
      {pendingSubmissions.length === 0 ? (
        <p className="text-center text-gray-500">
          No Pending Submissions found.
        </p>
      ) : (
        <div className="overflow-x-auto mt-8">
          <table className="table w-full mt-8">
            <thead>
              <tr className="text-base text-left">
                <th className="w-[5%]">#</th>
                <th className="w-[20%]">Worker Name</th>
                <th className="w-[20%]">Task Title</th>
                <th className="w-[15%]">Payable Amount</th>
                <th className="w-[40%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingSubmissions.map((submission, index) => (
                <tr key={submission._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-bold">{submission.worker_name}</td>
                  <td>{submission.task_title}</td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCoins /> {submission.task_amount}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-evenly gap-2">
                      <button
                        className="btn btn-info uppercase"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-success uppercase"
                        onClick={() => handleApprove(submission._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn bg-red-500 uppercase"
                        onClick={() =>
                          handleReject(submission._id, submission.task_id)
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedSubmission && (
        <div className="modal modal-open ">
          <div className="modal-box space-y-3">
            <h3 className="font-bold text-lg">Submission Details</h3>
            <p>
              <strong>Worker Name:</strong> {selectedSubmission.worker_name}
            </p>
            <p>
              <strong>Task Title:</strong> {selectedSubmission.task_title}
            </p>
            <p>
              <strong>Payable Amount:</strong> $
              {selectedSubmission.payable_amount}
            </p>
            <p>
              <strong>Submission Details:</strong>{" "}
              {selectedSubmission.submission_details}
            </p>
            <div className="modal-action">
              <button
                className="btn btn-neutral uppercase"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksToReview;
