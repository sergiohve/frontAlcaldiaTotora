import axios from "axios";

const baseUrlBest = "https://www.reddit.com/r/best.json?limit=5";
const getBest = async () => {
  const { data } = await axios.get(baseUrlBest);
  return data;
};

export default {
  getBest
};
