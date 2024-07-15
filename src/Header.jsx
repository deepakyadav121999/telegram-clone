import React, { useEffect, useState } from 'react';
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { WiSolarEclipse } from "react-icons/wi";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { LuUserPlus } from "react-icons/lu";
import { MdOutlineCall } from "react-icons/md";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { LuBookmark } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { VscArrowSmallLeft } from "react-icons/vsc";
import './Header.css'; // Make sure to create and import this CSS file

const Header = () => {
    const [sidebar, setSidebar] = useState(false);
    const [animateSidebar, setAnimateSidebar] = useState(false);
    const [senderInfo, setSenderInfo] = useState({ name: '', phone: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://devapi.beyondchats.com/api/get_chat_messages?chat_id=3888');
                const result = await response.json();
                const sender = result.data.find((message) => message.sender_id === 1);
                if (sender) {
                    setSenderInfo({
                        name: sender.sender.name,
                        phone: sender.sender.phone,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const toggleSidebar = () => {
        if (sidebar) {
            setAnimateSidebar(false);
            setTimeout(() => setSidebar(false), 300); // Timeout to match animation duration
        } else {
            setSidebar(true);
            setTimeout(() => setAnimateSidebar(true), 0);
        }
    };

    return (
        <div className='sticky top-0'>
            <div className='flex justify-between p-3 bg-gray-900 text-white relative'>
                <div>
                    {sidebar ? (
                        <div className={`bg-gray-800 w-4/5 h-screen flex flex-col gap-1 absolute top-0 left-0 ${animateSidebar ? 'animate-slide-in' : 'animate-slide-out'}`}>
                            <div className='flex justify-end p-1 h-5 items-center' onClick={toggleSidebar}>
                                <VscArrowSmallLeft size={40} />
                            </div>
                            <div className='flex flex-col bg-gray-700 p-5'>
                                <div className='flex justify-between'>
                                    <img src="https://shorturl.at/3mdSP" alt="" className='rounded-3xl h-12 w-12' />
                                    <WiSolarEclipse size={40} />
                                </div>
                                <div>
                                    <div>
                                        <p>{senderInfo.name}</p>
                                        <p className='text-gray-400'>{senderInfo.phone ? senderInfo.phone : '+919340948981'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='sidebar p-2 flex flex-col gap-1'>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <FaRegUserCircle size={25} color='gray' />
                                    <p className='text-gray-300'>My Profile</p>
                                </div>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <HiOutlineUsers size={25} color='gray' />
                                    <p className='text-gray-300'>New Group</p>
                                </div>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <CiUser size={25} color='gray' />
                                    <p className='text-gray-300'>Contact</p>
                                </div>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <MdOutlineCall size={25} color='gray' />
                                    <p className='text-gray-300'>Calls</p>
                                </div>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <MdOutlineEmojiPeople size={25} color='gray' />
                                    <p className='text-gray-300'>People Nearby</p>
                                </div>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <LuBookmark size={25} color='gray' />
                                    <p className='text-gray-300'>Saved Messages</p>
                                </div>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <IoSettingsOutline size={25} color='gray' />
                                    <p className='text-gray-300'>Setting</p>
                                </div>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <LuUserPlus size={25} color='gray' />
                                    <p className='text-gray-300'>Invite Friends</p>
                                </div>
                                <div className='flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer'>
                                    <CiCircleQuestion size={25} color='gray' />
                                    <p className='text-gray-300'>Telegram Features</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div onClick={toggleSidebar}>
                            <HiOutlineBars3 size={25} />
                        </div>
                    )}
                </div>
                <div>
                    <IoMdSearch size={25} />
                </div>
            </div>
        </div>
    );
}

export default Header;
