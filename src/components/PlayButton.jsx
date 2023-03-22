import { useState, useEffect } from 'react'
import '../styles/play.css';

const PlayIcon = () => (
  <svg width="13" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 .866A.5.5 0 0 1 .75.433l11.5 6.634a.5.5 0 0 1 0 .867L.75 14.567a.5.5 0 0 1-.75-.433V.866Z" fill="currentColor"/></svg>
)

const PauseIcon = () => (
  <svg width="10" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.875 13.321V.675A.425.425 0 0 0 3.446.25H.93C.689.25.5.44.5.675v12.646c0 .236.19.429.429.429h2.517c.24 0 .429-.19.429-.429ZM9.071.25H6.554a.428.428 0 0 0-.429.425v12.646c0 .236.19.429.429.429H9.07c.236 0 .429-.19.429-.429V.675A.425.425 0 0 0 9.071.25Z" fill="currentColor"/></svg>
)

const PlayButton = ({ audioUrl }) => {
  const [audio, setAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(audioUrl);
    setAudio(audio)
  }, [audioUrl])

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <button className="play-button" onClick={togglePlay}>
      <span className="icon">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </span>
      {isPlaying ? 'Pause' : 'Play'} preview
    </button>
  )
}

export default PlayButton