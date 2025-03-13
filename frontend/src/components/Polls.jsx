import { useEffect, useState } from "react";
import { getPolls, votePoll } from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Polls() {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        fetchPolls();
        socket.on("updateResults", fetchPolls);
        return () => socket.off("updateResults");
    }, []);

    const fetchPolls = async () => {
        const { data } = await getPolls();
        setPolls(data);
    };

    const handleVote = async (pollId, option) => {
        await votePoll(pollId, option);
        socket.emit("vote", pollId);
    };

    return (
        <div>
            <h1>Live Polls</h1>
            {polls.map((poll) => (
                <div key={poll._id}>
                    <h3>{poll.question}</h3>
                    {poll.options.map((opt) => (
                        <button key={opt.text} onClick={() => handleVote(poll._id, opt.text)}>
                            {opt.text} ({opt.votes} votes)
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Polls;
