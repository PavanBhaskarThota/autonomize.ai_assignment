import api from "../Api";

const gitUser = {
  // getUser: async (username) => {
  //   try {
  //     const response = await fetch(`http://localhost:7700/user`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username }),
  //     });
  //     const user = await response.json();
  //     if(user){
  //       localStorage.setItem("user", JSON.stringify(user.login));
  //     }
  //     return user;
  //   } catch (error) {
  //     return error;
  //   }
  // },

  getUser: async (username) => {
    return await api.post("/user", { username });
  },
};

export default gitUser;
