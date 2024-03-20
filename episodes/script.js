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
function HTMLFilter(data) {
	main__title.innerHTML = `<h1 class="main__h1">Episode Name: <span>${data.name}</span></h1>
                            <h2 style="line-height: 200%; font-weight: 400;">Air Date: ${data.air_date}</h2>`
	c137.innerText = `${data.name}`
	for (let i = 1; i < 52 && i != id; i++) {
		api(i)
	}
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

const apiOnload = async (id) => {
	let url = `https://rickandmortyapi.com/api/episode/${id}`
	const api = await fetch(url),
		data = await api.json(),
		array = data.characters
	HTMLFilter(data)
	if (array.length != 0) {
		array.forEach((character) => {
			apiCharacter(character)
		})
	} else {
		HTML404(conCharacters)
	}
}
const apiCharacter = async (id) => {
	let url = `${id}`
	const api = await fetch(url),
		data = await api.json()
	HTMLCard(data, conCharacters)
}

let id = ''
for (let i = 0; i < 20; i++) {
	id = Math.floor(Math.random() * 52)
}
apiOnload(id)
const api = async (id) => {
	let url = `https://rickandmortyapi.com/api/episode/${id}`
	const api = await fetch(url),
		data = await api.json()
	let option = document.createElement('option')
	console.log('api')
	console.log(id)
	console.log(data)
	option.innerText = `${data.name}`
	option.value = `${data.id}`
	selLoc.appendChild(option)
}

function listener() {
	selLoc.addEventListener('change', () => {
		apiOnload(selLoc.value)
		delCon(conCharacters)
	})
}
listener()
