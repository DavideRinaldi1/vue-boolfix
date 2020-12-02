const api_key = '7ba085c4229baa855e3ee88a6b076287';

const myApp = new Vue({
	el: "#root",
	data: {
		searchInput: ''
	},
	methods:{
        searchFilm: () => {
            axios
                .get('https://api.themoviedb.org/3/search/movie',{
                    params: {
                        'api_key': api_key,
                        query: this.searchInput,
                    }
                })
                .then(film => console.log(film) );
                console.log(this.searchInput)
        }
	},
	

})