import { useState, useEffect } from "react";
const FightItem = ({ fight, updatePrediction, prevPredictions }) => {
  const [winner, setWinner] = useState("");
  const [method, setMethod] = useState("");

  useEffect(() => {
    // Check if the fightId exists in the prevPredictions array
    let prevPrediction;
    if (prevPredictions) {
      prevPrediction = prevPredictions.find(
        (prediction) => prediction.fightId._id === fight._id
      );
    }

    if (prevPrediction) {
      setWinner(prevPrediction.winnerFighter);
      setMethod(prevPrediction.winMethod);
    }
  }, [fight._id, prevPredictions]);

  const handleWinnerChange = (selectedWinner) => {
    setWinner(selectedWinner);
    updatePrediction(fight._id, selectedWinner, method);
  };

  const handleMethodChange = (selectedMethod) => {
    setMethod(selectedMethod);
    updatePrediction(fight._id, winner, selectedMethod);
  };

  const redPlayer =
    fight.fighters[fight.fighters[0].corner === "red" ? 0 : 1].name;
  const bluePlayer =
    fight.fighters[fight.fighters[0].corner === "blue" ? 0 : 1].name;

  return (
    <div className="flex flex-row items-center justify-around h-[200px] lg:w-3/4 w-[90%] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-[#FFF] border-solid border-4">
      <div
        className={`flex flex-col items-center justify-center bg-red-100  h-full w-1/3 ${
          winner === "red" ? "bg-red-200" : ""
        }`}
      >
        <button
          className={`p-2 border lg:text-xl  font-bold rounded h-full w-full ${
            winner === "red" ? "bg-red-500 text-white" : ""
          } hover:bg-red-500 hover:text-white transition-colors duration-300 player-button`}
          onClick={() => handleWinnerChange("red")}
        >
          {redPlayer}
        </button>
      </div>
      <div className="flex flex-col bg-white w-[33.3%] h-full">
        <button
          className={`h-1/3 p-2 border ${
            method === "KO/TKO" ? "bg-gray-500 text-white" : "bg-gray-100"
          } ${
            method === "KO/TKO" ? "text-white" : ""
          } hover:bg-gray-500 hover:text-white transition-colors duration-300`}
          onClick={() => handleMethodChange("KO/TKO")}
        >
          KO/TKO
        </button>
        <button
          className={`h-1/3 p-2 border ${
            method === "Submission" ? "bg-gray-500 text-white" : "bg-gray-100"
          } ${
            method === "Submission" ? "text-white" : ""
          } hover:bg-gray-500 hover:text-white transition-colors duration-300`}
          onClick={() => handleMethodChange("Submission")}
        >
          Submission
        </button>
        <button
          className={`h-1/3 p-2 border ${
            method === "Decision" ? "bg-gray-500 text-white" : "bg-gray-100"
          } ${
            method === "Decision" ? "text-white" : ""
          } hover:bg-gray-500 hover:text-white transition-colors duration-300`}
          onClick={() => handleMethodChange("Decision")}
        >
          Decision
        </button>
      </div>
      <div
        className={`flex flex-col items-center justify-center bg-blue-100  h-full w-1/3 ${
          winner === "blue" ? "bg-blue-200" : ""
        }`}
      >
        <button
          className={`p-2 border h-full w-full lg:text-xl font-bold rounded ${
            winner === "blue" ? "bg-blue-500 text-white" : ""
          } hover:bg-blue-500 hover:text-white transition-colors duration-300 player-button`}
          onClick={() => handleWinnerChange("blue")}
        >
          {bluePlayer}
        </button>
      </div>
    </div>
  );
};

export default FightItem;
