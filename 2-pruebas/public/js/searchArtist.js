const restText = document.getElementById('rest-text')
const selectInput = document.getElementById('select-input')
const errorWindow = document.getElementById('error-window')
let identifyArtistName
export const getArtist = (name) =>{
    if(identifyArtistName === input.value) return
    let URL = `http://localhost:3000/api/artist/${name}`
    fetch(URL)
    .then(res => res.json())
    .then(res =>{
       const fragment = document.createDocumentFragment()
       if(name){
        identifyArtistName = name
        const dataContainer = document.createElement('div')
        dataContainer.classList.add('rest__text-item')
 
        const artistLink = document.createElement('a')
        artistLink.href = res.artistBio
        artistLink.target = '_blank'
        dataContainer.appendChild(artistLink)

        const artistImage = document.createElement('img')
        artistImage.src = res.artistImage
        artistImage.classList.add('rest__text-img')
        artistLink.appendChild(artistImage)

        const dataTextContainer = document.createElement('div')
        dataContainer.appendChild(dataTextContainer)
 
        const projects = document.createElement('p')
        projects.textContent = 'Discophraphy'
        dataTextContainer.appendChild(projects)
 
        const listOfSongs = document.createElement('ul')
        listOfSongs.classList.add('rest__text--ul')
        for(let i = 0; i < res.discography.length; i++){
            const discography = document.createElement('li')
            discography.style.cursor = 'pointer'
            discography.textContent = res.discography[i]
            listOfSongs.appendChild(discography)
        }
        listOfSongs.addEventListener('click', e => searchDiscography(e.target))
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

const searchDiscography = (project) =>{
    if(project.textContent !== undefined){
        input.value = project.textContent
        selectInput.value = 'album'
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