import React from "react";
import axios from "axios";

const Poll = ({ poll }) => {
  const handleVote = async (option) => {
    try {
      await axios.post(`http://localhost:5000/api/polls/${poll._id}/vote`, { option });
    } catch (error) {
      console.error("Error voting", error);
    }
  };

  return (
    <div>
      <h2>{poll.question}</h2>
      {poll.options.map((option) => (
        <button key={option} onClick={() => handleVote(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Poll;
