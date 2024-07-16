import React, { useEffect, useState } from 'react'
import { RiInboxArchiveFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
const MainContent = () => {
  const { theme } = useTheme();
  const[apidata,setApiData] = useState([])
  
    let apiCall = async()=>{
  let data =  await fetch("https://devapi.beyondchats.com/api/get_all_chats?page=1")
  let response = await data.json()
   let finaldata = response.data
   finaldata && setApiData(finaldata.data)


    }
  
    console.log(apidata)
    useEffect(()=>{
 apiCall()


    },[])

  return (
<div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} h-full  gap-2 mt-20`}>
        <div className={`flex   p-1 gap-2  md:p-5 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}`}>
           <div className='flex justify-center items-center bg-gray-600 p-1 rounded-3xl h-12 w-12'>
           <RiInboxArchiveFill  size={25} color='white'/>
           </div>
           
           <div className='flex flex-col justify-center'>
            <p className='font-semibold '>Archives Chats</p>
            <p className='text-gray-500'>Auto Accept Join Requests Pro</p>
           </div>
        </div>


          <div className="contents">
        { apidata && apidata.map((item,index)=>{
            return(
              <Link to={`/${item.id}`}>
                <div className={`flex  bg-gray-800  p-1 gap-2 w-full items-center md:p-5 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`} key={index}>
                <div className='flex justify-center items-center  '>
                 <img src="https://shorturl.at/3mdSP" alt=""  className='rounded-3xl h-12 w-12'/>
                   </div>
                   
                   <div className='flex flex-col justify-center w-full p-1'>
                       <div className='flex w-full justify-between'>
                      {item.creator.name ?<p className='font-semibold '>{item.creator.name}</p>:<p className='font-semibold '>Bhupendra Jogi</p>}
                       <p className='text-gray-400'>{new Date(item.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                    }</p>
                       </div>
                    
                    <div className='flex items-center justify-between w-full'>
                    <p className='text-gray-500'>Unread messages</p>
                     
                    <p className=' text-sm text-white  bg-gray-600   p-1 rounded-3xl text-center'>{item.
msg_count
}</p>
                    </div>
                    
                   </div>
                </div>
                </Link>
            )
        })
 

        }
        
      

       

       

          </div>
       
    </div>
  )
}

export default MainContent