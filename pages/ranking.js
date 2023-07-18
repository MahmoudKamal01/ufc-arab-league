import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const UserRankTable = () => {
  const [userRankData, setUserRankData] = useState([]);
  const currentUserId = 3;
  // Fetch user rank data based on API or any other data source
  useEffect(() => {
    // Simulated user rank data
    const mockUserRankData = [
      { id: 1, name: "John Doe", score: 100 },
      { id: 2, name: "Jane Smith", score: 90 },
      { id: 3, name: "Mike Johnson", score: 80 },
      { id: 4, name: "Sarah Adams", score: 70 },
      { id: 5, name: "David Lee", score: 60 },

      // Add more user rank data here
    ];

    // Sort user rank data based on score in descending order
    const sortedData = mockUserRankData.sort((a, b) => b.score - a.score);

    // Set the user rank data
    setUserRankData(sortedData);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex flex-col ">
        <h1 className="text-[#FACC15] font-bold text-4xl tracking-widest text-2xl  my-8 text-center">
          Current ranking
        </h1>
        <div className="overflow-x-auto w-[80%]  mx-auto bg-white mb-16">
          <table className="min-w-full table-auto border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="py-2 text-center">Rank</th>
                <th className="py-2 text-center">Name</th>
                <th className="py-2 text-center">Score</th>
              </tr>
            </thead>
            <tbody>
              {userRankData.map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    user.id === currentUserId
                      ? "bg-yellow-300 "
                      : "hover:bg-gray-200"
                  }
                >
                  <td className="py-2 text-center">{index + 1}</td>
                  <td className="py-2 text-center">{user.name}</td>
                  <td className="py-2 text-center">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserRankTable;
