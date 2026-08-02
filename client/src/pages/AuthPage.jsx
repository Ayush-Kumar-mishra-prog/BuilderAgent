import React, { useState } from 'react'
import LoginLeft from '../components/LoginLeft'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon, Loader2Icon, TrafficCone } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const AuthPage = ({mode}) => {
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [showPassword,setShowPassword] = useState(false)
 const isLogin = mode ==="login"
 const {login,register} = useAppContext()
 const navigate = useNavigate()
 const handleSubmit =async (e)=>{
e.preventDefault()
setError("")
setLoading(true)
try {
  if(mode ==="login"){
    await login(email,password)
  }else{
    await register(name,email,password)
  }
  navigate("/")
} catch (error) {
  setError(error.message || (mode === "login"?"Invalid email or password":"Registration failed"))
}finally{
  setLoading(false)
}
 }
  return (
    <div className='min-h-screen bg-white flex text-zinc-900 font-sans'>
{/* Left pannel */}
<LoginLeft />
<div className="flex flex-1 items-center justify-center p-8">
  <div className="w-full max-w-sm">
    <div className="mb-10">
      <h1 className="text-3xl font-medium tracking-tight text-zinc-900 mb-1.5 font-sans">{isLogin ? "Sign In":"Create Account"}</h1>
      <p className="text-sm text-zinc-400">{isLogin ? "Enter your creditionals to access your website builder.":"Get Started by entering your registration details "}</p>
    </div>
    {error && (
      <p className="mb-6 p-3 border border-red-200 bg-red-50 text-red-700 text-xs"></p>
    )}
    <form onSubmit={handleSubmit} className='space-y-6'>
      {!isLogin && (
        <div className="">
          <label htmlFor="" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Full name</label>
          <input required type="text" className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-zinc-950 text-sm text-zinc-900 bg-transparent placeholder-zinc-300 transition-colors" placeholder='John Doe' value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
      )}

      <div className="">
          <label htmlFor="" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Email address</label>
          <input required type="email" className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-zinc-950 text-sm text-zinc-900 bg-transparent placeholder-zinc-300 transition-colors" placeholder='you@example.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div className="">
          <label htmlFor="" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
          <div className="relative">
             <input required type={showPassword ? "text":"password"} className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-zinc-950 text-sm text-zinc-900 bg-transparent placeholder-zinc-300 transition-colors" placeholder='********' value={password} onChange={(e)=>setPassword(e.target.value)} />
             <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 flex items-center justify-center cursor-pointer transition-colors" type="button" onClick={()=> setShowPassword(!showPassword)}>
             {
              showPassword? <EyeOffIcon size={14} />:<EyeIcon size={14} />
             }
             </button>
          </div>
         
        </div>
        <button className="w-full py-2.5  bg-linear-to-br from-purple-700 to-pink-200 text-white font-semibold hover:scale-102 disabled:opacity-40 flex items-center justify-center cursor-pointer mt-2 rounded-lg transition-all" type="submit" disabled={loading}> {loading && <Loader2Icon className='animate-spin h-3.5 w-3.5 mr-2' />}
        {isLogin ?"Sign In":"Sign Up"}
         </button>
    </form>
    <p className="text-sm text-zinc-400 mt-8 pt-6 border-t border-zinc-100 font-sans flex flex-row gap-2">
      {isLogin ? (
        <>
        <p className="">New to Buider{" "}</p>
        <Link className='text-zinc-900 font-medium hover:underline' to="/register">Create an account
        </Link>
        </>
      ):(
        <>
       <p className="">Already have an account{" "}</p>
        <Link className='text-zinc-900 font-medium hover:underline' to="/login">Sign in here
        </Link>
        </>
      )}
    </p>
  </div>
</div>
    </div>
  )
}

export default AuthPage