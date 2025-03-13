import axios from "axios";

const API_URL = "http://localhost:5000";

export const getPolls = async () => await axios.get(`${API_URL}/polls`);
export const votePoll = async (pollId, option) => await axios.post(`${API_URL}/polls/${pollId}/vote`, { option });
