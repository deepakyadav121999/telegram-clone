import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi";
import { IoMdCall } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";;
import { Link } from 'react-router-dom';
import Chat from './Chat';
const ChatDetails = () => {
   const[apidata, setApiData] = useState([])
    let { userId } = useParams();
    console.log(userId)
    console.log("i am comming")

    let apiCall = async()=>{
     let data = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${userId}`)
     let response = await data.json()
     let finaldata = response.data
     
     setApiData(finaldata)
   
    }
    console.log(apidata)
    useEffect(()=>{
        apiCall()
    },[])

  return (
    <div className='text-white'>
        <div className="navbar flex justify-between items-center p-5  sticky top-0 bg-gray-900">
           <Link to={'/'}><div className='w-1/6'>
                <HiArrowLeft color='white' size={25}/>
            </div></Link> 

            <div className='flex gap-2 items-center w-3/6'>
                <div><img src="https://shorturl.at/3mdSP" alt=""  className='rounded-3xl h-11 w-11'/></div>

                <div className='flex flex-col justify-center'>
                    <p>{apidata.find(message => message.sender_id !== 1)?.sender?.name || 'Bhupendra Jogi'}</p>
                    <p className='text-gray-400'>last seen at 5:42 am</p>
                </div>
            </div>


            <div className='w-1/6 flex justify-end'>
                <IoMdCall color='white' size={25}/>
            </div>
            <div className='w-1/6 flex justify-end'>
                <SlOptionsVertical color='white' size={25}/>
            </div>
        </div>

        <div className="chat_display bg-gray-700 h-max flex flex-col justify-between p-5">
          
        <Chat messages={apidata}/>

      
        </div>

    </div>
  )
}

export default ChatDetails