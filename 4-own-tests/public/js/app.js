const form = document.getElementById('form')
const input = document.getElementById('input')
const restText = document.getElementById('rest-text')

const getData = (album) =>{
   let URL = `http://localhost:3000/api/album/`
   fetch(URL)
   .then(res => res.json())
   .then(res =>{
      console.log(res);
   })
   .catch(err => {
      console.log(err);
   })  
}

form.addEventListener('submit', e =>{
   e.preventDefault()
   getData(input.value)
})
