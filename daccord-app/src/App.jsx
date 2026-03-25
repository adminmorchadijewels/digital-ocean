import React from 'react'
import Desktop from './components/Desktop'

export default function App() {
  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 35% 77%, #f7cbfd 0%, #b792e7 50%, #9775dc 75%, #7758d1 100%)',
      }}
    >
      <Desktop />
    </div>
  )
}
