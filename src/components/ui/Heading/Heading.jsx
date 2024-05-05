import React from 'react'
import section_pic from '@/assests/icons/sectionimg.png';
import Image from 'next/image';


const Heading = (props) => {
    return (
        <>
            <div className="main_heading_container text-center mb-4 flex flex-col justify-center items-center">
                <h1 className={`${props.className}`}> {props.heading} </h1>
                <Image src={section_pic} alt="Heading" className ="text-center"/>
            </div>
        </>
    )
}

export default Heading