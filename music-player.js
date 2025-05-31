const cards = document.querySelectorAll('.music-card');
let currentPlaying = null;

cards.forEach(card => {
  const audio = card.querySelector('audio');
  const playBtn = card.querySelector('.play-button');
  const icon = playBtn.querySelector('i');
  const seekBar = card.querySelector('.seek-bar');
  const currentTime = card.querySelector('.current-time');
  const duration = card.querySelector('.duration');

  function formatTime(sec) {
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s < 10 ? '0' + s : s}`;
  }

  audio.addEventListener('loadedmetadata', () => {
    seekBar.max = Math.floor(audio.duration);
    duration.textContent = formatTime(audio.duration);
  });

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      if (currentPlaying && currentPlaying !== audio) {
        currentPlaying.pause();
        const prevIcon = currentPlaying.parentElement.querySelector('.play-button i');
        prevIcon.classList.remove('bx-pause');
        prevIcon.classList.add('bx-play');
      }
      audio.play();
      icon.classList.remove('bx-play');
      icon.classList.add('bx-pause');
      currentPlaying = audio;
    } else {
      audio.pause();
      icon.classList.remove('bx-pause');
      icon.classList.add('bx-play');
      currentPlaying = null;
    }
  });

  audio.addEventListener('timeupdate', () => {
    seekBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = formatTime(audio.currentTime);
  });

  seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
  });

  audio.addEventListener('ended', () => {
    icon.classList.remove('bx-pause');
    icon.classList.add('bx-play');
    currentPlaying = null;
    seekBar.value = 0;
  });
  
});


