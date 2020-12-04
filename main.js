const api_key = '7ba085c4229baa855e3ee88a6b076287';
const divider_rating = 2

const myApp = new Vue({
	el: "#root",
	data: {
        searchInput: '',
        movies: [],
        currentPage: 1,
        totalPage: 0,
        currentSearch: ''
    },
    mounted(){
        axios
            .get('https://api.themoviedb.org/3/trending/all/week',{
                params: {
                    'api_key': api_key,
                    language: 'it_IT'
                }
            })
            .then((r) => {
                this.movies = r.data.results
                this.totalPage = r.data.total_pages
            })
    },
	methods:{
        searchFilm: function() {
            this.movies = []
            
            if (this.currentSearch != this.searchInput) {
                this.currentPage = 1;
            }
            
            this.currentSearch = this.searchInput

            console.log(this.searchInput)
            axios
                .get('https://api.themoviedb.org/3/search/movie',{
                    params: {
                        'api_key': api_key,
                        query: this.searchInput,
                        language: 'it-IT',
                        page: this.currentPage,
                    }
                })
                .then((r) => {
                    this.movies = this.movies.concat(r.data.results)
                    this.totalPage = r.data.total_pages
                })
                .catch((e) => console.log(e))
            axios
            .get('https://api.themoviedb.org/3/search/tv',{
                params: {
                    'api_key': api_key,
                    query: this.searchInput,
                    language: 'it-IT',
                    page: this.currentPage,
                }
            })
            .then((r) => {
                this.movies = this.movies.concat(r.data.results)
                this.totalPage = r.data.total_pages
            })
            .catch((e) => console.log(e))
        },
        starsvote: 
        (vote) => {
            return Math.ceil(vote / divider_rating);
        },
        flagDefault: 
        (el) => {
            return el.target.src = 'img/page-not-found.png';
        },
        nextPage:
        function(){
            this.currentPage++
            this.searchFilm()
        },
        prevPage:
        function(){
            this.currentPage--
            this.searchFilm()
        },
        changePage:
        function(index) {
            this.currentPage = index
            this.searchFilm()
        },
	},
	

})

