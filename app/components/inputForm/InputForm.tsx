import * as React from 'react';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputsProps {
   name: string,
   label: string,
   type: string,
   placeholder: string,
   register: UseFormRegisterReturn,
   error?: string,
   disable: boolean
}

const Inputs: React.FC<IInputsProps> = (props) => {
   const { name, label, type, placeholder, register, error } = props;
   const [showPassword, setShowPassword] = useState(false)

   return (
      <div className='flex flex-col space-y-1'>
         <label htmlFor='name'>{label}</label>
         <div className='relative'>
            {type === 'file' ? (
               <input
                  className='file-input input-dark'
                  type="file"
                  {...register}
               />
            ) : (
               <input
                  className='input-dark w-full py-3 px-4 rounded-md focus:outline-none'
                  type={showPassword ? 'text' : type}
                  placeholder={placeholder}
                  {...register}
               />
            )}
            {(name === 'password' || name === 'confirmPassword') && (
               <div className='absolute inset-y-0 right-4 flex items-center justify-center h-full'>
                  <div className='flex items-center justify-center cursor-pointer'
                     onClick={() => setShowPassword((prev) => !prev)}>
                     {showPassword ? <VscEye size={24} /> : <VscEyeClosed size={24}/>}
                  </div>
               </div>
            )}
            {error && <p className='text-red-400 absolute'>{error}</p>}
         </div>
      </div>
   );
};

export default Inputs;
