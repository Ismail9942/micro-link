import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTasks from "../../../hooks/useTasks";
import toast from "react-hot-toast";
import Spinner from "../../shareit/Spinner";

const ManageTasks = () => {
  const [tasks, loading, refetch] = useTasks();
  const axiosSecure = useAxiosSecure();

  // delete task
  const handleDelete = async (task) => {
    const refillAmount = task.required_workers * task.payable_amount;

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
              await axiosSecure
                .delete(`/tasks/${task._id}`)
                .then((deleteRes) => {
                  if (deleteRes.data.deletedCount) {
                    refetch();
                    toast.success("Task has been deleted");
                  }
                });
            }
          });
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-[50vh]">
      <div className="flex justify-around my-10 items-center">
        <h2 className="text-3xl font-bold">Manage All Tasks</h2>
        <h2 className="text-3xl font-bold">Total Tasks: {tasks.length}</h2>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table sm:table-lg w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Details</th>
                <th>Required Workers</th>
                <th>Payable Amount</th>
                <th>Completion Date</th>
                <th>Added By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td className="text-base font-bold">{task.task_title}</td>
                  <td className="text-sm">
                    {task.task_detail.slice(0, 30)}...
                  </td>
                  <td className="text-sm">{task.required_workers}</td>
                  <td className="text-sm">{task.task_amount}</td>
                  <td className="text-sm">{task.completion_date}</td>
                  <td className="text-sm">{task.buyer_email}</td>
                  <td>
                    <button
                      className="btn bg-red-600 text-white hover:bg-red-700 btn-sm"
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
    </div>
  );
};

export default ManageTasks;
