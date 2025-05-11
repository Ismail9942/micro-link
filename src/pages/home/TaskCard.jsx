import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TaskCard = () => {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosPublic.get("/top-workers");

        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.log(`Error fetching tasks ${error}`);
        setTasks([]);
      }
    };
    fetchData();
  }, [axiosPublic]);

  return (
    <div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="card bg-white shadow-xl h-fit rounded-xl"
          >
            <figure>
              <img
                className="w-full h-[250px] rounded-t-xl object-cover"
                src={task.image}
                alt="task image"
              />
            </figure>

            <div className="flex flex-col h-full gap-3 p-4">
              <h3 className="text-xl font-bold mb-2">{task.name}</h3>
              {/* <div className="text-gray-600 flex justify-between">
                <strong>Buyer:</strong> <p>{task?.buyer_name}</p>
              </div> */}
              <div className="text-gray-600 flex justify-between">
                <strong>Completion Date:</strong>
                <p>{new Date(task.timestamp).toLocaleDateString()}</p>
              </div>

              {task.previous_coins && (
                <div className="text-gray-600 flex justify-between">
                  <strong>Previous Coins:</strong>
                  <p className="flex items-center gap-1">
                    {task.coins}
                    <FaCoins />
                  </p>
                </div>
              )}
              <div className="text-gray-600 flex justify-between">
                <strong>Current Coins:</strong>
                <p className="flex items-center gap-1">
                  {task.coins}
                  <FaCoins />
                </p>
              </div>
              {/* <div className="text-gray-600 flex justify-between">
                <strong>Required Workers:</strong>
                <p>{task.required_workers}</p>
              </div> */}
              <div className="flex-grow">
                <NavLink
                  to={`/dashboard/tasks-details/${task._id}`}
                  className="btn bg-neutral hover:bg-secondary text-white hover:text-black font-semibold text-base hover:underline underline-offset-2 decoration-2 decoration-black"
                >
                  View Details <MdKeyboardDoubleArrowRight />
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
