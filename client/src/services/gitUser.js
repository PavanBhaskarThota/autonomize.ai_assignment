const gitUser = {
  getUser: async (username) => {
    try {
      const response = await fetch(`http://localhost:7700/user`, username);
      const user = await response.json();
      return user;
    } catch (error) {
      return error;
    }
  },
};

export default gitUser;
