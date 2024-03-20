'use strict'

function delCon(container) {
	container.innerHTML = ''
}
function addCon(container, item) {
	container.appendChild(item)
}
function generateCard(data, container) {
	delCon(container)
	if (data.results == undefined) {
		data.map((character) => {
			addCon(container, HTMLCard(character))
			const characterStatus = document.querySelectorAll('.card__status')
			changeCharacterStatus(characterStatus)
		})
	} else {
		data.results.map((character) => {
			addCon(container, HTMLCard(character))
			const characterStatus = document.querySelectorAll('.card__status')
			changeCharacterStatus(characterStatus)
		})
	}
}
function HTMLCard(character) {
	const fragment = document.createDocumentFragment()
	const div = document.createElement('div')
	div.className = 'card animate-fade-1'
	div.innerHTML = ` <label class="card__status">${character.status}</label>
                    <img src="${character.image}" class="card__img">
                    <div class="card__info">
                        <h3 class="card__h3">${character.name}</h3>
                        <span class="card__span">Last location:</span>
                        <h4 class="card__h4">${character.location.name}</h4>
                    </div>`
	listenClickCard(div, character)
	return fragment.appendChild(div)
}
function changeCharacterStatus(characters) {
	characters.forEach((character) => {
		if (character.innerHTML == 'Alive') {
			character.style.background = '#059E00'
		} else if (character.innerHTML == 'Dead') {
			character.style.background = '#9E0003'
		} else {
			character.style.background = '#A6A6A6'
		}
	})
}
function listenClickCard(card, character) {
	card.addEventListener('click', () => {
		HTMLModal(character, modal)
		modal.addEventListener('click', (e) => {
			if (
				e.target.className == 'modal__card' ||
				e.target.className == 'visible'
			) {
				modal.className = 'invisible'
			}
		})
	})
}
function HTMLModal(character, container) {
	// modal.id = "visible"
	modal.className = 'visible'
	delCon(container)
	let div = document.createElement('div')
	div.className = 'modal__card'
	div.innerHTML = `   <img src="${
		character.image
	}" style="border-radius:8px 8px 8px 8px;">
                        <div class="modal__info">
                            <h2 class="modal__h2">${character.name}</h2>
                            <ul class="modal__ul">
                                <li class="modal__li">Status: ${
																	character.status
																}</li>
                                <li class="modal__li">Species: ${
																	character.species
																}</li>
                                <li class="modal__li">Type: ${
																	character.type == '' ? 'None' : character.type
																}</li>
                                <li class="modal__li">Gender: ${
																	character.gender
																}</li>
                                <li class="modal__li">Origin: ${
																	character.origin.name
																}</li>
                                <li class="modal__li pointer" id="location">Last location: ${
																	character.location.name
																}</li>
                            </ul>
                        </div>`
	addCon(container, div)
	document.querySelector('#location').addEventListener('click', () => {
		location.href = '/locations/locations.html'
		sessionStorage.setItem('url', character.location.url)
	})
}
function HTMLPage(currentPage, pages, nextPage, prevPage, container) {
	delCon(container)
	const fragment = document.createDocumentFragment()
	const div = document.createElement('div')
	div.className = 'pages'
	div.innerHTML = `<ul class="pages__ul">
                    ${
											currentPage > 1
												? `<li class="pages__button" id="prev">Prev</li>`
												: ''
										}
                    <li class="pages__li">${currentPage}</li>
                    <p  class="pages__p">of</p>
                    <li class="">${pages}</li>
                    ${
											nextPage != null
												? `<li class="pages__button" id="next"><a>Next</a></li>`
												: ''
										}
                    </ul>`
	fragment.appendChild(div)
	addCon(container, fragment)
	if (nextPage != null) {
		document.querySelector('#next').addEventListener('click', (e) => {
			currentPage++
			delCon(charactersContainer)
			api('', '', '', currentPage, '', undefined, nextPage)
		})
	}
	if (prevPage != null) {
		document.querySelector('#prev').addEventListener('click', (e) => {
			currentPage--
			delCon(charactersContainer)
			api('', '', '', currentPage, '', undefined, prevPage)
		})
	}
}
function HTMLError({ message }) {
	delCon(charactersContainer)
	const fragment = document.createDocumentFragment()
	const div = document.createElement('div')
	div.className = 'error'
	div.innerHTML = `<h2 class="error__h2">${message}</h2>`
	fragment.appendChild(div)
	addCon(charactersContainer, fragment)
	delCon(pageContainer)
}

const charactersContainer = document.querySelector('#conCharacters'),
	selectName = document.querySelector('#selNameCharacters'),
	selectStatatus = document.querySelector('#selStatCharacters'),
	selectSpecies = document.querySelector('#selSpecCharacters'),
	selectGender = document.querySelector('#selGenCharacters'),
	pageContainer = document.querySelector('#conPage'),
	rickAndMortyWiki = document.querySelector('.header__h2'),
	modal = document.querySelector('#modal'),
	characterFilters = document.querySelectorAll('.filterCon__filter'),
	loader = document.getElementById('loader')

loader.style.display = 'flex'

function listener() {
	let gender, species, status, name
	selectName.addEventListener('keyup', () => {
		gender = selectGender.value
		species = selectSpecies.value
		status = selectStatatus.value
		name = selectName.value
		api(status, gender, species, 1, name)
	})
	characterFilters.forEach((filter) => {
		filter.addEventListener('change', (e) => {
			species = selectSpecies.value
			status = selectStatatus.value
			gender = selectGender.value
			name = selectName.value
			api(status, gender, species, 1, name)
		})
	})
	rickAndMortyWiki.addEventListener('click', () => {
		window.location.href = '/home.html'
	})
	// selectStatatus.addEventListener("change", (e)=>{
	//     let status = e.target.value,
	//     gender = selectGender.value,
	//     species = selectSpecies.value,
	//     name = selectName.value;
	//     api(status,gender,species,1,name);
	// });
	// selectGender.addEventListener("change",(e)=>{
	//     let gender = e.target.value,
	//     status = selectStatatus.value,
	//     species = selectSpecies.value,
	//     name = selectName.value;
	//     api(status,gender,species,1,name);
	// });
	// selectSpecies.addEventListener("change",(e)=>{
	//     let species = e.target.value,
	//     status = selectStatatus.value,
	//     gender = selectGender.value,
	//     name = selectName.value;
	//     api(status,gender,species,1,name);
	// });
}
listener()

loader.style.display = 'none'
const api = async (status, gender, species, page, name, array, link) => {
	let url, currentPage, pages, nextPage, prevPage
	if (array != undefined) {
		url = `https://rickandmortyapi.com/api/character/${array}`
	} else if (link != undefined) {
		url = `${link}`
	} else {
		url = `https://rickandmortyapi.com/api/character/?page=${page}&status=${status}&gender=${gender}&species=${species}&name=${name}`
	}
	try {
		const api = await fetch(url),
			data = await api.json()
		generateCard(data, charactersContainer)
		if (array == undefined) {
			currentPage = page
			pages = data.info.pages
			nextPage = data.info.next
			prevPage = data.info.prev
			pages > 1
				? HTMLPage(currentPage, pages, nextPage, prevPage, pageContainer)
				: delCon(pageContainer)
		}
	} catch (error) {
		return HTMLError({ message: 'Character not found!' })
	}
}

let array = []
for (let i = 0; i < 20; i++) {
	array.push(Math.floor(Math.random() * 827))
}

api('', '', '', '', '', array)
