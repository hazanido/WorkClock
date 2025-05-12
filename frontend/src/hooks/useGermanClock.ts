import { useEffect, useState } from 'react';
import { getTimeGermany } from '../services/apiTimeGermany';



export const useGermanClock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    let start: number;
    let intervalId: any;

    const initClock = async () => {
      try {
        const data = await getTimeGermany();
        const initialTime = new Date(data.dateTime);
        start = Date.now();
        setTime(initialTime);

        intervalId = setInterval(() => {
          const now = Date.now();
          const diff = now - start;
          setTime(new Date(initialTime.getTime() + diff));
        }, 1000);
      } catch (err) {
        console.error("Failed to fetch time:", err);
      }
    };

    initClock();
    return () => clearInterval(intervalId);
  }, []);

  return time;
};
