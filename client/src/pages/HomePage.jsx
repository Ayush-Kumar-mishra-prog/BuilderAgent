import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import PromptInput from '../components/PromptInput'
import { homeTags } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ClockIcon, TrashIcon } from 'lucide-react'
import moment from 'moment'

const HomePage = () => {
  const {user,projects,loadingProjects,generatingProject,loadProjects,handleGenerate,handleDelete,logout} = useAppContext()
  useEffect(()=>{loadProjects()},[loadProjects])
  const navigate = useNavigate()
  return (
    <div className='h-screen overflow-y-scroll text-purple-950 font-sans bg-linear-to-b from-white to-purple-900'>
      <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="logo" className="size-6" />
          <span className="text-xl  font-semibold tracking-tight">Builder-Ai</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-zinc-800">
          <span className="">{user.name}</span>
          <button onClick={logout} className="py-1.5 px-3 border border-purple-500 text-white hover:bg-purple-700 text-xs rounded-md cursor-pointer bg-purple-700">Sign Out</button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 mt-8 xl:mt-28">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <div className="flex items-center gap-2 p-1.5 pr-3 bg-white/10 backdrop-blur-md rounded-full border-white/20 text-[13px] text-zinc-950/90">
            <span className="px-3 py-1 text-[11px] bg-purple-500 rounded-full font-medium tracking-wider text-white">PROMO</span>
            <span className="">Create your first project for free</span>
          </div>
          <h1 className="text-center text-4xl md:text-6xl font-medium mt-4 max-w-2xl text-purple-900">Let's build your app together</h1>
          <p className="text-center mt-4 text-sm md:text-base max-w-xl text-white leading-relaxed">Describe your idea and watch AI design,structure and launch your website instantly.No coding required</p>
          <div className="w-full mt-6">
            <PromptInput 
            onSubmit={handleGenerate}
            loading={generatingProject}
            placeholder='Create a portfoliyo website'
            variant='glass'
            autoFocus
            />
          </div>
          <div className="masked-marquee w-full mt-4 max-w-2xl overfolw-hidden py-1">
            <div className="animate-marquee gap-3">
              {homeTags.map((tag,i)=>(
                <button key={i} onClick={()=> handleGenerate(tag)} disabled={generatingProject} className="px-4 py-1.5 border rounded-full text-sm text-white bg-white/10 hover:bg-white/20 transition cursor-pointer shrink-0 font-medium">{tag}</button>
              ))}
            </div>
          </div>

{/* ALL PROJECTS */}
{
  !loadingProjects && projects.length >0 &&(
    <div className="mt-12 w-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
      <p className="text-xs font-medium uppercase text-zinc-100 tracking-widest">All Projects</p>
      <span className="text-xs  text-zinc-100 font-normal">{projects.length}{" "}{projects.length === 1 ?"Project":"Projects"}</span>
      </div>

<div className="spce-y-2 max-h-[80vh] overflow-y-auto">
  {projects.map((p)=>(
    <div className="bg-white/5 mb-2 border border-white/10 rounded-lg px-4 py-3 flex items-center justify-between group hover:border-white/20 hover:bg-white/10 cursor-pointer backdrop-blur-md transition-all" onClick={()=> navigate(`/builder/${p._id}`)}>
      <div className="flex-1 min-w-0 ">
        <p className="text-sm font-medium text-white truncate">{p.name}</p>
        <div className="flex items-center gap-3 mt-0.5 ">
          <span className="text-xs text-zinc-300 flex items-center gap-1">
            <ClockIcon size={10} />
            { moment(p.updatedAt || p.createdAt).fromNow()}
          </span>
          <span className="text-xs text-white/60 font-medium">
            v{p.version}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
        onClick={(e)=>{
          e.stopPropagation();
          handleDelete(p._id)
        }
          
        }
        className="p-1.5 rounded-md text-zinc-200 hover:text-red-400 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <TrashIcon  size={14} />
        </button>
        <ArrowRight size={14} className='text-zinc-200 group-hover:text-white' />
      </div>

    </div>
  ))}
</div>

    </div>
  )
}

        </div>
      </div>
    </div>
  )
}

export default HomePage