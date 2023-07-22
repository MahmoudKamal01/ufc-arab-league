import FightItem from "./FightItem";
import Countdown from "./Countdown";
import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";
import Loader from "./Loader";
import { useAuth } from "../hooks/useAuth";

const MatchesList = ({ eventData, userPredictions }) => {
  const prevPredictions = userPredictions ? userPredictions.predictions : null;
  const date = eventData?.eventDate || "2024-07-30";
  const eventTitle = eventData?.eventTitle;
  const [isClosed, setIsClosed] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const targetDate = moment(date);
    const now = moment();

    if (now.isAfter(targetDate)) {
      setIsClosed(true);
    }
  }, [date, isClosed]);

  useEffect(() => {
    if (prevPredictions) {
      setPredictions(prevPredictions);
    }
    setIsLoading(false);
  }, [prevPredictions]);

  const handleFormSubmit = () => {
    if (isLoggedIn) {
      if (predictions.length !== eventData.fights.length) {
        toast.error("Please make predictions for all fights!");
        return;
      }

      const hasMissingPrediction = predictions.some(
        (prediction) =>
          !prediction.winnerFighter ||
          !prediction.winMethod ||
          !prediction.winTime
      );

      if (hasMissingPrediction) {
        toast.error("Please select a winner and a method for every fight!");
        return;
      }

      const body = {
        predictions: predictions,
      };

      console.log("object", body);
      api
        .put("/api/v1/user/predictions", body)
        .then((response) => {
          toast.success("Predictions submitted successfully!");
        })
        .catch((error) => {
          console.error(error.response);
          toast.error("Failed to submit predictions. Please try again later.");
        });
    } else {
      toast.error("You must log in first to submit your predictions!");
    }
  };

  const updatePrediction = (fightId, winner, winMethod, winTime) => {
    const index = predictions.findIndex(
      (prediction) => prediction.fightId._id === fightId
    );

    if (index !== -1) {
      setPredictions((prevState) =>
        prevState.map((prediction, i) =>
          i === index
            ? { ...prediction, winnerFighter: winner, winMethod, winTime }
            : prediction
        )
      );
    } else {
      setPredictions((prevState) => [
        ...prevState,
        {
          fightId: eventData.fights.find((fight) => fight._id === fightId),
          winnerFighter: winner,
          winMethod,
          winTime,
        },
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

  if (isLoading && isLoggedIn) {
    return <Loader />; // Show a loading state
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
