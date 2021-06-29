import NewFetchImg from './js/apiService';
import itemCardImg from './hbs/img-card.hbs';
import debounce from 'lodash.debounce';


const refs = {
	submitForm : document.querySelector('.search-form'),
	btnAddListImg : document.querySelector('.button-add-img'),
	galleryItems : document.querySelector('.gallery')
}
const newFetchImg = new NewFetchImg();

refs.submitForm.addEventListener('submit', onGetListInApiImg);
refs.btnAddListImg.addEventListener('click', onAddNewListRender);
// refs.btnAddListImg.addEventListener('click', debounce(scrollToTarget, 500));


function onGetListInApiImg(e) {
	e.preventDefault();

	clearListCardsImg();
	newFetchImg.query = e.currentTarget.elements.query.value.trim();

	if (newFetchImg.query === "") {
		refs.btnAddListImg.classList.remove('btn-block');
		alert(`Ошибка!!! Введите наименование запроса`);

		return;
	}

	newFetchImg.resetPage();
	newFetchImg.fetchImg().then(renderCardsImg);	
}

function onAddNewListRender() {	
	newFetchImg.fetchImg().then(renderCardsImg).then(scrollToTarget);	
}


function renderCardsImg(imgs){
	if (imgs.length === 0){
		refs.btnAddListImg.classList.remove('btn-block');
		alert(`Ошибка!!! Введите корректное наименование запроса`);
		return;
	}
	
	refs.galleryItems.insertAdjacentHTML('beforeend', itemCardImg(imgs));	
	refs.btnAddListImg.classList.add('btn-block');
}

function clearListCardsImg(){
	refs.galleryItems.innerHTML = "";	
}

function scrollToTarget() {    
    refs.galleryItems.scrollIntoView({
		behavior: "smooth",
     	block: "end",
    });
}


