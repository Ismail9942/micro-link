import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  // Handle delete user
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success(`${user.name} has been removed.`);
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              console.log(res);
              refetch();
              toast.success(`${user.name} has been removed.`);
            }
          })
          .catch((err) => {
            toast.error(`Failed to delete the user ${err.message}`);
          });
      }
    });
  };

  // Handle role change
  const handleRoleChange = (userId, newRole, userName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to change ${userName}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(userId, newRole, userName);

        axiosSecure
          .patch(`/users/${userId}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              toast.success(`${userName}'s role updated to ${newRole}`);
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error(`Failed to update user role ${err.message}`);
          });
      }
    });
  };

  return (
    <div className="min-h-[50vh] p-4">
      <div className="flex justify-around my-10 items-center">
        <h2 className="text-3xl font-bold">All Users</h2>
        <h2 className="text-3xl font-bold">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Coins</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.image} alt="User Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50 capitalize">
                        {user.role}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.coins}</td>
                <td>
                  <select
                    className="select select-bordered"
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value, user.name)
                    }
                  >
                    <option value="Admin">Admin</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Worker">Worker</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
