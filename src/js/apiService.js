const HTTP_API = 'https://pixabay.com/api/';
const KEY_API = '22248336-3f9f08778186b55c7ac32d168';

export default class NewFetchImg {
	constructor() {
		this.page = 1;
		this.valueInput = '';
	}

	fetchImg() {		
		return fetch(`${HTTP_API}?image_type=photo&orientation=horizontal&q=${this.valueInput}&page=${this.page}&per_page=12&key=${KEY_API}`)
			.then(response => {
				if(response.ok)return response.json();
				throw new Error('Error fetching data')
			})
			.then( ({ hits }) => {
				// console.log(data)
				this.page += 1;
				return hits;
			})
			.catch(error => {
				console.log('Error', error)
			})
		
	}
	resetPage() {
		this.page = 1;
	}

	get query() {
		return this.valueInput;
	}

	set query(newValue) {
		this.valueInput = newValue;
	}
}




