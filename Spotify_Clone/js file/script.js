let currentsong = new Audio();
let songs;
let currfolder;

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('dragstart', function (e) {
    e.preventDefault();
});

function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currfolder = folder;
    let a = await fetch(`https://github.com/divyanshgoyal777/Spotify/tree/main/Spotify_Clone/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        const decodedSong = decodeURIComponent(song);
        songUL.innerHTML += `<li> <img class="invert" src="/Spotify_Clone/img/music.svg" alt="music">
                                <div class="info">
                                    <div>${decodedSong}</div>
                                    <div>Divyansh</div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img class="invert" src="/Spotify_Clone/img/play.svg" alt="play">
                                </div></li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML);
        });
    });

    return songs;
}

const playMusic = (track, pause = false) => {
    currentsong.src = `/Spotify_Clone/${currfolder}/` + track;
    if (!pause) {
        currentsong.play();
        play.src = "/Spotify_Clone/img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track.replace(".mp3", ""));
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function displayAlbums() {
    let a = await fetch(`https://github.com/divyanshgoyal777/Spotify/tree/main/Spotify_Clone/song/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer");
    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/song")) {
            let folder = e.href.split("/").slice(-2)[0];
            let a = await fetch(`https://github.com/divyanshgoyal777/Spotify/tree/main/Spotify_Clone/song/${folder}/info.json`);
            let response = await a.json();
            cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
                                                                    <div class="play">
                                                                        <svg width="24" height="24" viewBox="0 0 21 25" fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"> <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                                                                        </svg>
                                                                    </div>
                                                                    <img src="/Spotify_Clone/song/${folder}/cover.jpg" alt="">
                                                                    <h2 class= "card-h2">${response.title}</h2>
                                                                    <p class = "card-p">${response.description}</p>
                                                                </div>`;
        }
    }
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`song/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
}

currentsong.addEventListener("ended", () => {
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);

    if ((index + 1) < songs.length) {
        playMusic(songs[index + 1]);
    } else {
        playMusic(songs[0]);
    }
});

async function main() {
    await getSongs("song/ncs");

    playMusic(songs[0], true);

    displayAlbums();

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "/Spotify_Clone/img/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "/Spotify_Clone/img/play.svg"
        }
    })

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = (currentsong.duration) * (percent) / 100
    })

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
        document.querySelector(".right").classList.add("black");
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-129%"
        document.querySelector(".right").classList.remove("black");
    })

    previous.addEventListener("click", () => {
        currentsong.pause()
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    next.addEventListener("click", () => {
        currentsong.pause()
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })


    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100
        if (currentsong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })

    document.querySelector(".volume>img").addEventListener("click", e => {
        console.log(e.target)
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10
            currentsong.volume = .10;
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100
        if (currentsong.volume === 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("volume.svg", "mute.svg")
        }
    })
}

document.addEventListener('keydown', function (event) {

    const searchInput = document.getElementById('search');

    if (event.key === ' ' && document.activeElement !== searchInput) {
        event.preventDefault();
        if (currentsong.paused) {
            currentsong.play();
            play.src = "/Spotify_Clone/img/pause.svg";
        } else {
            currentsong.pause();
            play.src = "/Spotify_Clone/img/play.svg";
        }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        adjustVolume(event.key === 'ArrowUp' ? 0.05 : -0.05);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        adjustSeek(event.key === 'ArrowRight' ? 5 : -5);
    }
});

function adjustSeek(seconds) {
    currentsong.currentTime = Math.min(currentsong.duration, Math.max(0, currentsong.currentTime + seconds));
}

document.addEventListener("DOMContentLoaded", function () {
    currentsong.volume = 0.5;
});

function adjustVolume(change) {
    const newVolume = currentsong.volume + change;
    currentsong.volume = Math.min(1, Math.max(0, newVolume));
    const volumePercentage = currentsong.volume * 100;
    document.querySelector(".range").getElementsByTagName("input")[0].value = volumePercentage;
}


const CardTemplate = document.querySelector("[data-card-template]");
const cardContainer = document.querySelector(".cardContainer");

async function fetchAndDisplaySongs() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const array = await response.json();

        for (let index = 0; index < array.length; index++) {
            const e = array[index];

            if (e.href && e.href.includes("/song")) {
                let folder = e.href.split("/").slice(-2)[0];
                let songInfo = await fetch(`/Spotify_Clone/song/${folder}/info.json`);
                let response = await songInfo.json();

                const newCard = CardTemplate.content.cloneNode(true).children[0];
                newCard.dataset.folder = folder;

                newCard.querySelector('.play').innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                `;

                newCard.querySelector('img').src = `/Spotify_Clone/song/${folder}/cover.jpg`;
                newCard.querySelector('.card-h2').textContent = response.title;
                newCard.querySelector('.card-p').textContent = response.description;

                cardContainer.appendChild(newCard);
            }
        }
    } catch (error) {
        console.error("Error fetching and displaying songs:", error);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        Search_Song();
    }
}

function handleInput() {
    Search_Song();
}

function Search_Song() {
    let input = document.getElementById('search').value.toLowerCase();
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let cardText = card.textContent.toLowerCase();

        if (!cardText.includes(input)) {
            card.style.display = "none";
        } else {
            card.style.display = "block";
        }
    });
}

fetchAndDisplaySongs();

main()