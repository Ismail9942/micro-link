import axios from "axios";

export const saveUser = async (user) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/users/${user?.email}`,
    {
      email: user?.email,
      name: user?.name,
      image: user?.photo,
      role: user?.role,
      coins: user?.coins,
    }
  );
  return response.data;
};
