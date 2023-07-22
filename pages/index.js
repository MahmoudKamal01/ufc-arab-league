import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../utils/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import FightList from "../components/FightList";

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [event, setEvent] = useState(null);
  const [userPredictions, setUserPredictions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const eventDataResponse = await api.get("/api/v1/user/");
      const eventData = eventDataResponse.data.data;
      setEvent(eventData);
      let userPredictionsResponse = null;
      console.log("aaaa");
      if (isLoggedIn) {
        try {
          userPredictionsResponse = await api.get("/api/v1/user/predictions");
        } catch (error) {
          setUserPredictions({});
        }
        if (!userPredictionsResponse) {
          setIsLoading(false);
        } else {
          const userPredictionsData = userPredictionsResponse.data.data;
          setUserPredictions(userPredictionsData);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [isLoggedIn]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <FightList eventData={event} userPredictions={userPredictions} />
      <div className="fixed bottom-0 right-0 p-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white font-bold rounded"
          onClick={handleOpenModal}
        >
          Scoring System
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Scoring System
            </h2>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Main Card Fights:</h3>
              <p>
                Correctly predicting the winner fighter:{" "}
                <span className="font-bold text-blue-500">10 points</span>
              </p>
              <p>
                Correctly predicting the winning method:{" "}
                <span className="font-bold text-red-500">5 points</span>
              </p>
              <p>
                Getting both the winner fighter and win method correct:{" "}
                <span className="font-bold  text-yellow-500">30 points</span>
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Prelims Card Fights:</h3>
              <p>
                Correctly predicting the winner fighter:{" "}
                <span className="font-bold text-blue-500">7 points</span>
              </p>
              <p>
                Correctly predicting the winning method:{" "}
                <span className="font-bold text-red-500">3 points</span>
              </p>
              <p>
                Getting both the winner fighter and win method correct:{" "}
                <span className="font-bold text-yellow-600">20 points</span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                Early Prelims Card Fights:
              </h3>
              <p>
                Correctly predicting the winner fighter:{" "}
                <span className="font-bold text-blue-500">5 points</span>
              </p>
              <p>
                Correctly predicting the winning method:{" "}
                <span className="font-bold text-red-500">2 points</span>
              </p>
              <p>
                Getting both the winner fighter and win method correct:{" "}
                <span className="font-bold text-yellow-500">14 points</span>
              </p>
            </div>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded mt-4 w-full"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
