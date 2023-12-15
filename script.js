const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music= document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'tarun-1',
        displayName: 'Mere Bina',
        artist: 'Tarun '
    },
    {
        name: 'tarun-2',
        displayName: 'Mere Humsafar',
        artist: 'Tarun '
    },
    {
        name: 'tarun-3',
        displayName: 'Dil Ko ',
        artist: 'Tarun '
    },
    {
        name: 'tarun-4',
        displayName: 'Hona Tha Pyaar',
        artist: 'Tarun '
    },
    {
        name: 'tarun-5',
        displayName: 'Saware',
        artist: 'Tarun '
    },
    {
        name: 'tarun-6',
        displayName: 'With You',
        artist: 'Tarun '
    },
    {
        name: 'tarun-7',
        displayName: 'Ishq Bulavaa',
        artist: 'Tarun '
    },
    {
        name: 'tarun-8',
        displayName: 'Tere Bin',
        artist: 'Tarun '
    },
    {
        name: 'tarun-9',
        displayName: 'Mera Mann',
        artist: 'Tarun '
    },
    {
        name: 'tarun-10',
        displayName: 'Faasle',
        artist: 'Tarun '
    },
    {
        name: 'tarun-11',
        displayName: 'Tum Mile',
        artist: 'Tarun '
    },
    {
        name: 'tarun-12',
        displayName: 'Irraday',
        artist: 'Tarun '
    },
    {
        name: 'tarun-13',
        displayName: 'Hona Tha Pyaar',
        artist: 'Tarun '
    },
    {
        name: 'tarun-14',
        displayName: 'Ijazat',
        artist: 'Tarun '
    },
    {
        name: 'tarun-15',
        displayName: 'Until I Found You',
        artist: 'Tarun '
    },
]

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist; //by using text content  we can ignore or not reflow something that is the exact same
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10 ) {
            durationSeconds =`0${durationSeconds}`;
        }
        
        
        //Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10 ) {
            currentSeconds =`0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    
    const clickX = e.offsetX;
    
    const { duration } = music;
    
   
    music.currentTime = (clickX / width) * duration;

}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

