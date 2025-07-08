import { useEffect, useState } from "react";
import SealND from "../SealND";



export default function Timer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const weddingDate = new Date("2025-08-03T14:00:00"); // Replace with actual wedding date/time

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      const time = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };

      setTimeLeft(time);
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="section-style">
      
      <SealND/>
      <p>
      This summer a very special and happy event is going to happen  
      </p>
      
      <div className="flex justify-center items-center gap-6 my-8">
      <div className="text-2xl md:text-4xl md:py-3 md:px-10 font-bold border-y-2 md:border-y-3 border-accent  "><h3>August</h3></div>
      <div className="text-3xl md:text-5xl font-bold font-(family-name:--font-cursive) "><h3>03</h3></div>
      <div className="text-2xl md:text-4xl md:py-3 font-bold border-y-2 md:px-10 md:border-y-3 border-accent"><h3>2025</h3></div>
      </div>
      
      <h3 className="text-3xl md:text-5xl md:p-10 font-bold ">Our Wedding</h3>

      {/* Timer */}
      <div className=" text-text dark:text-text-dark border-accent border-1  rounded-lg shadow-lg w-full max-w-sm p-6 ">
        <div className="mx-10 flex justify-between text-center font-mono text-lg">
          <div>
            <h3 className="text-4xl font-bold">{timeLeft.days}</h3>
            <p className="text-sm text-text">Days</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">{timeLeft.hours}</h3>
            <p className="text-sm text-text">Hours</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">{timeLeft.minutes}</h3>
            <p className="text-sm text-text">Minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
