//filenames
const songFilename = './assets/title.txt';
const artistFilename = './assets/artist.txt';
const coverFilename = './assets/cover.png';

//frequency
const frequency = 1000;

//do it at frequency given
setInterval(() =>{
    getFileText(songFilename, artistFilename, coverFilename);
}, frequency);


// function that gets the content of the specified files
async function getFileText(songFilename, artistFilename, coverFilename){
    //dom element containing song infos
    const informationsContainer = document.querySelector('.song-informations'); //container
    const songTitleElement = informationsContainer.querySelector('.title'); //title
    const songArtistElement = informationsContainer.querySelector('.artist');//artist
    const coverImageElement = informationsContainer.querySelector('img');

    //boolean used to detect changes
    let hasChanged = false;

    //fetch name
    const songData = await (await fetch(songFilename)).text();
    if(songTitleElement.innerHTML != songData){
        songTitleElement.innerHTML = songData;
        hasChanged = true;
    }
    //fetch artist
    const artistData = await (await fetch(artistFilename)).text();
    if(songArtistElement.innerHTML != artistData){ //this is done twice because 2 songs can sometimes have same title but different artist
        songArtistElement.innerHTML = artistData;
        hasChanged = true;
    }
    //fetch cover, only if the title and artist have been fetched, in order to not change cover before song name
    if(hasChanged){
        coverImageElement.src = coverFilename + '?' + new Date().getTime();;
    }
}