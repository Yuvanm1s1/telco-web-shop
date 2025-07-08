import { SignIn, SignUp } from '@clerk/clerk-react';
import React from 'react'
const Signup = () => {
  return (
    <div className="bg-transparent min-h-screen flex items-center p-50">
        <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
          
        }}
        src="/videos/background1.mp4"
        type="video/mp4"
      />
    <div className='p-6 backdrop-blur-md rounded-2xl'>
      <SignUp routing="path" path="/sign-up" />
    </div>
    </div>
  )
}

export default Signup
