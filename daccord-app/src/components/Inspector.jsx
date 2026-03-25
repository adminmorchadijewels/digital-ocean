import React from 'react'
import {
  imgUserProfil, imgUserProfil1,
  imgPolygon1, imgPolygon2, imgPolygon3, imgPolygon4,
  imgPolygon5, imgPolygon6, imgPolygon7,
  imgPolygon114, imgPolygon113, imgPolygon112, imgPolygon111, imgPolygon110,
  imgPolygon19, imgPolygon20, imgPolygon21, imgPolygon22, imgPolygon15,
  imgPolygon23, imgPolygon24, imgPolygon25, imgPolygon26, imgPolygon27,
} from '../assets'

const looperPolygons = [
  { src: imgPolygon114, rotate: 38.01, width: 163.054, height: 147.775 },
  { src: imgPolygon113, rotate: 61.01, width: 163.085, height: 147.747 },
  { src: imgPolygon112, rotate: 84, width: 163.103, height: 147.731 },
  { src: imgPolygon111, rotate: 106.99, width: 163.097, height: 147.736 },
  { src: imgPolygon110, rotate: 129.99, width: 163.07, height: 147.76 },
  { src: imgPolygon19, rotate: 152.99, width: 163.039, height: 147.788 },
  { src: imgPolygon20, rotate: 176, width: 163.023, height: 147.803 },
  { src: imgPolygon21, rotate: -160.99, width: 163.031, height: 147.796 },
  { src: imgPolygon22, rotate: -137.99, width: 163.059, height: 147.77 },
  { src: imgPolygon15, rotate: -114.99, width: 163.089, height: 147.743 },
  { src: imgPolygon23, rotate: -92, width: 163.104, height: 147.73 },
  { src: imgPolygon24, rotate: -69.01, width: 163.094, height: 147.739 },
  { src: imgPolygon25, rotate: -46.01, width: 163.065, height: 147.765 },
  { src: imgPolygon26, rotate: -23.01, width: 163.035, height: 147.792 },
  { src: imgPolygon27, rotate: 0, width: 163.023, height: 147.803 },
]

function MemberItem({ avatarSrc, name, time }) {
  return (
    <div className="h-[60px] overflow-hidden relative rounded-[5px] w-[212px] flex items-center shrink-0">
      <div className="absolute inset-0 bg-white/30 mix-blend-overlay rounded-[5px]" />
      <div className="flex gap-2 items-center pl-2 relative z-10">
        <div className="relative w-11 h-11 shrink-0">
          <img alt="" className="block w-full h-full" src={avatarSrc} />
        </div>
        <div className="font-['Lato',sans-serif] text-white">
          <p className="text-[14px] font-medium mb-1">{name}</p>
          {time && <p className="text-[12px] text-white/25">{time}</p>}
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ avatarSrc, name, action, sub, time }) {
  return (
    <div className="overflow-hidden relative rounded-[5px] w-[212px] flex items-center py-2 shrink-0">
      <div className="absolute inset-0 bg-white/30 mix-blend-overlay rounded-[5px]" />
      <div className="flex gap-2 items-center pl-2 relative z-10">
        <div className="relative w-11 h-11 shrink-0">
          <img alt="" className="block w-full h-full" src={avatarSrc} />
        </div>
        <div className="font-['Lato',sans-serif]">
          <p className="text-[14px] mb-1">
            <span className="text-white font-medium">{name}</span>
            {' '}
            <span className="text-white/60">{action}</span>
          </p>
          {sub && <p className="text-[13px] text-white/60 mb-1">{sub}</p>}
          {time && <p className="text-[12px] text-white/30">{time}</p>}
        </div>
      </div>
    </div>
  )
}

export default function Inspector() {
  return (
    <div
      className="relative overflow-hidden h-full"
      style={{
        width: '244px',
        minWidth: '244px',
        backgroundColor: '#2c2f48',
        boxShadow: 'inset 1px 0px 0px 0px rgba(255,255,255,0.1)',
      }}
    >
      {/* Top Action Bar */}
      <div
        className="relative flex items-center overflow-hidden shrink-0"
        style={{ height: '44px', boxShadow: 'inset 0px -1px 0px 0px rgba(255,255,255,0.1)' }}
      >
        <div className="absolute flex items-center justify-between px-3 w-full">
          <span className="text-white/60 text-sm cursor-pointer hover:text-white">✉️</span>
          <span className="text-white/60 text-sm cursor-pointer hover:text-white">🔔</span>
          <span className="text-white/60 text-sm cursor-pointer hover:text-white">💬</span>
          <span className="text-white/60 text-sm cursor-pointer hover:text-white">⚙️</span>
        </div>
      </div>

      {/* User Profile with Looper */}
      <div className="relative" style={{ height: '280px' }}>
        {/* Looper rings */}
        <div className="absolute" style={{ left: '12px', top: '38px', width: '220px', height: '242px' }}>
          {looperPolygons.map((poly, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div style={{ transform: `rotate(${poly.rotate}deg)` }}>
                <img
                  alt=""
                  src={poly.src}
                  style={{ width: `${poly.width}px`, height: `${poly.height}px`, display: 'block' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* User avatar */}
        <div
          className="absolute overflow-hidden"
          style={{ left: '60px', top: '84px', width: '124px', height: '124px' }}
        >
          <img alt="" className="block w-full h-full" src={imgUserProfil} />
        </div>

        {/* User name */}
        <p
          className="absolute font-['Lato',sans-serif] font-bold text-[17px] text-white text-center whitespace-nowrap"
          style={{ bottom: '28px', left: '50%', transform: 'translateX(-50%)' }}
        >
          Sophie Fortune
        </p>
        <p
          className="absolute font-['Lato',sans-serif] text-[15px] text-white/25 text-center whitespace-nowrap"
          style={{ bottom: '8px', left: '50%', transform: 'translateX(-50%)' }}
        >
          @sophiefortune
        </p>
      </div>

      {/* Scrollable bottom section */}
      <div className="overflow-y-auto" style={{ height: 'calc(844px - 44px - 280px)' }}>
        {/* New Members */}
        <div className="flex flex-col gap-2 items-center px-4 pt-2">
          <div className="flex justify-between items-center w-[212px] py-2">
            <span className="font-['Lato',sans-serif] text-[15px] text-white/55">New Members</span>
            <span className="font-['Lato',sans-serif] text-[15px] text-white/25 cursor-pointer hover:text-white">See all</span>
          </div>

          <MemberItem avatarSrc={imgUserProfil1} name="Anne Couture" time="5 min ago" />
          <MemberItem avatarSrc={imgPolygon7} name="Miriam Soleil" time="20 min ago" />
          <MemberItem avatarSrc={imgPolygon6} name="Marie Laval" time="35 min ago" />
          <MemberItem avatarSrc={imgPolygon5} name="Mark Morain" time="40 min ago" />
        </div>

        {/* Recent Activity */}
        <div className="flex flex-col gap-2 items-center px-4 pt-4 pb-4">
          <div className="flex justify-between items-center w-[212px] py-2">
            <span className="font-['Lato',sans-serif] text-[15px] text-white/55">Recent Activity</span>
            <span className="font-['Lato',sans-serif] text-[15px] text-white/25 cursor-pointer hover:text-white">See all</span>
          </div>

          <ActivityItem avatarSrc={imgPolygon4} name="Hola Spine" action="invited you" sub="to a channel" time="2 min ago" />
          <ActivityItem avatarSrc={imgPolygon3} name="Eva Solain" action="invited you" sub="to a chat" time="20 min ago" />
          <ActivityItem avatarSrc={imgPolygon2} name="Pierre Ford" action="started" sub="following you" />
          <ActivityItem avatarSrc={imgPolygon1} name="Steve Ater" action="started" sub="following you" />
          <MemberItem avatarSrc={imgUserProfil1} name="Anne Couture" time="5 min ago" />
          <MemberItem avatarSrc={imgUserProfil1} name="Anne Couture" time="5 min ago" />
          <MemberItem avatarSrc={imgUserProfil1} name="Anne Couture" time="5 min ago" />
        </div>
      </div>
    </div>
  )
}
