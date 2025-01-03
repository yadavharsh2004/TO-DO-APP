import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { useEffect } from "react";
import {Copy, PlusCircle} from 'lucide-react'
import {toast} from 'react-hot-toast'


const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes)

  useEffect(() => {
    if(pasteId){
      const paste = allPaste.find((p)=> p._id === pasteId)
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]) 
  

  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    console.log("hello");

    if(pasteId){
      //update
      dispatch(updateToPaste(paste));
    }
    else{
      //create
      dispatch(addToPaste(paste));
    }

    //after creation or updation
    setValue('');
    setTitle('');
    setSearchParams({});
  }

  const handleCopy = () =>{
    navigator.clipboard.writeText(value);
    toast.success('Copied to Clipboard')
  }

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    navigate("/");
  };

  return (
    <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0'>
      <div className="flex flex-col gap-y-5  items-center">

        <div className=" w-full flex flex-row gap-x-4 justify-between items-center ">
          <input
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2`}
            type="text"
            placeholder="Enter title "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className="text-white bg-violet-500 hover:bg-violet-700 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            onClick={createPaste}>
            {pasteId ? "Update my paste" : "Create My Paste"}
          </button>
          
          {pasteId &&  <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
            </button>
          }

        </div>

        <div
        className="w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
          <div 
            className='w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl'>

            {/* Circles and copy  */}
            <div 
              className='flex flex-row w-full rounded-t items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)] '>

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
          </div>

          <textarea 
            className=" w-full p-3 border-[rgba(128,121,121,0.3)] "
            value={value}
            placeholder="Enter content Here"
            onChange={(e)=>setValue(e.target.value)}
            style={{
              caretColor: "#000",
            }}
            rows={20}
          >
            
          </textarea>
        </div>
      </div>
    </div>
  );
};

export default Home;
