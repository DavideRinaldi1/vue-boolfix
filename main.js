const api_key = '7ba085c4229baa855e3ee88a6b076287';
const divider_rating = 2

const myApp = new Vue({
	el: "#root",
	data: {
        searchInput: 'scrubs',
        movies: [],
	},
	methods:{
        searchFilm: function() {
            this.movies = []
            console.log(this.searchInput)
            axios
                .get('https://api.themoviedb.org/3/search/movie',{
                    params: {
                        'api_key': api_key,
                        query: this.searchInput,
                        language: 'it-IT',
                    }
                })
                .then((r) => {this.movies = this.movies.concat(r.data.results)})
                .catch((e) => console.log(e))
                .finally(() => this.searchInput = '')
            axios
            .get('https://api.themoviedb.org/3/search/tv',{
                params: {
                    'api_key': api_key,
                    query: this.searchInput,
                    language: 'it-IT',
                }
            })
            .then((r) => {this.movies = this.movies.concat(r.data.results)})
            .catch((e) => console.log(e))
            .finally(() => this.searchInput = '')
        },
        starsvote: 
        (vote) => {
            return Math.ceil(vote / divider_rating);
        },
        flagDefault: 
        (el) => {
            return el.target.src = 'img/page-not-found.png';
        }
	},
	

})

