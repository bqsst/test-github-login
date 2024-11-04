'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Product from '../../product/productReUse';
import 'react-circular-progressbar/dist/styles.css';
import HeadBar from '../headbar/HeadBar';
import Image from 'next/image';

const Dashboard = () => {
   const [progress, setProgress] = useState(0)

   useEffect(() => {
      const interval: number = window.setInterval(() => {
         setProgress((prev) => {
            if (prev >= 39) {
               clearInterval(interval);
               return 39;
            }
            return prev + 1;
         });
      }, 20);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className='content-parent'>
         <HeadBar placeholder='Search book...' />
         <div className='flex'>
            <div className='relative w-2/3 h-auto'>
               <Image src="/images/batman-pic.png" alt="Batman picture" width={1000} height={40} className='size-full rounded-xl'/>
               <div className='rec-text'>
                  <div>
                     <p className='text-3xl'>Frank Miller</p>
                     <h4 className='text-5xl font-semibold mt-2'>Batman: <br /> The Dark Night</h4>
                  </div>
                  <div className='flex justify-end items-end'>
                     <button className='more-detail'>
                        <span className='text-white text-2xl'>More details</span>
                     </button>
                  </div>
               </div>
            </div>
            <div className='continue-book'>
               <h4 className='head-text'>Continue Reading</h4>
               <div className='w-full h-auto px-10 pt-4'>
                  <div className='flex flex-col space-y-4'>
                     <Image src='/images/con-read-pic.png' alt='Continue reagind' width={350} height={100} className='continue-read-image' />
                     <p className='text-2xl text-center'>Kobra Kai: Ultimate</p>
                  </div>
                  <div className='laoding-progress'>
                     <CircularProgressbar
                        value={progress}
                        text={`${progress}%`}
                        strokeWidth={18}
                        styles={buildStyles({
                           rotation: 0.5,
                           textColor: '#f87171',
                           textSize: '22px',
                           pathColor: '#f87171',
                           trailColor: "#E0E0E0",
                        })}
                        className='font-semibold'
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className='w-full h-auto space-y-8'>
            <h1 className='head-text'>Top Rated Comics</h1>
            <div className='grid grid-cols-4'>
               <Product
                  image='/images/flash-book-pic.png'
                  title='The flash, Vol. 1'
                  author='Joshua Williamson' />
               <Product
                  image='/images/titan-book-pic.png'
                  title='Titans, Vol. 2'
                  author='Andrew Robinson' />
               <Product
                  image='/images/harley-book-pic.png'
                  title='Harley Quinn, Vol 1'
                  author='Jimmy Palmiotti' />
               <Product
                  image='/images/suicide-book-pic.png'
                  title='Suicide Squad #8'
                  author='Tom Taylor' />
            </div>
         </div>
      </div>
   );
};

export default Dashboard;