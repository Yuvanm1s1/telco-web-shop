import { SignIn, SignUp } from '@clerk/clerk-react';
import React from 'react'
const Signin= () => {
  return (
    <div className="bg-transparent min-h-screen flex items-center justify-center">
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
        src="/videos/background2.mp4"
        type="video/mp4"
      />
    <div className='p-6 backdrop-blur-md rounded-2xl'>
      <SignIn routing="path" path="/sign-in" />
    </div>
    </div>
  )
}

export default Signin
