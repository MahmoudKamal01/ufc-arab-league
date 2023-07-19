import FightItem from "./FightItem";
import Countdown from "./Countdown";
import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";

import { useAuth } from "../hooks/useAuth";
const MatchesList = ({ eventData, userPredictions }) => {
  const prevPredictions = userPredictions.predictions;
  const date = "2023-07-30";
  const eventTitle = eventData.eventTitle;
  const [isClosed, setIsClosed] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    const targetDate = moment(date);
    const now = moment();
    console.log("ee", now);
    if (now.isAfter(targetDate)) {
      setIsClosed(true);
    }
  }, [date, isClosed]);

  const handleFormSubmit = () => {
    if (isLoggedIn) {
      if (predictions.length !== eventData.fights.length) {
        toast.error("Please make predictions for all fights!");
        return;
      }

      const hasMissingPrediction = predictions.some(
        (prediction) => !prediction.winnerFighter || !prediction.winMethod
      );

      if (hasMissingPrediction) {
        toast.error("Please select a winner and a method for every fight!");
        return;
      }

      const body = {
        predictions: predictions,
      };
      api
        .put("/api/v1/user/predictions", body)
        .then((response) => {
          console.log("pred res", response.data); // Response from the server after successful submission
          toast.success("Predictions submitted successfully!");
        })
        .catch((error) => {
          console.error(error.response);
          toast.error("Failed to submit predictions. Please try again later.");
        });

      // console.log({ predictions: predictions }); // Response from the server after successful submission
    } else {
      // User is not logged in, show a Toastify notification

      toast.error("You must log in first to submit your predictions!");
    }
  };

  const updatePrediction = (fightId, winner, winMethod) => {
    // Check if the fightId is already present in predictions array
    const index = predictions.findIndex(
      (prediction) => prediction.fightId === fightId
    );

    if (index !== -1) {
      // If the fightId is already present, update the prediction
      setPredictions((prevState) =>
        prevState.map((prediction, i) =>
          i === index
            ? { ...prediction, winnerFighter: winner, winMethod }
            : prediction
        )
      );
    } else {
      // If the fightId is not present, add a new prediction
      setPredictions((prevState) => [
        ...prevState,
        { fightId, winnerFighter: winner, winMethod },
      ]);
    }
  };

  if (isClosed) {
    return (
      <>
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center space-y-4">
          <h2 className="text-white bold text-xl p-4 m-2 text-center">
            Make your predictions for the upcoming UFC event:
          </h2>
          <h1 className="text-[#FACC15] font-bold text-4xl tracking-widest text-2xl">
            {eventTitle}
          </h1>
          <Countdown date={date} />
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center space-y-4 pb-16">
      <h2 className="text-white bold text-xl p-4 m-2 text-center">
        Make your predictions for the upcoming UFC event:
      </h2>
      <h1 className="text-[#FACC15] font-bold text-4xl tracking-widest text-2xl">
        {eventTitle.toUpperCase() || eventTitle}
      </h1>
      <Countdown date={date} />
      {/* {prevPredictions.map((fight) => (
        <div
          key={fight.fightId._id}
          className="flex flex-row items-center justify-around h-[200px] lg:w-3/4 w-[90%] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-[#FFF] border-solid border-4"
        >
          <div
            className={`flex flex-col items-center justify-center bg-red-100 h-full w-1/3 ${
              fight.winnerFighter === "red" ? "bg-red-200" : ""
            }`}
          >
            <button
              className={`p-2 border lg:text-xl font-bold rounded h-full w-full ${
                fight.winnerFighter === "red" ? "bg-red-500 text-white" : ""
              } hover:bg-red-500 hover:text-white transition-colors duration-300 player-button`}
              onClick={() => handleWinnerChange("red")}
            >
              redPlayer
            </button>
          </div>
          <div className="flex flex-col bg-white w-[33.3%] h-full">
            <button
              className={`h-1/3 p-2 border ${
                fight.winMethod === "KO/TKO"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100"
              } ${
                fight.winMethod === "KO/TKO" ? "text-white" : ""
              } hover:bg-gray-500 hover:text-white transition-colors duration-300`}
              onClick={() => handleMethodChange("KO/TKO")}
            >
              KO/TKO
            </button>
            <button
              className={`h-1/3 p-2 border ${
                fight.winMethod === "Submission"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100"
              } ${
                fight.winMethod === "Submission" ? "text-white" : ""
              } hover:bg-gray-500 hover:text-white transition-colors duration-300`}
              onClick={() => handleMethodChange("Submission")}
            >
              Submission
            </button>
            <button
              className={`h-1/3 p-2 border ${
                fight.winMethod === "Decision"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-100"
              } ${
                fight.winMethod === "Decision" ? "text-white" : ""
              } hover:bg-gray-500 hover:text-white transition-colors duration-300`}
              onClick={() => handleMethodChange("Decision")}
            >
              Decision
            </button>
          </div>
          <div
            className={`flex flex-col items-center justify-center bg-blue-100 h-full w-1/3 ${
              fight.winnerFighter === "blue" ? "bg-blue-200" : ""
            }`}
          >
            <button
              className={`p-2 border h-full w-full lg:text-xl font-bold rounded ${
                fight.winnerFighter === "blue" ? "bg-blue-500 text-white" : ""
              } hover:bg-blue-500 hover:text-white transition-colors duration-300 player-button`}
              onClick={() => handleWinnerChange("blue")}
            >
              bluePlayer
            </button>
          </div>
        </div>
      ))} */}

      {eventData.fights.map((fight) => (
        <FightItem
          fight={fight}
          key={fight._id}
          updatePrediction={updatePrediction}
          prevPredictions={prevPredictions}
        />
      ))}
      <div className="mt-4">
        <button
          className="px-4 py-2 ml-6 bg-[#FBBF24] text-black font-bold rounded hover:bg-white"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MatchesList;
