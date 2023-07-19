import Navbar from "../components/Navbar";
import FightList from "../components/FightList";
import axios from "axios";
import api from "../utils/api";
export default function Home(eventData) {
  return (
    <>
      <Navbar />
      <FightList eventData={eventData} />
    </>
  );
}
export async function getServerSideProps() {
  try {
    const response = await api.get("/api/v1/user");
    console.log("object", response);
    const eventData = response.data.data;
    return {
      props: eventData,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        eventData: null,
      },
    };
  }
}
