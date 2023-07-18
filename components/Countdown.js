import { useEffect, useState } from "react";
import moment from "moment";

const Countdown = ({ date }) => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      const targetDate = moment(date);
      const duration = moment.duration(targetDate.diff(now));

      if (duration.asMilliseconds() <= 0) {
        clearInterval(timer);
        setIsClosed(true);
      } else {
        const durationDays = duration.days().toString().padStart(2, "0");
        const durationHours = duration.hours().toString().padStart(2, "0");
        const durationMinutes = duration.minutes().toString().padStart(2, "0");
        const durationSeconds = duration.seconds().toString().padStart(2, "0");

        setDays(durationDays);
        setHours(durationHours);
        setMinutes(durationMinutes);
        setSeconds(durationSeconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  useEffect(() => {
    // Update the countdown immediately once mounted
    const now = moment();
    const targetDate = moment(date);
    const duration = moment.duration(targetDate.diff(now));

    if (duration.asMilliseconds() <= 0) {
      setIsClosed(true);
    } else {
      const durationDays = duration.days().toString().padStart(2, "0");
      const durationHours = duration.hours().toString().padStart(2, "0");
      const durationMinutes = duration.minutes().toString().padStart(2, "0");
      const durationSeconds = duration.seconds().toString().padStart(2, "0");

      setDays(durationDays);
      setHours(durationHours);
      setMinutes(durationMinutes);
      setSeconds(durationSeconds);
    }
  }, []);

  return (
    <div className="border-white border-2 rounded-lg text-white font-semibold p-4 text-center w-84 text-base">
      <div className="text-3xl">Deadline</div>
      {isClosed ? (
        <div className="text-6xl mt-4">Closed</div>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col items-center mx-2">
            <div className="lg:text-6xl text-4xl">{days}</div>
            <div className="lg:text-2xl text-sm">
              {days === "01" ? "Day" : "Days"}
            </div>
          </div>
          <div className="flex flex-col items-center mx-2">
            <div className="lg:text-6xl text-4xl">{hours}</div>
            <div className="lg:text-2xl text-sm">Hours</div>
          </div>
          <div className="flex flex-col items-center mx-2">
            <div className="lg:text-6xl text-4xl">{minutes}</div>
            <div className="lg:text-2xl text-sm">Minutes</div>
          </div>
          <div className="flex flex-col items-center mx-2">
            <div className="lg:text-6xl text-4xl">{seconds}</div>
            <div className="lg:text-2xl text-sm">Seconds</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
