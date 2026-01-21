'use client'

import Image from "next/image"
import posthog from "posthog-js"

const ExploreBtn = () => {
  const handleExploreClick = () => {
    posthog.capture('explore_events_clicked')
  }

  return (
    <button type="button" id="explore-btn"  className="mt-7 mx-auto" onClick={handleExploreClick} >
        <a href="#events">Explore Events</a>
        <Image src="/icons/arrow-down.svg" alt="down arrow" width={24} height={24} className="inline-block ml-2 " />
    </button>
  )
}

export default ExploreBtn
