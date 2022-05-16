import { getAlbum } from "./searchAlbum.js"
import { getArtist } from "./searchArtist.js"
const input = document.getElementById('input')
const selectInput = document.getElementById('select-input')

form.addEventListener('submit', e =>{
   e.preventDefault()
   selectInput.value === 'album' ? getAlbum(input.value) : getArtist(input.value) 
})