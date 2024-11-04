'use client'

import React, { useState, Suspense, lazy } from 'react';
import Loading from '../components/loading/Loading';

const RegisterPage = lazy(() => import('../components/regisPage/RegisterPage'));
const LoginPage = lazy(() => import('../components/loginPage/LoginPage'));

const AuthPage = () => {
   const [tab, setTab] = useState('login');

   return (
      <Suspense fallback={<Loading />}>
         <div className='flex flex-col h-screen space-y-4'>
            {tab === 'register'
               ? <RegisterPage tab={tab} setTab={setTab} />
               : <LoginPage tab={tab} setTab={setTab} />}
         </div>
      </Suspense>
   );
}

export default AuthPage;
