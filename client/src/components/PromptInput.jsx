import { ArrowRight, CloudUploadIcon, Loader2Icon, MicIcon, Plus, PlusSquare } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const PromptInput = ({onSubmit,loading= false,placeholder="Describe the website you want to build...",large= false,autoFocus= false,variant="default"}) => {
    const [value,setValue] = useState("")
    const textareaRef = useRef(null)
    useEffect(()=>{
        if(autoFocus && textareaRef.current){
            textareaRef.current.focus()
        }
    },[autoFocus])

    const handleSubmit = (e)=>{
        if(e)e.preventDefault()
            const trimmed = value.trim()
        if(!trimmed || loading){
            onSubmit(trimmed)
            setValue("")
        }
    }
    const handleKeyDown = (e)=>{
        if(e.key === "Enter" && !e.shiftKey ){
            e.preventDefault();
            handleSubmit()
        }
    }
    if(variant ==="glass"){
        return(
            <form onSubmit={handleSubmit} className="max-w-2xl w-full bg-white backdrop-blur-2xl rounded-xl ring-1 rign-white focus-within:ring-2 focus-within:ring-white overflow-hidden mt-6 trnasition">
                <textarea ref={textareaRef} value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} disabled={loading} rows={3} className='w-full p-4 outline-none bg-transparent text-base' />
                    <div className="flex items-center justify-between pb-3 px-3 gap-2">
                        <label htmlFor="file" className="border border-white p-1.5 rounded-md cursor-pointer flex items-center justify-center">
                            <input type="file" id="file" hidden className="" />
                            <Plus size={18} />
                        </label>
                        <div className="flex items-center justify-end gap-2">
                            <button type='button' className="flex items-center justify-center p-1 text-slate-300 cursor-pointer">
                                <MicIcon size={18} className='text-gray-400' />
                            </button>
                            <button
                            disabled={!value.trim() || loading}
                            type='submit' className="flex items-center justify-center p-1.5 text-white bg-purple-700 disabled:opacity-40 rounded-full cursor-pointer ">
                                {loading ? <Loader2Icon className='animate-spin' size={18} />:<ArrowRight size={18} />}
                            </button>

                        </div>
                    </div>
            </form>
        )
    }
  return (
    <div className={`bg-white border border-zinc-200 rounded-xl flex items-center gap-2 focus-within:ring-1 focus-within:ring-zinc-300 transition ${large ? "p-4":"p-3"}`}>
        <textarea ref={textareaRef} value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} disabled={loading} rows={large ? 5:1} className={`flex-1 bg-transparent border-none outline-none resize-none text-zinc-800 placeholder:text-zinc-400 ${large ? "text-base":"text-sm"} `} />
            <button  onClick={()=> handleSubmit} disabled={!value.trim() || loading} className="inline-flex items-center justify-center bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-40 cursor-pointer rounded-full shrink-0"
                style={{
                    width:large?36:24,
                    height:large?36:24
                }}>
                {loading ? <Loader2Icon className='animate-spin' size={large ?20:15} />:<ArrowRight size={large ?20:15} />}
            </button>
    </div>
  )
}

export default PromptInput