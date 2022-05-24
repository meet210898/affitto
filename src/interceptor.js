import axios from "axios";

// Set config defaults when creating the instance

const instance = axios.create({
  baseURL: "https://localhost:4000",
  headers: {
    // Authorization: `Bearer ${userToken.token}`,
  },
});

export default instance;
