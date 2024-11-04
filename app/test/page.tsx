'use client'

import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart } from '@mui/x-charts/LineChart';

const ProgressCircle = () => {
   const [progress, setProgress] = useState(0);
   const [number, setNumber] = useState(0)

   useEffect(() => {
      const interval = setInterval(() => {
         setProgress((prevProgress) => {
            if (prevProgress >= 50) {
               clearInterval(interval);
               return 50;
            }
            return prevProgress + 1;
         });
         setNumber((prev) => prev + 1)
      }, 20);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className="flex flex-col space-y-10 items-center justify-center h-screen">
         {number && (
            <div className='flex items-center justify-center'>
               Loading progress: {number - 1}%
            </div>
         )}
         <div className="w-40 h-40">
            <CircularProgressbar
               value={progress}
               text={`${progress}%`}
               styles={buildStyles({
                  rotation: 0.5,
                  textColor: "#4A90E2",
                  pathColor: "#4A90E2",
                  trailColor: "#E0E0E0",
               })}
            />
         </div>
         <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
               {data: [2, 5.5, 2, 8.5, 1.5, 5],},
            ]}
            width={500}
            height={300}
         />
      </div>
   );
};

export default ProgressCircle;
