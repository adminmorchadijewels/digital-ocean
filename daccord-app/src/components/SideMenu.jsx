import React from 'react'
import {
  imgBrowserButton,
  imgSubtract1, imgSubtract2, imgSubtract3, imgSubtractMask, imgPolygon13,
  imgSelectedEffets, imgBar, imgSelected, imgEllipse5, imgGroup1163,
  imgDrawKit5, imgDrawKit6, imgEllipse3, imgEllipse4, img4,
  imgLogoIconAdd, imgSymbol, imgExplore, imgPolygon14,
  imgProfile, imgFrame7,
} from '../assets'

function CategoryItem({ icon, label, active }) {
  return (
    <div
      className={`h-10 overflow-hidden relative rounded-[5px] w-[212px] flex items-center cursor-pointer ${active ? '' : 'hover:bg-white/10'}`}
    >
      {active && (
        <div className="absolute inset-0 bg-black/50 mix-blend-overlay rounded-[5px]" />
      )}
      <div className="flex gap-2 items-center pl-2 relative z-10">
        <span className="text-white/60 text-sm font-medium w-6 text-center">{icon}</span>
        <span className={`font-['Lato',sans-serif] text-[15px] tracking-[0.36px] ${active ? 'text-white font-bold' : 'text-white'}`}>
          {label}
        </span>
      </div>
    </div>
  )
}

export default function SideMenu() {
  return (
    <div className="relative flex h-full" style={{ width: '320px', minWidth: '320px' }}>
      {/* Side Bar */}
      <div
        className="relative flex flex-col items-center overflow-hidden sidebar-glassmorphism"
        style={{
          width: '76px',
          minWidth: '76px',
          backgroundColor: 'rgba(29,32,62,0.3)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Browser buttons */}
        <div className="absolute left-3 top-3 w-[52px] h-3">
          <img alt="" className="block w-full h-full" src={imgBrowserButton} />
        </div>

        {/* Logo */}
        <div className="absolute left-4 top-8 w-10 h-10 overflow-hidden">
          <div className="relative w-full h-full">
            <img alt="" className="absolute block w-full h-full" src={imgSubtract1}
              style={{ maskImage: `url('${imgSubtractMask}')`, maskSize: '34.641px 37.525px', maskPosition: '10.68px 3.76px', maskRepeat: 'no-repeat' }} />
            <img alt="" className="absolute block w-full h-full" src={imgSubtract3}
              style={{ maskImage: `url('${imgSubtractMask}')`, maskSize: '34.641px 37.525px', maskPosition: '4.629px 3.76px', maskRepeat: 'no-repeat' }} />
          </div>
        </div>

        {/* Bar background */}
        <div className="absolute left-2 top-0 w-[87px] h-full pointer-events-none">
          <img alt="" className="block w-full h-full" src={imgBar} />
        </div>

        {/* Selected indicator */}
        <div className="absolute left-[4.82px] top-[328.5px] w-[7.42px] h-[36.993px]">
          <img alt="" className="block w-full h-full" src={imgSelected} />
        </div>

        {/* Selected effect glow */}
        <div className="absolute left-0 top-[311px] w-[72px] h-[72px]">
          <img alt="" className="block w-full h-full" src={imgSelectedEffets} />
        </div>

        {/* Group Logo 1 - at 132px */}
        <div className="absolute left-5 top-[132px] w-10 h-10">
          <div className="relative w-full h-full">
            <img alt="" className="absolute block w-full h-full rounded-full" src={imgEllipse5} />
            <div className="absolute left-3 top-2 w-4 h-6">
              <img alt="" className="block w-full h-full" src={imgGroup1163} />
            </div>
          </div>
        </div>

        {/* Group Logo 2 - DrawKit at 196px */}
        <div className="absolute left-5 top-[196px] w-10 h-10 overflow-hidden rounded-full">
          <img alt="" className="block w-full h-full object-cover" src={imgDrawKit6} />
        </div>

        {/* Group Logo 3 - Ellipse at 260px */}
        <div className="absolute left-5 top-[260px] w-10 h-10 overflow-hidden rounded-full">
          <img alt="" className="block w-full h-full object-cover" src={imgEllipse4} />
        </div>

        {/* Explore icon (selected) at 324px */}
        <div className="absolute left-5 top-[324px] w-10 h-10">
          <img alt="" className="block w-full h-full" src={imgExplore} />
        </div>

        {/* Add icon at 388px */}
        <div className="absolute left-5 top-[388px] w-10 h-10 relative">
          <img alt="" className="absolute block w-full h-full" src={imgLogoIconAdd} />
          <div className="absolute inset-0 flex items-center justify-center">
            <img alt="" className="w-[18px] h-[18px]" src={imgSymbol} />
          </div>
        </div>
      </div>

      {/* Categories panel */}
      <div
        className="relative flex flex-col overflow-hidden h-full"
        style={{ width: '244px', backgroundColor: 'rgba(44,47,72,0.5)' }}
      >
        {/* Header */}
        <div
          className="relative flex items-center overflow-hidden shrink-0"
          style={{ height: '44px', boxShadow: 'inset 0px -1px 0px 0px rgba(255,255,255,0.1)' }}
        >
          <span className="absolute left-4 font-['Lato',sans-serif] font-bold text-[17px] text-white">
            Explore
          </span>
        </div>

        {/* Category List */}
        <div className="flex flex-col gap-2 px-4 pt-4">
          <CategoryItem icon="⊕" label="Home" active={true} />
          <CategoryItem icon="♪" label="Music" />
          <CategoryItem icon="🎮" label="Gaming" />
          <CategoryItem icon="🎓" label="Education" />
          <CategoryItem icon="🌐" label="Science & Tech" />
          <CategoryItem icon="🎬" label="Entertainment" />
          <CategoryItem icon="📚" label="Student Hubs" />
        </div>

        {/* Audio Visualizer area */}
        <div className="absolute bottom-[72px] left-0 right-0 h-[84px]">
          <img alt="" className="block w-full h-full" src={imgFrame7} />
        </div>

        {/* User Footer */}
        <div
          className="absolute bottom-0 left-0 w-full h-[72px] flex items-center overflow-hidden"
          style={{
            backgroundColor: '#1d203e',
            boxShadow: 'inset -1px 0px 0px 0px rgba(255,255,255,0.1)',
          }}
        >
          {/* User info */}
          <div className="flex gap-1 items-center ml-3">
            <div className="relative w-8 h-8 shrink-0">
              <img alt="" className="block w-full h-full object-cover" src={imgProfile} />
            </div>
            <span className="font-['SF Compact Display',sans-serif] text-[13px] text-white whitespace-nowrap">
              sophiefortune
            </span>
          </div>
          {/* Action Icons */}
          <div className="flex items-center justify-between absolute right-4" style={{ width: '139px' }}>
            <div className="w-8 h-8 flex items-center justify-center">
              <img alt="" className="w-[22px] h-[22px]" src={imgPolygon14} />
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-white/60 text-sm">🎧</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-white/60 text-sm">👤</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
