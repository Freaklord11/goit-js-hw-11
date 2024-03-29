import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const player = new Player(iframe);

const timeFunction = (data) =>{
    let playerSeconds = data.seconds;
    localStorage.setItem('video-player-time', playerSeconds); 
};


player.on('timeupdate', throttle(timeFunction,1000));

player
.setCurrentTime(localStorage.getItem('video-player-time'))
.then(function(seconds) {
    // seconds = the actual time that the player seeked to
})
.catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});


