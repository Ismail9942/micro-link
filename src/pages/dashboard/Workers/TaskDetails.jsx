import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useRole from "../../../hooks/useRole";
import toast from "react-hot-toast";
import Spinner from "../../shareit/Spinner";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { userData } = useRole();
  const [submissionDetails, setSubmissionDetails] = useState("");

  const navigate = useNavigate();

  // Fetch task details
  useEffect(() => {
    const fetchTask = async () => {
      const res = await axiosPublic.get(`/tasks/${taskId}`);
      setTask(res.data);
      setLoading(false);
    };
    fetchTask();
  }, [axiosPublic, taskId]);

  // task submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      task_amount: task.task_amount,
      worker_email: userData.email,
      worker_name: userData.name,
      submission_details: submissionDetails,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      current_date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    await axiosSecure
      .post("/submissions", submissionData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Your submission has been sent and is pending review");
          setSubmissionDetails("");
          navigate(-1);
        }
      })
      .catch((error) => {
        toast.error(
          `Failed to submit the task. Please try again later. ${error}`
        );
      });
  };

  if (loading) {
    return <Spinner />;
  }

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <div className="grid grid-cols-4 border-2 rounded-xl">
      <div className="col-span-3 p-6 bg-orange-100">
        <img
          className="h-48 rounded-xl object-cover"
          src={task.task_image_url}
          alt="task image"
        />
        <h2 className="text-2xl font-bold mb-4">{task.task_title}</h2>
        <p>
          <strong>Details:</strong>{" "}
          {task.task_detail || "No additional details available"}
        </p>

        {/* Submission Form */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Submit Your Work</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="submission_details"
                className="block font-medium mb-2"
              >
                Submission Details
              </label>
              <textarea
                id="submission_details"
                name="submission_details"
                value={submissionDetails}
                onChange={(e) => setSubmissionDetails(e.target.value)}
                className="textarea textarea-bordered w-full"
                rows="4"
                placeholder="Enter your submission details"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn bg-primary  hover:bg-[#0d775dd7] text-white text-lg w-full"
            >
              Submit Work
            </button>
          </form>
        </div>
      </div>

      <div className="p-4">
        <div className="text-gray-600 flex justify-between p-4">
          <strong>Buyer:</strong> <p>{task?.buyer_name}</p>
        </div>
        <div className="text-gray-600 flex justify-between p-4">
          <strong>Completion Date:</strong>{" "}
          <p>{new Date(task.completion_date).toLocaleDateString()}</p>
        </div>
        <div className="text-gray-600 flex justify-between p-4">
          <strong>Payable Amount:</strong>{" "}
          <p className="flex items-center gap-1">
            ${task.task_amount}
            <FaCoins />
          </p>
        </div>
        <div className="text-gray-600 flex justify-between p-4">
          <strong>Required Workers:</strong> <p>{task.required_workers}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
