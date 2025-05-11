import Swal from "sweetalert2";
import { useState } from "react";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useTasks from "../../../hooks/useTasks";
import Spinner from "../../shareit/Spinner";

const MyTasks = () => {
  const { userData, refetch: refetchAuthUser } = useRole();
  const axiosSecure = useAxiosSecure();
  const [tasks, loading, refetch] = useTasks(userData.email);
  const [selectedTask, setSelectedTask] = useState(null);

  // Update task
  const handleUpdate = (task) => {
    setSelectedTask(task);
    // Open modal
    document.getElementById("update_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("update_modal").close();
    setSelectedTask(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedTask = {
      task_title: formData.get("task_title"),
      task_detail: formData.get("task_detail"),
      submission_info: formData.get("submission_info"),
    };

    await axiosSecure
      .patch(`/tasks/${selectedTask._id}`, updatedTask)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Task updated success!");
          handleCloseModal();
          refetch();
        } else {
          toast.success("Failed to update the task!");
        }
      });
  };

  // delete task
  const handleDelete = async (task) => {
    const refillAmount = task.required_workers * task.task_amount;
    Swal.fire({
      title: `Delete Task`,
      text: `Deleting this task will refund ${refillAmount} coins to your balance. Do you want to proceed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Process the refund
        await axiosSecure
          .patch("/refund-coins", {
            taskId: task._id,
            amount: refillAmount,
          })
          .then(async (res) => {
            if (res.data.modifiedCount > 0) {
              // Delete the task
              await axiosSecure.delete(`/tasks/${task._id}`).then((res) => {
                if (res.data.deletedCount) {
                  refetch();
                  refetchAuthUser();
                  toast.success("Task has been deleted!");
                }
              });
            }
          });
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full">
      <div className="flex justify-around mb-10 items-center">
        <h2 className="text-3xl font-bold">Your Added Tasks</h2>
        <h2 className="text-3xl font-bold">Total Tasks: {tasks.length}</h2>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table sm:table-lg w-full text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Details</th>
                <th>Required Workers</th>
                <th> Amount</th>
                <th>Completion Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr className="h-24" key={task._id}>
                  <td>{index + 1}</td>
                  <td className="text-base font-bold">{task.task_title}</td>
                  <td className="overflow-hidden text-sm">
                    {task.task_detail.slice(0, 60)}...
                  </td>
                  <td className="text-sm">{task.required_workers}</td>
                  <td className="text-sm">{task.task_amount}</td>
                  <td className="text-sm">{task.completion_date}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm mr-2"
                      onClick={() => handleUpdate(task)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(task)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
        {selectedTask && (
          <form onSubmit={handleUpdateSubmit} className="modal-box">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Update task</h3>
            <div className="mb-4">
              <label className="label">Task Title</label>
              <input
                type="text"
                name="task_title"
                defaultValue={selectedTask?.task_title}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="label">Submission Info</label>
              <input
                type="text"
                name="submission_info"
                defaultValue={selectedTask?.submission_info}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="label">Task Detail</label>
              <textarea
                name="task_detail"
                defaultValue={selectedTask?.task_detail}
                className="textarea textarea-bordered w-full"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-info text-white text-lg w-full"
            >
              Update Task
            </button>
          </form>
        )}
      </dialog>
    </div>
  );
};

export default MyTasks;
