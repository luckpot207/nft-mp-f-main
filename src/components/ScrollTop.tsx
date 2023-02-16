import React, { useState } from 'react'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 100) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <button className="">
      <ArrowCircleUpIcon
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
      />
      sdfsdfsd
    </button>
  )
}

export default ScrollButton
