import api from "../Api";

const gitUser = {
  getUser: async (username) => {
    return await api.post("/user", { username });
  },

  getAllUsers: async () => {
    return await api.get("/user");
  },

  deleteUser: async (id) => {
    console.log(id);
    return await api.delete(`/user/${id}`);
  },
};

export default gitUser;
