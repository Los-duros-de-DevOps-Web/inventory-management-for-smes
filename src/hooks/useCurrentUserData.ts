import axios from "axios";

const useCurrentUserData = () => {
  return axios.get("/api/current");
};

export default useCurrentUserData;
