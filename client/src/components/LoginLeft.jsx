import React from 'react'

const LoginLeft = () => {
  return (
    <div className='hidden lg:flex lg:w-2/5 bg-purple-700  flex-col justify-between p-12 shrink-0 select-none'>
        <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="logo" className="size-9.5" />
            <span className="text-4xl font-medium text-white">Builder AI</span>
        </div>
        <div className="">
            <h2 className="text-3xl text-white font-medium leading-snug mb-3 tracking-tight">Build your presence on web</h2>
            <p className="text-zinc-300">Describe what you need preview instantly and cusotomize your site in real-time.React with clean jsx verified layouts and instants code exports.</p>
            <p className="text-zinc-300 text-sm mt-12">Copyright {new Date().getFullYear()} Builder AI</p>
        </div>
    </div>
  )
}

export default LoginLeft