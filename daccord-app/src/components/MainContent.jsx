import React from 'react'
import {
  imgBannerPhoto,
  imgGroupImg, imgShape, imgAvatar,
  imgPhoto3, imgUnion1, imgPolygon12,
  imgPhoto1634986, imgRectangle831, imgPolygon16, imgPolygon17,
  imgImg, imgRectangle380, imgPolygon10, imgPolygon11, img7,
  imgPhoto1651211, imgShape1, imgPolygon18,
  imgPhoto1, imgUnion, imgPolygon8,
  imgPhoto2, imgPolygon9,
} from '../assets'

function FeaturedCard1() {
  return (
    <div
      className="absolute overflow-hidden rounded-[20px] border border-[#01b7c5]"
      style={{
        left: '24px', top: '274px', width: '320px', height: '208px',
        backgroundColor: '#2c2f48',
        boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.5)',
      }}
    >
      <img alt="" className="absolute object-cover pointer-events-none"
        style={{ width: '362.4px', height: '453px', left: '-21px', top: '-123px' }}
        src={imgGroupImg} />
      <img alt="" className="absolute block"
        style={{ width: '320px', height: '150px', left: 0, top: '58px' }}
        src={imgShape} />
      <div className="absolute" style={{ left: '128px', top: '50px', width: '64px', height: '64px' }}>
        <img alt="" className="block w-full h-full" src={imgAvatar} />
      </div>
      <p className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[22px] text-white"
        style={{ left: '12px', top: '108px' }}>
        Virtual Reality
      </p>
      <p className="absolute font-['Lato',sans-serif] text-[13px] text-white/55"
        style={{ left: '12px', top: '142px', width: '296px', lineHeight: '1.4' }}>
        A community for VR and novices alike, regular and friendly chat.
      </p>
      <div className="absolute flex items-center justify-between text-[12px] text-white/25 whitespace-nowrap"
        style={{ left: '12px', top: '182px', width: '296px' }}>
        <div className="flex gap-1 items-center">
          <span>🟢</span>
          <span className="font-['Lato',sans-serif]">5,678 Online</span>
        </div>
        <div className="flex gap-1 items-center">
          <span>👥</span>
          <span className="font-['Lato',sans-serif]">345,678 Members</span>
        </div>
      </div>
    </div>
  )
}

function FeaturedCard2() {
  return (
    <div
      className="absolute overflow-hidden rounded-[20px] border border-[#01b7c5]"
      style={{
        left: '372px', top: '274px', width: '320px', height: '208px',
        backgroundColor: '#2c2f48',
        boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="absolute"
        style={{
          width: '335px', height: '348px', left: '-3px', top: '-62px',
          backgroundImage: `url('${imgPhoto3}')`,
          backgroundSize: '333px 222px',
          backgroundPosition: 'top left',
        }}
      />
      <img alt="" className="absolute block"
        style={{ width: '320px', height: '150px', left: 0, top: '58px' }}
        src={imgUnion1} />
      <div className="absolute" style={{ left: '128px', top: '50px', width: '64px', height: '64px' }}>
        <img alt="" className="block w-full h-full" src={imgPolygon12} />
      </div>
      <p className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[22px] text-white"
        style={{ left: '12px', top: '108px', width: '248px' }}>
        Game Play
      </p>
      <p className="absolute font-['Lato',sans-serif] text-[13px] text-white/55"
        style={{ left: '12px', top: '142px', width: '296px', lineHeight: '1.4' }}>
        Always a new challenge. Great place to make new friends.
      </p>
      <div className="absolute flex items-center justify-between text-[12px] text-white/25 whitespace-nowrap"
        style={{ left: '12px', top: '182px', width: '296px' }}>
        <div className="flex gap-1 items-center">
          <span>🟢</span>
          <span className="font-['Lato',sans-serif]">28,628 Online</span>
        </div>
        <div className="flex gap-1 items-center">
          <span>👥</span>
          <span className="font-['Lato',sans-serif]">527,955 Members</span>
        </div>
      </div>
    </div>
  )
}

function PopularCard1() {
  return (
    <div
      className="absolute overflow-hidden rounded-[20px] border border-[#01b7c5]"
      style={{
        left: '24px', top: '552px', width: '320px', height: '152px',
        backgroundColor: '#2c2f48',
        boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.5)',
      }}
    >
      <img alt="" className="absolute object-cover pointer-events-none"
        style={{ width: '168px', height: '224px', left: '-33px', top: '-28px' }}
        src={imgPhoto1634986} />
      <div
        className="absolute overflow-hidden rounded-[20px] border border-white/40"
        style={{
          left: '100px', top: 0, width: '220px', height: '152px',
          background: 'linear-gradient(133.87deg, rgb(91,127,214) 0.3%, rgb(27,177,208) 41%)',
        }}
      >
        <img alt="" className="absolute block"
          style={{ width: '225px', height: '152px', left: '-5.5px', top: '-0.5px', opacity: 0.3 }}
          src={imgRectangle831} />
        <p className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[22px] text-white"
          style={{ left: '47.5px', top: '19.5px' }}>
          3D Art
        </p>
        <p className="absolute font-['Lato',sans-serif] text-[13px] text-white/55 whitespace-nowrap"
          style={{ left: '47.5px', top: '53.5px' }}>
          A great place to discuss art.
        </p>
        <div className="absolute flex gap-1 items-center text-[12px] text-white/25 whitespace-nowrap"
          style={{ left: '47.5px', top: '125.5px' }}>
          <span>👥</span>
          <span className="font-['Lato',sans-serif]">345,678 Members</span>
        </div>
      </div>
      <div className="absolute" style={{ left: '68px', top: '44px', width: '64px', height: '64px' }}>
        <img alt="" className="block w-full h-full" src={imgPolygon16} />
      </div>
    </div>
  )
}

function PopularCard2() {
  return (
    <div
      className="absolute overflow-hidden rounded-[20px] border border-[#01b7c5]"
      style={{
        left: '372px', top: '552px', width: '320px', height: '152px',
        backgroundColor: '#2c2f48',
        boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.5)',
      }}
    >
      <div className="absolute overflow-hidden"
        style={{ left: 0, top: 0, width: '132px', height: '152px' }}>
        <img alt="" className="absolute inset-0 object-cover w-full h-full" src={imgImg} />
      </div>
      <div
        className="absolute overflow-hidden rounded-bl-[20px] rounded-tl-[20px] border border-white/40"
        style={{
          left: '101px', top: 0, width: '220px', height: '152px',
          background: 'linear-gradient(147.35deg, rgb(91,127,214) 13.9%, rgb(27,177,208) 48.1%)',
        }}
      >
        <img alt="" className="absolute block opacity-20"
          style={{ width: '225px', height: '152px', left: '-5.5px', top: '-0.5px' }}
          src={imgRectangle380} />
        <p className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[22px] text-white"
          style={{ left: '47.5px', top: '19.5px' }}>
          NFT
        </p>
        <p className="absolute font-['Lato',sans-serif] text-[13px] text-white/55"
          style={{ left: '47.5px', top: '53.5px', width: '152px', lineHeight: '1.4' }}>
          An NFT community so that everyone can share their NFTs.
        </p>
        <div className="absolute flex gap-1 items-center text-[12px] text-white/25 whitespace-nowrap"
          style={{ left: '47.5px', top: '125.5px' }}>
          <span>👥</span>
          <span className="font-['Lato',sans-serif]">887,789 Members</span>
        </div>
      </div>
      <div className="absolute" style={{ left: '68px', top: '44px', width: '64px', height: '64px' }}>
        <img alt="" className="block w-full h-full" src={imgPolygon10} />
      </div>
      <div className="absolute" style={{ left: '73px', top: '49px', width: '54px', height: '54px' }}>
        <img alt="" className="absolute inset-0 object-cover w-full h-full" src={img7} />
      </div>
    </div>
  )
}

function RecentCard({ left, title, description, members, bgPhoto, avatarImg, shapeImg }) {
  return (
    <div
      className="absolute overflow-hidden rounded-[20px] border border-[#01b7c5]"
      style={{
        left, top: '774px', width: '200px', height: '200px',
        backgroundColor: '#2c2f48',
        boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.5)',
      }}
    >
      <img alt="" className="absolute object-cover pointer-events-none"
        style={{ width: '252px', height: '142px', left: '-26px', top: '-51px' }}
        src={bgPhoto} />
      <img alt="" className="absolute block"
        style={{ width: '220px', height: '181px', left: '-10px', top: '30px' }}
        src={shapeImg} />
      <div className="absolute" style={{ left: '138px', top: '40px', width: '44px', height: '44px' }}>
        <img alt="" className="block w-full h-full" src={avatarImg} />
      </div>
      <p className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[22px] text-white whitespace-nowrap"
        style={{ left: '12px', top: '86px' }}>
        {title}
      </p>
      <p className="absolute font-['Lato',sans-serif] text-[13px] text-white/55"
        style={{ left: '12px', top: '120px', width: '176px', height: '48px', lineHeight: '1.4' }}>
        {description}
      </p>
      <div className="absolute flex gap-1 items-center text-[12px] text-white/25 whitespace-nowrap"
        style={{ left: '12px', top: '176px' }}>
        <span>👥</span>
        <span className="font-['Lato',sans-serif]">{members}</span>
      </div>
    </div>
  )
}

export default function MainContent() {
  return (
    <div className="relative flex-1 flex flex-col h-full" style={{ backgroundColor: '#1d203e' }}>
      {/* Search Bar */}
      <div
        className="relative overflow-hidden shrink-0 flex items-center"
        style={{ height: '44px', backgroundColor: '#2c2f48' }}
      >
        <div
          className="absolute border border-white/20 rounded-[4px]"
          style={{
            left: '137px', top: '10px', width: '442px', height: '24px',
            background: 'linear-gradient(180deg, rgba(46,51,90,0.3), rgba(28,27,51,0.3))',
          }}
        />
        <div className="absolute flex gap-1 items-center" style={{ left: '319px', top: '10px' }}>
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-white/60 text-sm">🔍</span>
          </div>
          <span className="font-['Lato',sans-serif] text-[13px] text-white text-center">Explore</span>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="relative flex-1 overflow-y-auto" style={{ backgroundColor: '#1d203e' }}>
        <div className="relative" style={{ minHeight: '1000px' }}>
          {/* Banner */}
          <div
            className="absolute overflow-hidden rounded-[20px]"
            style={{ left: '24px', top: '24px', width: '668px', height: '180px', backgroundColor: '#fff' }}
          >
            <img alt="" className="absolute object-cover pointer-events-none w-full h-full" src={imgBannerPhoto} />
            <div
              className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[24px] text-white text-center"
              style={{ left: '50%', top: '57px', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}
            >
              <p>Find Your Community</p>
              <p>on Daccord</p>
            </div>
          </div>

          {/* Featured Community heading */}
          <p className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[22px] text-white"
            style={{ left: '24px', top: '236px' }}>
            Featured Community
          </p>
          <p className="absolute font-['SF Compact Rounded',sans-serif] text-[15px] text-white/55 cursor-pointer hover:text-white"
            style={{ right: '24px', top: '244px' }}>
            See all
          </p>

          {/* Featured Cards */}
          <FeaturedCard1 />
          <FeaturedCard2 />

          {/* Popular Right Now heading */}
          <p className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[22px] text-white"
            style={{ left: '24px', top: '514px' }}>
            Popular Right Now
          </p>
          <p className="absolute font-['SF Compact Rounded',sans-serif] text-[15px] text-white/55 cursor-pointer hover:text-white"
            style={{ right: '24px', top: '522px' }}>
            See all
          </p>

          {/* Popular Cards */}
          <PopularCard1 />
          <PopularCard2 />

          {/* Recent Add heading */}
          <p className="absolute font-['SF Compact Rounded',sans-serif] font-semibold text-[22px] text-white"
            style={{ left: '24px', top: '736px' }}>
            Recent Add
          </p>
          <p className="absolute font-['SF Compact Rounded',sans-serif] text-[15px] text-white/55 cursor-pointer hover:text-white"
            style={{ right: '24px', top: '744px' }}>
            See all
          </p>

          {/* Recent Cards */}
          <RecentCard
            left="24px"
            title="Movie recapped"
            description="Discuss your favourite movies and TV serie here."
            members="3 Members"
            bgPhoto={imgPhoto1651211}
            avatarImg={imgPolygon18}
            shapeImg={imgShape1}
          />
          <RecentCard
            left="258px"
            title="Science"
            description="A community for a scientific exploration enthusiast."
            members="58 Members"
            bgPhoto={imgPhoto2}
            avatarImg={imgPolygon9}
            shapeImg={imgShape1}
          />
          <RecentCard
            left="492px"
            title="Space"
            description="A community for the space enthusiast."
            members="209 Members"
            bgPhoto={imgPhoto1}
            avatarImg={imgPolygon8}
            shapeImg={imgShape1}
          />
        </div>
      </div>
    </div>
  )
}
