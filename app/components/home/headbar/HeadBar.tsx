import * as React from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdNotifications } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { IoPersonCircleSharp } from "react-icons/io5";
import Image from 'next/image';

interface IHeadBarProps {
   placeholder: string
}

const HeadBar: React.FC<IHeadBarProps> = ({ placeholder }) => {
   const [profileImage, setProfileImage] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const userProfile = async () => {
         const { data, error } = await supabase.auth.getUser();

         if (error) {
            console.log("Error:", error);
            setLoading(false);
         } else if (data.user) {
            setProfileImage(data.user.user_metadata.avatar_url);
            setLoading(false);
         }
      };

      userProfile();
   }, []);

   return (
      <div className='flex'>
         <div className='search-container'>
            <FiSearch size={28} />
            <input
               type='text'
               placeholder={placeholder}
               className='search-dash' />
         </div>
         <div className='right-menu'>
            <div>
               <IoMdNotifications size={32} className='hover:text-red-400 cursor-pointer' />
            </div>
            <div className='profile-container'>
               {loading ? (
                  <IoPersonCircleSharp size={32} className='profile-icon animate-spin' />
               ) : (
                  <Image src={profileImage || '/images/default-profile.png'} alt="Profile" 
                  width={100} height={100} className='profile-image' />
               )}
            </div>
         </div>
      </div>
   );
};

export default HeadBar;
