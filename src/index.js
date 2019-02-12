import buildSong from "./songBuilder";

const song = buildSong();
document.querySelector("#songTitle").innerHTML = song.title;
document.querySelector("#songLyrics").innerHTML = song.lyrics;
