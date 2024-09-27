'use client'
import React from 'react'
import Home from './pages/Home'

const page = () => {
  return (
    <main style={{ background: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Home />
    </main>
  )
}

export default page