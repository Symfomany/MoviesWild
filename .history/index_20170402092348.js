/**
 * VueJS
 */
Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
	primary: 'blue',
	accent: 'red',
	warn: 'red',
	background: 'white'
});


// @click.native="doTheThing" : Binding Native Events to Components

let app = new Vue({
	el: '#app',
	data: {
		price: 52,
		search: '',
		selected: false,
		selectedMovie: null,
		favoritesMovie: [],
		words: [],
		movies: []
	},
	methods: {
		onClose(state) {
			if (state == 'ok') {
				let position = this.movies.indexOf(this.selectedMovie);
				this.movies.splice(position, 1);
			}
		},
		openDialog(ref, movie) {
			this.selectedMovie = movie;
			this.$refs[ref].open();
		},
		closeDialog(ref) {
			this.$refs[ref].close(movie);
		},
		toggleLeftSidenav() {
			this.$refs.leftSidenav.toggle();
		},
		more: function () {
			let emptyString = "";
			let alphabet = "abcdefghijklmnopqrstuvwxyz";
			emptyString += alphabet[Math.floor(Math.random() * alphabet.length)];

			$.getJSON(`http://www.omdbapi.com/?plot=full&r=json&s=${emptyString}`, function (data) {
				console.log(data);
				if (data.Response !== "False") {
					app.movies = app.movies.concat(data.Search);
				}
			});
		},
		love: function (movie) {
			this.$refs.snackbar.open();
			let position = this.favoritesMovie.indexOf(movie);
			console.log(position)
			if (position > -1) {
				this.favoritesMovie.splice(position, 1);
			} else {
				this.favoritesMovie.push(movie);
			}

		},
		searching: function () {
			if (this.search.length >= 3) {

				if (!this.words.indexOf(this.search) != -1) {
					this.words.push(this.search);
				}

				$.getJSON(`http://www.omdbapi.com/?plot=full&r=json&s=${this.search}`, function (data) {
					if (data.Response !== "False") {
						app.movies = data.Search;
					}
				});
			}
		},

	}
});


// loading datas
$.getJSON(`http://www.omdbapi.com/?plot=full&r=json&s=a`, function (data) {
	if (data.Response !== "False") {
		app.movies = data.Search;
	}
});

