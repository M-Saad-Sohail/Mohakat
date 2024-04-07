import React from 'react'

const ModalInput = ({label,type,placeholder}:any) => {
  return (
    <>
    <div className=' flex flex-col gap-2'>
    <h3 className=' text-sm font-semibold text-[#000000]'>{label}</h3>
    <input className=' py-3 px-4 rounded-md bg-[#F8F8F8] w-full' type={type} placeholder={placeholder}  />
    </div>
    </>
  )
}

export default ModalInput