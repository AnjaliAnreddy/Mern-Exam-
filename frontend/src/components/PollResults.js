import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const PollResults = ({ poll }) => {
  const data = poll.results.map((item) => ({ name: item.option, votes: item.votes }));

  return (
    <div>
      <h3>Results:</h3>
      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default PollResults;
