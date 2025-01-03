import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {FormatDate} from '../utils/formatDate'
import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import { WhatsappIcon, WhatsappShareButton} from 'react-share'

const Pastes = () => {
  const pastes = useSelector((state)=>state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  
  const filteredData = pastes.filter(
    (paste)=> paste.title.toLowerCase().includes(searchTerm.toLowerCase())
            || paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId){
    dispatch(removeFromPaste(pasteId));
  }

  const url = 'web.whatsapp.com'

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">

      <div className="flex flex-col gap-y-3">
        {/* search  */}
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
          className='focus:outline-none w-full bg-transparent'
          type="search" 
          placeholder='Search Here'
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          />
        </div>

        {/* All paste  */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>

          <div className='w-full px-4 pt-4 flex flex-col gap-y-5'>
            {
              filteredData.length > 0 ? (
              filteredData.map(
                (paste) =>{
                  return(
                    <div 
                      className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                    key={paste?._id}>

                      {/* heading and description */}
                      <div className="w-[50%] flex flex-col space-y-3">
                        <p className="text-4xl font-semibold ">{paste?.title}</p>
                        <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                          {paste?.content}
                        </p>
                      </div>

                      {/* icons and date */}
                      <div className="flex flex-col gap-y-4 sm:items-end">
                        
                        {/* icons  */}
                        <div className='flex gap-2 flex-wrap sm:flex-nowrap'>
                          
                          <button 
                            className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500">
                            <Link to={`/?pasteId=${paste?._id}`}>
                              <PencilLine
                                className="text-black group-hover:text-blue-500"
                                size={20}
                              />
                            </Link>
                          </button>

                          <button 
                            className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                            <Link to={`/pastes/${paste?._id}`}>
                              <Eye
                                className="text-black group-hover:text-orange-500"
                                size={20}
                              />
                            </Link>
                          </button>

                          <button 
                            className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                            onClick={()=>handleDelete(paste?._id)}>
                            <Trash2
                              className="text-black group-hover:text-pink-500"
                              size={20}
                            />
                          </button>

                          <button 
                            className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                            onClick={() => {
                            navigator.clipboard.writeText(paste?.content)
                            // navigator.clipboard.writeText(`${paste?.title}\n${paste?.content}`)
                            toast.success("Copied to clipboard", {position: "top-right" })
                          }}>
                            <Copy
                              className="text-black group-hover:text-green-500"
                              size={20}
                            />
                          </button>

                          <button 
                            className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                          >
                            <WhatsappShareButton
                            url={url}
                            title={`${paste?.title}: ${paste?.content}`}  
                            >
                              <WhatsappIcon size={25} round />
                            </WhatsappShareButton>
                          </button>
                        </div>
                          
                        {/* date  */}
                        <div className='gap-x-2 flex'>
                          <Calendar className="text-black" size={20} />
                          {FormatDate(paste?.createdAt)}
                        </div>
                        
                      </div>

                    </div>
                  )
                }
              )) : 
              (
                <div className="text-2xl text-center w-full text-chileanFire-500">
                  <p> No Data Found</p>
                </div>
              )
            }

          </div>
        </div>
        
      </div>

    </div>
  )
}

export default Pastes