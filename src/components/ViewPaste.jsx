import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import {Copy} from 'lucide-react'
import {toast} from 'react-hot-toast'

const ViewPaste = () => {
  const {id} = useParams();
  const allPaste = useSelector((state)=> state.paste.pastes);
  const paste = allPaste.filter((p)=>p._id === id)[0];
  const handleCopy = () =>{
    navigator.clipboard.writeText(paste.content);
    toast.success('Copied to Clipboard')
  }
  return (
    <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 '>
      <div className="flex flex-col gap-y-5 items-start">
        <input
          className="w-full text-black border border-input rounded-md p-3"
          type="text"
          disabled
          placeholder="enter title "
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div 
          className='w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl'>

          {/* Circles and copy  */}
          <div className='flex flex-row w-full rounded-t items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)] '>

            {/* Circles  */}
            <div className=' w-full flex gap-x-[6px] items-center select-none group'>
            
              <div className='w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]'/>

              <div className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}/>

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>

            {/* Copy  */}
            <div
              className='flex justify-center items-center 
              transition-all duration-300 ease-in-out group'
            >
              <button  onClick={handleCopy}>
                <Copy className='group-hover:text-success-500' size={20} />
              </button>
            </div>

          </div>

          <textarea 
            className=" w-full p-3 rounded-xl focus-visible:ring-0"
            value={paste.content}
            disabled
            placeholder="Enter content Here"
            style={{
              caretColor: "#000",
            }}
            onChange={(e)=>setValue(e.target.value)}
            rows={20}
          >
            
          </textarea>
        </div>
      
      </div>
    </div>
  )
}

export default ViewPaste