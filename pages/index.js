import Navbar from "../components/Navbar";
import FightList from "../components/FightList";
import axios from "axios";
import api from "../utils/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
export default function Home() {
  const { isLoggedIn, handleLogout } = useAuth();
  const [event, setEvent] = useState(null);
  const [userPredictions, setUserPredictions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventDataResponse = await api.get("/api/v1/user/");
        const eventData = eventDataResponse.data.data;
        setEvent(eventData);

        const userPredictionsResponse = await api.get(
          "/api/v1/user/predictions/"
        );
        const userPredictionsData = userPredictionsResponse.data.data;

        setUserPredictions(userPredictionsData);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <FightList eventData={event} userPredictions={userPredictions} />
        </>
      )}
    </>
  );
}
