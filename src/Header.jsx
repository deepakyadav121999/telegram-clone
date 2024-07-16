import React, { useEffect, useState } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import { IoMdSearch } from 'react-icons/io';
import { WiSolarEclipse, WiMoonAltWaxingCrescent4 } from 'react-icons/wi';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi2';
import { CiUser } from 'react-icons/ci';
import { LuUserPlus } from 'react-icons/lu';
import { MdOutlineCall } from 'react-icons/md';
import { MdOutlineEmojiPeople } from 'react-icons/md';
import { LuBookmark } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiCircleQuestion } from 'react-icons/ci';
import { VscArrowSmallLeft } from 'react-icons/vsc';
import './index.css';
import { useTheme } from './ThemeContext';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);
  const [senderInfo, setSenderInfo] = useState({ name: '', phone: '' });
  const { theme, toggleTheme } = useTheme();

  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (sidebar && e.touches[0].clientX - startX < -100) {
      toggleSidebar();
    }
  };

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
      setTimeout(() => setSidebar(false), 300);
    } else {
      setSidebar(true);
      setTimeout(() => setAnimateSidebar(true), 0);
    }
  };

  return (
    <div className={`fixed w-full h-20 top-0 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex justify-between p-3 relative">
        <div>
          {sidebar ? (
            <div
              className={`w-4/5 h-screen flex flex-col gap-1 absolute top-0 left-0 ${animateSidebar ? 'animate-slide-in' : 'animate-slide-out'} ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
              }`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <div className="justify-end p-1 h-5 items-center hidden xl:flex" onClick={toggleSidebar}>
                <VscArrowSmallLeft size={40} />
              </div>
              <div className="flex flex-col p-5">
                <div className="flex justify-between">
                  <img src="https://shorturl.at/3mdSP" alt="" className="rounded-3xl h-12 w-12" />
                  {theme === 'dark' ? (
                    <WiSolarEclipse size={40} onClick={toggleTheme} className="cursor-pointer" />
                  ) : (
                    <WiMoonAltWaxingCrescent4 size={40} onClick={toggleTheme} className="cursor-pointer" />
                  )}
                </div>
                <div>
                  <p>{senderInfo.name}</p>
                  <p className="text-gray-400">{senderInfo.phone ? senderInfo.phone : '+919340948981'}</p>
                </div>
              </div>
              <div className="sidebar p-2 flex flex-col gap-1">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <FaRegUserCircle size={25} />
                  <p>My Profile</p>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <HiOutlineUsers size={25} />
                  <p>New Group</p>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <CiUser size={25} />
                  <p>Contact</p>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <MdOutlineCall size={25} />
                  <p>Calls</p>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <MdOutlineEmojiPeople size={25} />
                  <p>People Nearby</p>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <LuBookmark size={25} />
                  <p>Saved Messages</p>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <IoSettingsOutline size={25} />
                  <p>Setting</p>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <LuUserPlus size={25} />
                  <p>Invite Friends</p>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-600 cursor-pointer">
                  <CiCircleQuestion size={25} />
                  <p>Telegram Features</p>
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
};

export default Header;
