import axios from "axios";

const useCurrentUser = () => {
  return axios.get("/api/current");
};

export default useCurrentUser;
