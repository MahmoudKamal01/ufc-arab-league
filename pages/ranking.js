import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";

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
  const username = userData ? userData.name : "";
  const highlightedRowRef = useRef(null);

  useEffect(() => {
    const fetchStandingsData = async () => {
      try {
        const response = await api.get(
          "/api/v1/user/standings/64a8f41334a19ab5486bf513"
        );
        const standingsData = response.data.data;
        console.log("aaa", standingsData);
        // Sort standings data based on score in descending order
        const sortedData = standingsData.sort((a, b) => a.rank - b.rank);

        // // Assign ranks, handling ties
        // let rank = 1;
        // let prevScore = sortedData[0].score;
        // sortedData.forEach((user, index) => {
        //   if (user.score === prevScore) {
        //     user.rank = rank;
        //   } else {
        //     user.rank = index + 1;
        //     rank = index + 1;
        //   }
        //   prevScore = user.score;
        // });

        setUserRankData(sortedData);
        highlightedRowRef.current = userData ? userData.rank - 1 : null;
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
    if (isLoggedIn) {
      try {
        const userPredictionsResponse = await api.get(
          `/api/v1/user/predictions/${userId}`
        );
        const userPredictionsData =
          userPredictionsResponse.data.data.predictions;
        console.log("qqq", userPredictionsData);
        setUserPredictions(userPredictionsData);
        setShowPredictions(true);
      } catch (error) {
        console.error("Failed to fetch user predictions:", error);
        toast.error("Login first to see the predictions of other users!");
      }
    } else {
      toast.error("Login first to see the predictions of other users!");
    }
  };

  const handleClosePredictions = () => {
    setShowPredictions(false);
  };

  useEffect(() => {
    if (highlightedRowRef.current) {
      highlightedRowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [userRankData]);

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
              {userRankData.map((user) => (
                <tr
                  ref={user.rank === userData?.rank ? highlightedRowRef : null}
                  key={user._id}
                  className={
                    user.rank === userData?.rank
                      ? "bg-yellow-300"
                      : "hover:bg-gray-200"
                  }
                >
                  <td className="py-2 text-center">{user.rank}</td>
                  <td className="py-2 text-center">{user.userId?.name}</td>
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
            <h2 className="text-2xl font-bold mb-4">
              {userData?.name} {"`"}s Predictions
            </h2>
            <div className="overflow-x-auto overflow-y-auto max-h-96">
              <table className="min-w-full table-auto border border-gray-300 rounded">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="p-2 text-center">Fight</th>
                    <th className="p-2 text-center">Red Corner</th>
                    <th className="p-2 text-center">Win Method</th>
                    <th className="p-2 text-center">Win Time</th>
                    <th className="p-2 text-center">Blue Corner</th>
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
                        ).winnerFighter === "red" ? (
                          <div className="flex justify-center">
                            <span>{fight.fighters[0].name}</span>
                            <span className="min-w-[20px] min-h-[30px]">
                              <Image
                                src="/box.svg"
                                alt="box"
                                width="20"
                                height="30"
                              />
                            </span>
                          </div>
                        ) : (
                          fight.fighters[0].name
                        )}
                      </td>
                      <td className={`p-2 text-center bg-gray-300 lg:px-4`}>
                        {
                          userPredictions.find(
                            (p) => p.fightId._id === fight._id
                          )?.winMethod
                        }
                      </td>
                      <td className={`p-2 text-center bg-gray-300 lg:px-4`}>
                        {
                          userPredictions.find(
                            (p) => p.fightId._id === fight._id
                          )?.winTime
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
                        ).winnerFighter === "blue" ? (
                          <div className="flex justify-center">
                            {fight.fighters[1].name}
                            <span className="min-w-[20px] min-h-[30px]">
                              <Image
                                src="/box.svg"
                                alt="box"
                                width="20"
                                height="30"
                              />
                            </span>
                          </div>
                        ) : (
                          fight.fighters[1].name
                        )}
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
