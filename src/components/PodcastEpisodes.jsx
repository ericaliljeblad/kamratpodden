import { useState, useEffect } from 'react';
import '../styles/podcast.css';

import Label from '../components/Label.astro';
import Episode from '../components/Episode.astro';

const PodcastEpisodes = () => {
  const [episodes, setEpisodes] = useState(null)
  // const [isPlaying, setIsPlaying] = useState(false)

  // useEffect(() => {
  //   const audio = new Audio(audioUrl);
  //   setAudio(audio)
  // }, [audioUrl])

  // const togglePlay = () => {
  //   if (isPlaying) {
  //     audio.pause()
  //   } else {
  //     audio.play()
  //   }
  //   setIsPlaying(!isPlaying)
  // }

  // let episodes = {}
  // try {
  //   const response = await fetch(`${import.meta.env.SITE_URL}/.netlify/functions/spotify`)

  //   if (response.ok) {
  //     episodes = await response.json()
  //   }
  // } catch {
  //   console.log("ERROR")
  // }


  useEffect(() => {
    try {
      const response = getEpisodes();

      if (response.ok) {
        episodes = response.json()
        setEpisodes(episodes)
      }
    } catch {
      console.log("ERROR")
    }
  }, [])

  const getEpisodes = async () => {
    await fetch(`${import.meta.env.SITE_URL}/.netlify/functions/spotify`)
  }

  console.log("EPISODES: ", episodes)

  return (
    <section className="episodesSection" aria-label="Latest podcast episodes">
      <div className="wrapper">
        <Label negative>Senaste poddavsnitten</Label>
        <div className="episodes">
          {episodes?.[0].map(e => (
            <Episode episode={e} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PodcastEpisodes