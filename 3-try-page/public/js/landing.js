const hamburger = document.getElementById('hamburger')
const list = document.getElementById('list')

hamburger.addEventListener('click', (e) =>{
    if(list.classList.contains('nav__main--disappear')){
        list.classList.remove('nav__main--disappear')
        list.classList.add('nav__main--show')
    }else {
        list.classList.remove('nav__main--show')
        list.classList.add('nav__main--disappear')
    }
})

list.addEventListener('click', (e) =>{
    if(e.target.classList.contains('nav__item--link') && list.classList.contains('nav__main--show')){
        list.classList.remove('nav__main--show')
        list.classList.add('nav__main--disappear')
    }
})