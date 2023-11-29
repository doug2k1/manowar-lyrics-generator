import './style.css'
import buildSong from './songBuilder'

const song = buildSong()
const titleContainer = document.querySelector('#songTitle')
const lyricsContainer = document.querySelector('#songLyrics')

if (titleContainer && lyricsContainer) {
  titleContainer.innerHTML = song.title
  lyricsContainer.innerHTML = song.lyrics
}

document.title = song.title + ' | Manowar Lyrics Generator'
window.history.replaceState({}, '', `/song/${song.slug}/`)

document.querySelector('#shareBtn')?.addEventListener('click', () => {
  navigator.share({
    url: window.location.href,
    text: song.title + ' | Manowar Lyrics Generator',
  })
})
