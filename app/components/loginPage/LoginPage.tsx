'use client'

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Inputs from '../inputForm/InputForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { formSchema } from './formSchema';
import { supabase } from '@/supabase/supabaseClient';
import { useEffect } from 'react';
import Image from 'next/image';

type FormSchemaType = z.infer<typeof formSchema>

interface ILoginPageProps {
   tab: string,
   setTab: React.Dispatch<React.SetStateAction<string>>
}

const LoginPage: React.FC<ILoginPageProps> = ({ tab, setTab }) => {
   const router = useRouter();

   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema)
   });

   const onSubmit: SubmitHandler<FormSchemaType> = async (value) => {
      try {
         const { data } = await axios.post('/api/auth/login', { ...value });
         reset();
         toast.success(data.message);
         router.push('/home');
      } catch (err) {
         console.log('Error:', err);
         toast.error('Login failed');
      }
   };

   const handleGithubLogin = async () => {
      try {
         const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
               redirectTo: `${window.location.origin}/home`
            }
         });

         if (error) {
            toast.error('Github login failed');
            console.log('Error:', error);
         } else {
            toast.success('Connecting with Github...');
         }
      } catch (error) {
         console.log('Found some error:', error);
         toast.error('Something went wrong with Github login');
      }
   };

   useEffect(() => {
      const checkSession = async () => {
         const { data, error } = await supabase.auth.getSession();
         if (error) {
            console.error("Error fetching session:", error);
         } else if (data.session) {
            const token = data.session.access_token;
            localStorage.setItem('jwt_token', token);
            console.log("User JWT Token:", token);
            router.push('/home');
         }
      };

      checkSession();
   }, [router]);

   return (
      <div className='auth-page'>
         <div className='left-container'>
            <Image src='/images/test-pic.png' alt="Test picture" width={1500} height={1000} className='object-cover w-full h-[750px] rounded-lg'  />
         </div>
         <div className='right-container'>
            <div className='md:w-4/6 h-auto p-8 md:p-10 space-y-4'>
               <div className='flex flex-col space-y-6'>
                  <h1 className='text-3xl'>Login</h1>
                  <p className='text-white text-opacity-50'>
                     You can login with your registered account or quick login with your Github account.
                  </p>
                  <button onClick={handleGithubLogin} className='flex items-center justify-center space-x-2 bg-white text-black py-4 rounded-md hover:bg-zinc-200'>
                     <FaGithub size={24} />
                     <span>Login with Github</span>
                  </button>
                  <div className="flex items-center justify-center">
                     <div className="border-t-2 border-gray-600 w-full"></div>
                     <span className="px-2 text-white">or</span>
                     <div className="border-t-2 border-gray-600 w-full"></div>
                  </div>
               </div>
               <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
                  <Inputs
                     name='email'
                     label='Email'
                     type='text'
                     placeholder='yayan@durian.cc'
                     register={register('email')}
                     error={errors?.email?.message}
                     disable={isSubmitting} />
                  <Inputs
                     name='password'
                     label='Password'
                     type='password'
                     placeholder='P@ssw0rd'
                     register={register('password')}
                     error={errors?.password?.message}
                     disable={isSubmitting} />
                  <div className="flex items-center space-x-2">
                     <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                     />
                     <label htmlFor="terms" className="text-gray-300">
                        Remember me
                     </label>
                  </div>
                  <button className='button'>
                     {isSubmitting ? 'Logging in' : 'Login'}
                  </button>
               </form>
               <p className='flex justify-center'>
                  {tab === 'register' ? 'Have an account already?' : 'Don\'t have an account yet?'}
                  <span className='text-red-400 font-semibold hover:underline ml-2 cursor-pointer'
                     onClick={() => setTab(tab === 'login' ? 'register' : 'login')}>
                     {tab === 'register' ? 'Login' : 'Register'}
                  </span>
               </p>
            </div>
         </div>
         <ToastContainer position='bottom-left' />
      </div>
   );
}

export default LoginPage;
