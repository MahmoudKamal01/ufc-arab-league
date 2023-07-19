import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
const UserRankTable = () => {
  const [userRankData, setUserRankData] = useState([]);
  const [userPredictions, setUserPredictions] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { getUser } = useAuth();
  const userData = getUser();
  const username = userData ? userData.name : null;

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
    const fetchStandingsData = async () => {
      try {
        const response = await api.get(
          "/api/v1/user/standings/64a8f41334a19ab5486bf513"
        );
        const standingsData = response.data.data;

        // Sort standings data based on score in descending order
        const sortedData = standingsData.sort((a, b) => b.score - a.score);

        setUserRankData(sortedData);
      } catch (error) {
        console.error("Failed to fetch standings data:", error);
      }
    };

    const fetchEventData = async () => {
      try {
        const eventDataResponse = await api.get("/api/v1/user/");
        const eventData = eventDataResponse.data.data;
        setEventData(eventData);
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (username !== null) {
      fetchStandingsData();
      fetchEventData();
    }
  }, [username]);

  const handleShowPredictions = async (userId) => {
    try {
      const userPredictionsResponse = await api.get(
        `/api/v1/user/predictions/${userId}`
      );
      const userPredictionsData = userPredictionsResponse.data.data.predictions;
      setUserPredictions(userPredictionsData);
      setShowPredictions(true);
    } catch (error) {
      console.error("Failed to fetch user predictions:", error);
    }
  };

  const handleClosePredictions = () => {
    setShowPredictions(false);
  };

  if (isLoading) return <Loader />;
  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex flex-col">
        <h1 className="text-[#FACC15] font-bold text-4xl tracking-widest text-2xl my-8 text-center">
          Current ranking
        </h1>
        <div className="overflow-x-auto w-[80%] mx-auto bg-white mb-16">
          <table className="min-w-full table-auto border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="p-2 text-center">Rank</th>
                <th className="p-2 text-center">Name</th>
                <th className="p-2 text-center">Score</th>
                <th className="p-2 text-center">Predictions</th>
              </tr>
            </thead>
            <tbody>
              {userRankData.map((user, index) => (
                <tr
                  key={user._id}
                  className={
                    user.userId.name === username
                      ? "bg-yellow-300"
                      : "hover:bg-gray-200"
                  }
                >
                  <td className="py-2 text-center">{index + 1}</td>
                  <td className="py-2 text-center">{user.userId.name}</td>
                  <td className="py-2 text-center">{user.score}</td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => handleShowPredictions(user._id)}
                      className="bg-gray-800 hover:bg-black text-white font-bold py-1 px-2 rounded text-sm lg:py-2 lg:px-4"
                    >
                      Show predictions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPredictions && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded">
            <h2 className="text-2xl font-bold mb-4">User Predictions</h2>
            <div className="overflow-x-auto overflow-y-auto max-h-96">
              <table className="min-w-full table-auto border border-gray-300 rounded">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-2 text-center">Fight</th>
                    <th className="p-2 text-center">Red Player</th>
                    <th className="p-2 text-center">Win Method</th>
                    <th className="p-2 text-center">Blue Player</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData.fights.map((fight, index) => (
                    <tr key={fight._id}>
                      <td className="p-2 text-center">{index + 1}</td>
                      <td
                        className={`p-2 text-center ${
                          userPredictions.find(
                            (p) => p.fightId._id === fight._id
                          ).winnerFighter === "red"
                            ? "bg-red-500"
                            : "bg-red-100"
                        } `}
                      >
                        {userPredictions.find(
                          (p) => p.fightId._id === fight._id
                        ).winnerFighter === "red"
                          ? fight.fighters[0].name + "🏆"
                          : fight.fighters[0].name}
                      </td>
                      <td className={`p-2 text-center bg-gray-300 lg:px-4`}>
                        {
                          userPredictions.find(
                            (p) => p.fightId._id === fight._id
                          )?.winMethod
                        }
                      </td>
                      <td
                        className={`p-2 text-center ${
                          userPredictions.find(
                            (p) => p.fightId._id === fight._id
                          ).winnerFighter === "blue"
                            ? "bg-blue-500"
                            : "bg-blue-100"
                        } `}
                      >
                        {userPredictions.find(
                          (p) => p.fightId._id === fight._id
                        ).winnerFighter === "blue"
                          ? fight.fighters[1].name + "🏆"
                          : fight.fighters[1].name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleClosePredictions}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRankTable;
