import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Poll from "./components/Poll";
import PollResults from "./components/PollResults";

const socket = io("http://localhost:5000"); // Connect to backend

const App = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();

    // Listen for real-time updates
    socket.on("pollUpdated", (updatedPoll) => {
      setPolls((prevPolls) =>
        prevPolls.map((poll) => (poll._id === updatedPoll._id ? updatedPoll : poll))
      );
    });

    return () => socket.off("pollUpdated");
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/polls");
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls", error);
    }
  };

  return (
    <div>
      <h1>Real-time Voting App</h1>
      {polls.map((poll) => (
        <div key={poll._id}>
          <Poll poll={poll} />
          <PollResults poll={poll} />
        </div>
      ))}
    </div>
  );
};

export default App;
