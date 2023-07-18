import Navbar from "../components/Navbar";
import FightList from "../components/FightList";
import axios from "axios";

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
    const response = await axios.get(
      "https://ufc-arab-league.onrender.com/api/v1/user"
    );
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
