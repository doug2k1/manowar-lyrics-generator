import terms from "./terms";
import { random, shuffle, compact, capitalize } from "lodash-es";

const buildVerse = short => {
  let verse = [];

  if (random(3) === 0) {
    verse.push(shuffle(terms.subjects)[0]);
  }

  verse.push(shuffle(terms.verbs)[0]);
  verse.push(shuffle(terms.adverbs)[0]);

  if (random(2) === 0) {
    verse.push(shuffle(terms.adjectives)[0]);
  }

  verse.push(shuffle(terms.nouns)[0]);

  if (random(2) === 0) {
    verse.push(shuffle(terms.connectors)[0]);

    if (random(3) === 3) {
      verse.push(shuffle(terms.adjectives)[0]);
    }

    verse.push(shuffle(terms.nouns)[0]);
  }

  if (random(4) === 0 && !short) {
    verse.push(shuffle(terms.connectors)[0]);

    if (random(3) === 3) {
      verse.push(shuffle(terms.adjectives)[0]);
    }

    verse.push(shuffle(terms.nouns)[0]);
  }

  verse = compact(verse);
  verse = capitalize(verse.join(" "));

  return verse;
};

const buildSong = () => {
  const title = buildVerse(true);
  const lyrics = [];

  for (let i = 0; i < 6; i++) {
    lyrics.push(buildVerse());
  }

  lyrics.push("");
  lyrics.push(title);
  lyrics.push(buildVerse());
  lyrics.push(title);
  lyrics.push(buildVerse());
  lyrics.push("");

  for (let i = 0; i < 4; i++) {
    lyrics.push(buildVerse());
  }

  lyrics.push("");

  for (let i = 0; i < 4; i++) {
    lyrics.push(title);
  }

  return {
    title: title,
    lyrics: lyrics.join("<br>")
  };
};

export default buildSong;
