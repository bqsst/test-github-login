import * as React from 'react';
import { HiBookOpen } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';
import { RiBookmarkFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabaseClient';

interface INavbarProps {
   tab: string,
   setTab: (tab: string) => void
}

const Navbar: React.FC<INavbarProps> = (props) => {
   const { tab, setTab } = props;
   const router = useRouter()

   const handleLogout = async() => {
      const { error } = await supabase.auth.signOut();

      if(error) {
         console.log("Error: ", error);
      } else {
         localStorage.removeItem('jwt_token');

         router.push('/auth');
         console.log('Logout successfull');
      }
   }

   return (
      <div className='flex flex-col justify-between  text-xl w-full'>
         <div className='flex flex-col w-full space-y-8 px-10'>
            <nav
               onClick={() => setTab('dashboard')}
               className={`nav-bar ${tab === 'dashboard' ? 'bg-red-400' : 'navbar-hover'}`}>
               <MdSpaceDashboard size={40} />
               <span className='w-full text-start'>Dashboard</span>
            </nav>
            <nav
               onClick={() => setTab('collections')}
               className={`nav-bar ${tab === 'collections' ? 'bg-red-400' : 'navbar-hover'}`}>
               <HiBookOpen size={40} />
               <span className='w-full text-start'>My Collections</span>
            </nav>
            <nav
               onClick={() => setTab('favorites')}
               className={`nav-bar ${tab === 'favorites' ? 'bg-red-400' : 'navbar-hover'}`}>
               <RiBookmarkFill size={40} />
               <span className='w-full text-start'>Favorites</span>
            </nav>
            <nav
               onClick={() => setTab('setting')}
               className={`nav-bar ${tab === 'setting' ? 'bg-red-400' : 'navbar-hover'}`}>
               <IoMdSettings size={40} />
               <span className='w-full text-start'>Setting</span>
            </nav>
         </div>
         <div onClick={handleLogout} className='logout'>
            <IoLogOut size={37} />
            <span>Logout</span>
         </div>
      </div>
   )
}

export default Navbar;
