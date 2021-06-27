import NewFetchImg from './js/apiService';
import itemCardImg from './hbs/img-card.hbs';



const refs = {
	submitForm : document.querySelector('.search-form'),
	btnAddListImg : document.querySelector('.button-add-img'),
	galleryItems : document.querySelector('.gallery')
}

const newFetchImg = new NewFetchImg();

refs.submitForm.addEventListener('submit', onGetApiImg);
refs.btnAddListImg.addEventListener('click', onAddNewListRender);


function onGetApiImg(e) {
	e.preventDefault();

	clearListCardsImg();
	newFetchImg.query = e.currentTarget.elements.query.value.trim();

	if (newFetchImg.query === "") {
		refs.btnAddListImg.classList.remove('btn-block')
		return alert('Введите наименование запроса');
	}

	newFetchImg.resetPage();
	newFetchImg.fetchImg().then(renderCardsImg)
	refs.btnAddListImg.classList.add('btn-block')
}

function renderCardsImg(imgs){
	refs.galleryItems.insertAdjacentHTML('beforeend', itemCardImg(imgs));	
}


function onAddNewListRender() {
	newFetchImg.fetchImg().then(renderCardsImg);
}

function clearListCardsImg(){
	refs.galleryItems.innerHTML = "";	
}