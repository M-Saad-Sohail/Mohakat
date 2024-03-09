import AuthLayout from './../../UI/AuthLayout'
import React from 'react'
import {verification} from '../../../assests'
import Link from 'next/link'
const ValidationScreen = () => {
  return (
   <AuthLayout>
    <div className='mt-[250px] text-primary'>
        <img src={verification}/>
        <h1 className='text-[60px] my-2 font-bold'>Congratulations</h1>
        <p className='text-[20px] my-3'>You have successfully created your account. It will take <br/> about 24hrs for verification.</p>
        <div className='flex'>
        <Link
            href={'/become-sponsors'}
            className={`py-3 justify-center items-center flex duration-500 text-center md:flex hidden float-right mr-4 border bg-primary text-white px-4 rounded-lg font-bold my-4 min-w-[200px]`}
          >
            {" "}
           Continue
          </Link>
    
        </div>
 
       
     
    </div>
   </AuthLayout>
  )
}

export default ValidationScreen