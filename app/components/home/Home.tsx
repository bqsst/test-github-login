'use client'

import { useState } from 'react';
import Navbar from './Navbar';
import Dashboard from './dashboard/Dashboard';
import Collections from './collection/Collections';
import Favorties from './favorite/Favorites';
import Setting from './setting/Setting';

const Home = () => {
   const [tab, setTab] = useState('dashboard')

   return (
      <div className='flex justify-between h-screen'>
         <div className='navbar-container'>
            <div className='logo-app'>
               <h1 className='text-4xl font-semibold'>
                  <span className='text-red-400'>Book</span>
                  out
                  <span className='text-red-400'>.</span>
               </h1>
            </div>
            <div className='flex justify-center h-[80%]'>
               <Navbar tab={tab} setTab={setTab} />
            </div>
         </div>
         <div className='w-[75%] h-screen overflow-y-scroll'>
            {tab === 'dashboard' && (
               <Dashboard />
            )}
            {tab === 'collections' && (
               <Collections />
            )}
            {tab === 'favorites' && (
               <Favorties />
            )}
            {tab === 'setting' && (
               <Setting />
            )}
         </div>
      </div>
   );
};

export default Home;
