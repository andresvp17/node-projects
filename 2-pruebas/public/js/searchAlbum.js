const input = document.getElementById('input')
const restText = document.getElementById('rest-text')
const selectInput = document.getElementById('select-input')
const errorWindow = document.getElementById('error-window')
let identifyAlbumName
export const getAlbum = (album) =>{
    if(identifyAlbumName === input.value) return
    let URL = `http://localhost:3000/api/album/${album}`
    fetch(URL)
    .then(res => res.json())
    .then(res =>{
       const fragment = document.createDocumentFragment()
       if(album){
        const dataContainer = document.createElement('div')
        dataContainer.classList.add('rest__text-item')
 
        const albumLink = document.createElement('a')
        albumLink.href = res.albumLink
        albumLink.target = '_blank'
        dataContainer.appendChild(albumLink)

        const albumImage = document.createElement('img')
        albumImage.src = res.albumCover
        albumImage.classList.add('rest__text-img')
        albumLink.appendChild(albumImage)

        const dataTextContainer = document.createElement('div')
        dataContainer.appendChild(dataTextContainer)
 
        const albumName = document.createElement('p')
        albumName.textContent = 'Name Of The Album: ' + res.albumName
        identifyAlbumName = res.albumName
        dataTextContainer.appendChild(albumName)
 
        const artist = document.createElement('p')
        artist.textContent = "Artist's Name: " + res.artist
        dataTextContainer.appendChild(artist)
 
        const releaseDate = document.createElement('p')
        releaseDate.textContent = 'Date Of Release: ' + res.releaseDate
        dataTextContainer.appendChild(releaseDate)
 
        const listOfSongs = document.createElement('ul')
        listOfSongs.classList.add('rest__text--ul')
        for(let i = 0; i < res.songs.length; i++){
            const song = document.createElement('li')
            song.textContent = `${i + 1}. ` + res.songs[i]
            listOfSongs.appendChild(song)
        }
        artist.addEventListener('click', e => searchArtist(e.target, res.artist))
        dataTextContainer.appendChild(listOfSongs)
        fragment.appendChild(dataContainer)
        restText.appendChild(fragment)
    } 
    if(restText.children.length > 1) restText.removeChild(restText.firstChild)
    })
    .catch(err => {
       console.log(err);
       showErrorWindow()
    })  
}

const searchArtist = (artist, responseName) =>{
    if(artist.textContent !== undefined){
        input.value = responseName
        selectInput.value = 'artist'
    }
    return
}

const showErrorWindow = () =>{
    if(errorWindow.classList.contains('disappear')){
        errorWindow.classList.remove('disappear')
        errorWindow.classList.add('show')
        setTimeout(() =>{
            errorWindow.classList.remove('show')
            errorWindow.classList.add('disappear')
        }, 3000)
    }
}