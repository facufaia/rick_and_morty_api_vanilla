'use strict'

function delCon(container) {
	container.innerHTML = ''
}
function addCon(container, item) {
	container.appendChild(item)
}
function HTMLCard(character, container) {
	let div = document.createElement('div')
	div.className = 'card animate-fade-1'
	div.innerHTML = ` <label class="card__status">${character.status}</label>
                            <img src="${character.image}" class="card__img">
                            <div class="card__info">
                                <h3 class="card__h3">${character.name}</h3>
                                <span class="card__span">Last location:</span>
                                <h4 class="card__h4">${character.location.name}</h4>
                            </div>`
	addCon(container, div)
	const zx = document.querySelectorAll('.card__status')
	zx.forEach((element) => {
		if (element.innerHTML == 'Alive') {
			element.style.background = '#059E00'
		} else if (element.innerHTML == 'Dead') {
			element.style.background = '#9E0003'
		} else {
			element.style.background = '#A6A6A6'
		}
	})
	div.addEventListener('click', () => {
		console.log('Modal')
	})
}
function HTMLTitle(data) {
	main__title.innerHTML = `<h1 class="main__h1">Location: <span>${data.name}</span></h1>
                            <h2 style="line-height: 200%; font-weight: 400;">Dimension: ${data.dimension}</h2><h3 style="font-weight: 400;">Type: ${data.type}</h3>`
	c137.innerText = `${data.name}`
	c137.value = `${data.id}`
}
function HTML404(container) {
	container.innerHTML = `<h2 style="font-weight: 300;">This dimension haven't residents, prove with other one</h2>`
}

const conPage = document.querySelector('#conPage'),
	rickAndMortyWiki = document.querySelector('.header__h2'),
	main__title = document.querySelector('.main__title  '),
	c137 = document.querySelector('#c137'),
	selLoc = document.querySelector('#selLoc'),
	conCharacters = document.querySelector('#conCharacters')

let id = Math.floor(Math.random() * 126)
if (sessionStorage.getItem('url') != null) {
	id = sessionStorage.getItem('url')
	sessionStorage.clear()
}
const apiOnload = async (id) => {
	let url
	if (isFinite(id)) {
		url = `https://rickandmortyapi.com/api/location/${id}`
	} else {
		url = `${id}`
	}
	const api = await fetch(url),
		data = await api.json(),
		array = data.residents
	HTMLTitle(data)
	if (array.length != 0) {
		array.forEach((character) => {
			apiCharacter(character)
		})
	} else {
		HTML404(conCharacters)
	}
}
apiOnload(id)
const apiCharacter = async (id) => {
	let url = `${id}`
	const api = await fetch(url),
		data = await api.json()
	HTMLCard(data, conCharacters)
}
const api = async (id) => {
	let url = `https://rickandmortyapi.com/api/location/${id}`
	const api = await fetch(url),
		data = await api.json()
	data.forEach((element) => {
		let option = document.createElement('option')
		option.innerText = `${element.name}`
		option.value = `${element.id}`
		selLoc.appendChild(option)
	})
}
let array = []
for (let i = 1; i < 127; i++) {
	array.push(i)
}
api(array)
function listener() {
	selLoc.addEventListener('change', () => {
		apiOnload(selLoc.value)
		delCon(conCharacters)
	})
}
listener()
