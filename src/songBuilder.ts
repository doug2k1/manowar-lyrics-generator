import terms from './terms'
import { compact, capitalize, kebabCase, startCase } from 'lodash-es'
import seedrandom from 'seedrandom'

const url = new URL(window.location.href)
const pathname = url.pathname.split('/').filter(Boolean)
const isPermalink = pathname[0] === 'song'
let slug = isPermalink ? pathname[1] : ''
let title = slug ? capitalize(slug.split('-').join(' ')) : ''
let random = slug ? seedrandom(slug) : Math.random
let shuffle = (arr: string[]) => arr[Math.floor(random() * arr.length)]

const buildVerse = (short = false) => {
  let verses = []

  if (random() < 0.25) {
    verses.push(shuffle(terms.subjects))
  }

  verses.push(shuffle(terms.verbs))
  verses.push(shuffle(terms.pronouns))

  if (random() < 0.33) {
    verses.push(shuffle(terms.adjectives))
  }

  verses.push(shuffle(terms.nouns))

  if (random() < 0.33) {
    verses.push(shuffle(terms.connectors))

    if (random() < 0.25) {
      verses.push(shuffle(terms.adjectives))
    }

    verses.push(shuffle(terms.nouns))
  }

  if (random() < 0.2 && !short) {
    verses.push(shuffle(terms.connectors))

    if (random() < 0.25) {
      verses.push(shuffle(terms.adjectives))
    }

    verses.push(shuffle(terms.nouns))
  }

  verses = compact(verses)

  return capitalize(verses.join(' '))
}

if (!title) {
  title = buildVerse(true)
  slug = kebabCase(title)
  random = seedrandom(slug)
  shuffle = (arr: string[]) => arr[Math.floor(random() * arr.length)]
}

const buildSong = () => {
  const lyrics = []

  for (let i = 0; i < 6; i++) {
    lyrics.push(buildVerse())
  }

  lyrics.push('')
  lyrics.push(title)
  lyrics.push(buildVerse())
  lyrics.push(title)
  lyrics.push(buildVerse())
  lyrics.push('')

  for (let i = 0; i < 4; i++) {
    lyrics.push(buildVerse())
  }

  lyrics.push('')

  for (let i = 0; i < 4; i++) {
    lyrics.push(title)
  }

  return {
    title: startCase(title),
    lyrics: lyrics.join('<br>'),
    slug,
  }
}

export default buildSong
