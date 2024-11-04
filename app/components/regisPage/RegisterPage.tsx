'use client';

import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema } from './formSchema';
import { ToastContainer, toast } from 'react-toastify';
import Inputs from '../inputForm/InputForm';
import axios from 'axios';
import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import Image from 'next/image';

type FormSchemaType = z.infer<typeof formSchema>;

interface IRegisterPageProps {
   tab: string;
   setTab: (tab: string) => void;
}

const RegisterPage: React.FC<IRegisterPageProps> = ({ tab, setTab }) => {
   const [errMessage, setErrMessage] = useState('');
   const [passwordScore, setPasswordScore] = useState(0);
   const [passwordMessage, setPasswordMessage] = useState('');
   const [isChecked, setIsChecked] = useState(false);
   const [file, setFile] = useState<File | null>(null);

   const { register, handleSubmit, reset, watch, setError, clearErrors, formState: { errors, isSubmitting } } = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         fullname: '',
         email: '',
         password: '',
         confirmPassword: '',
         phone: ''
      }
   });

   const onSubmit: SubmitHandler<FormSchemaType> = async (value) => {
      console.log("Submitting form...", value);

      try {
         const formData = new FormData();
         Object.keys(value).forEach((key) => {
            formData.append(key, value[key as keyof FormSchemaType]);
         });

         if (file) {
            formData.append('attachment', file);
         } else {
            setErrMessage("File is required.");
            return;
         }

         const { data } = await axios.post('/api/auth/register', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });

         reset();
         setFile(null);
         toast.success(data.message)
         window.location.href = '/auth';
      } catch (err) {
         if (axios.isAxiosError(err)) {
            if (err.response && err.response.data) {
               setErrMessage(err.response.data.error);
            } else {
               setErrMessage('An unexpected error occurred');
            }
         } else {
            setErrMessage('An unexpected error occurred');
         }
         console.log(err);
      }
   };

   const validatePassword = () => {
      const password = watch().password;
      return zxcvbn(password ? password : '').score;
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files ? e.target.files[0] : null;

      if (selectedFile) {
         if (selectedFile.size > 5 * 1024 * 1024) {
            setError("attachment", {
               type: "custom",
               message: "File size should be less than 5MB."
            });
            return;
         }

         if (!["image/png", "image/jpeg"].includes(selectedFile.type)) {
            setError("attachment", {
               type: "custom",
               message: "Only PNG and JPEG files are allowed."
            });
            return;
         }

         clearErrors("attachment");
         setFile(selectedFile);
      } else {
         setError("attachment", {
            type: "custom",
            message: "File is required."
         });
      }
   };

   useEffect(() => {
      setPasswordScore(validatePassword());
      if (passwordScore <= 2) {
         setPasswordMessage('Very weak');
      } else if (passwordScore < 4) {
         setPasswordMessage('Weak');
      } else {
         setPasswordMessage('Strong');
      }
   }, [watch().password]);

   return (
      <div className='auth-page w-full'>
         <div className='left-container'>
            <Image src='/images/test-pic.png' alt="Test picture" width={1500} height={1000} className='object-cover w-full h-[750px] rounded-lg' />
         </div>
         <div className='right-container'>
            <div className='w-4/6 h-auto p-10 space-y-4'>
               <div className='flex flex-col space-y-1'>
                  <h1 className='text-3xl'>Register</h1>
                  <p className='text-white text-opacity-50'>Enter your user details below.</p>
               </div>
               <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
                  <Inputs
                     name='fullname'
                     label='Fullname'
                     type='text'
                     placeholder='Yayan Cool'
                     register={register('fullname')}
                     error={errors?.fullname?.message}
                     disable={isSubmitting} />
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
                  {watch().password?.length > 0 && (
                     <div className='flex flex-col space-y-2'>
                        <div className='flex mt-2'>
                           {Array.from(Array(passwordScore).keys()).map((index) => (
                              <span className='w-1/4 px-2' key={index}>
                                 <div className={`h-2 rounded-sm 
                                    ${passwordScore <= 2
                                       ? 'bg-red-500'
                                       : passwordScore < 4
                                          ? 'bg-yellow-500'
                                          : 'bg-green-500'
                                    }`}>
                                 </div>
                              </span>
                           ))}
                        </div>
                        <div className='flex justify-end px-2'>
                           {passwordMessage && (
                              <div className='w-full text-end'>
                                 {passwordMessage}
                              </div>
                           )}
                        </div>
                     </div>
                  )}
                  <Inputs
                     name='confirmPassword'
                     label='Confirm Password'
                     type='password'
                     placeholder='P@ssw0rd'
                     register={register('confirmPassword')}
                     error={errors?.confirmPassword?.message}
                     disable={isSubmitting} />
                  <Inputs
                     name='phone'
                     label='Phone Number'
                     type='text'
                     placeholder='098-xxxxxxx'
                     register={register('phone')}
                     error={errors?.phone?.message}
                     disable={isSubmitting} />
                  <div className='space-y-1'>
                     <label htmlFor="attachment" className=''>Picture</label>
                     <input
                        type='file'
                        onChange={handleFileChange}
                        disabled={isSubmitting}
                        className="file-input input-dark px-4 py-3 rounded-md focus:outline-none" />
                  </div>
                  <div className="flex items-center space-x-2">
                     <input
                        type='checkbox'
                        id='terms'
                        checked={isChecked}
                        onChange={() => setIsChecked((prev) => !prev)}
                        className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                     />
                     <label htmlFor="terms" className="text-gray-300">
                        Agree with terms and conditions
                     </label>
                  </div>
                  <button
                     className={`p-[14px] rounded-md font-semibold ${!isChecked ? 'bg-red-200 text-black' : 'button'}`}
                     type='submit'
                     disabled={!isChecked || isSubmitting}>
                     {isSubmitting ? 'Registering...' : 'Register'}
                  </button>
                  {errMessage && (
                     <div className='text-red-400 w-full text-end'>
                        {errMessage}
                     </div>
                  )}
               </form>
               <p className='flex justify-center h-[100px]'>
                  {tab === 'register' ? 'Have an account already?' : 'Dont have account yet?'}
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
};

export default RegisterPage;
