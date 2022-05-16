const app = document.getElementById('app')
const form = document.getElementById('form')
const input = document.getElementById('input')
const layer = document.getElementById('layer')
const modalWindowForm = document.getElementById('modal-window')
const inputModalName = document.getElementById('input-modal-name')
const inputModalNumber = document.getElementById('input-modal-number')
const postContactButton = document.getElementById('post-new-contact')
const btnModalWindow = document.getElementById('btn-modal')
const regEx = new RegExp(/^(04[1-9][1-9])[-]([0-9]){7}$/g)
const pushedContacts = []
let repeatName
let currentID

const getData = (name) =>{
    if(name === '' || repeatName === name) return

    for(let contact of pushedContacts) if(contact === name) return

    fetch(`http://localhost:3002/contact/api/${name}`)
     .then(res => res.json())
      .then(res => {
            const fragment = document.createDocumentFragment()
            const contactContainer = document.createElement('div')
            contactContainer.classList.add('contact__item')

            const dataContainer = document.createElement('div')
            contactContainer.appendChild(dataContainer)

            const contactImg = document.createElement('img')
            contactImg.src = res.contactImg
            contactImg.classList.add('contact__img')
            dataContainer.appendChild(contactImg)

            const contactName = document.createElement('p')
            contactName.textContent = `Contact Name: ${res.contactName}`
            pushedContacts.push(res.contactName)
            dataContainer.appendChild(contactName)

            const contactNumber = document.createElement('p')
            contactNumber.textContent = `Contact Number: ${res.contactNumber}`
            dataContainer.appendChild(contactNumber)

            const contactID = document.createElement('p')
            contactID.textContent = `ID: ${res._id}` 
            dataContainer.appendChild(contactID)

            const buttons = document.createElement('div')
            buttons.classList.add('buttons')
            contactContainer.appendChild(buttons)

            const btnDelete = document.createElement('button')
            btnDelete.classList.add('btn-delete')
            btnDelete.textContent = 'Delete'
            btnDelete.dataset.id = res._id
            buttons.appendChild(btnDelete)

            const btnUpdate = document.createElement('button')
            btnUpdate.textContent = 'Update'
            btnUpdate.classList.add('btn-update')
            btnUpdate.dataset.id = res._id
            buttons.appendChild(btnUpdate)

            contactContainer.appendChild(buttons)

            fragment.appendChild(contactContainer)
            app.appendChild(fragment)
      })
    repeatName = name
    input.value = ''
}

const showModalWindow = (showWindow) =>{
    layer.classList.add('layer')
    if(modalWindowForm.classList.contains('disappear')){
        modalWindowForm.classList.remove('disappear')
        modalWindowForm.classList.add('show')
    }
    putValues(showWindow.dataset.id)
}

const putValues = (ID) =>{
    fetch(`http://localhost:3002/contact/api/${ID}`,{
        method: 'PUT'
    })
    .then(res => res.json())
    .then(res => {
        inputModalName.value = res.contactName
        inputModalNumber.value = res.contactNumber
        currentID = ID
    })
}

const updateValues = async () =>{
    if(layer.classList.contains('layer')) layer.classList.remove('layer')
    if(!modalWindowForm.classList.contains('disappear')){
        modalWindowForm.classList.remove('show')
        modalWindowForm.classList.add('disappear')
    }

    const data = JSON.stringify({
        contactName: inputModalName.value,
        contactNumber: inputModalNumber.value,
    })
    
    fetch(`http://localhost:3002/contact/api/${currentID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: data
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
    currentID = undefined
}

const postContact = () =>{
    btnModalWindow.textContent = 'Update'
    if(layer.classList.contains('layer')) layer.classList.remove('layer')
    if(!modalWindowForm.classList.contains('disappear')){
        modalWindowForm.classList.remove('show')
        modalWindowForm.classList.add('disappear')
    }
    const data = JSON.stringify({
        contactName: inputModalName.value,
        contactNumber: inputModalNumber.value
    })
    if(regEx.test(inputModalNumber))
    fetch(`http://localhost:3002/contact/api/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: data
    })
}

const deleteContact = (ID) =>{
    fetch(`http://localhost:3002/contact/api/${ID.dataset.id}`,{
        method: 'DELETE'
    })
    app.removeChild(ID.parentElement.parentElement)
}

form.addEventListener('submit', e =>{
    e.preventDefault()
    getData(input.value)
})

app.addEventListener('click', e =>{
    if(e.target.classList.contains('btn-update')) showModalWindow(e.target)
    if(e.target.classList.contains('btn-delete')) deleteContact(e.target) 
}) 

modalWindowForm.addEventListener('submit', e =>{
    e.preventDefault()
    if(e.target.textContent === 'Post Contact') postContact()
    if(e.target.textContent !== 'Post Contact') updateValues()
})

postContactButton.addEventListener('click', e =>{
    btnModalWindow.textContent = 'Post Contact'
    if(!layer.classList.contains('layer')) layer.classList.add('layer')
    if(modalWindowForm.classList.contains('disappear')){
        modalWindowForm.classList.remove('disappear')
        modalWindowForm.classList.add('show')
    }
})