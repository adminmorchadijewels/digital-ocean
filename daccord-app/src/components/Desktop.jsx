import React from 'react'
import SideMenu from './SideMenu'
import MainContent from './MainContent'
import Inspector from './Inspector'

export default function Desktop() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-8">
      <div
        className="relative rounded-[20px] overflow-hidden"
        style={{ width: '1280px', height: '844px', minWidth: '1280px' }}
      >
        {/* Three column layout */}
        <div className="flex h-full">
          <SideMenu />
          <MainContent />
          <Inspector />
        </div>
      </div>
    </div>
  )
}
