import React, { useEffect, useState } from "react";

interface Challenge {
  id: number;
  title: string;
  reward: number;
}

const Gamify: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch challenges from the backend
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/gamify/challenges`);
        const data = await res.json();
        setChallenges(data.challenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  // Handle challenge completion
  const completeChallenge = async (challengeId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/gamify/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
        },
        body: JSON.stringify({ challenge_id: challengeId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Challenge completed!");
      } else {
        alert(data.message || "Failed to complete challenge.");
      }
    } catch (error) {
      console.error("Error completing challenge:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gamify Challenges</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold">{challenge.title}</h2>
            <p className="text-gray-600">Reward: ₹{challenge.reward}</p>
            <button
              onClick={() => completeChallenge(challenge.id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Complete Challenge"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gamify;