'use client';

import { supabase } from '@/supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Home from '../components/home/Home';
import Loading from '../components/loading/Loading';

const HomePage = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const checkSession = async () => {
         const { data } = await supabase.auth.getSession();
         if (!data.session) {
            router.push('/auth');
         } else {
            setLoading(false);
         }
      };

      checkSession();
   }, [router]);

   if (loading) return <Loading/>;

   return (
      <div>
         <Home />
      </div>
   );
}
export default HomePage;