
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




let app = new Vue({
	el: '#app',
	data: {
		search: '',
		movies: []
	},
	methods: {
		more: function () {
			console.log('ok')
		},
		love: function (movie) {
			Materialize.toast('Ajouté à vos favoris!', 4000) // 4000 is the duration of the toast
		},
		searching: function () {
			if (this.search.length >= 3) {
				$.getJSON(`http://www.omdbapi.com/?plot=full&r=json&s=${this.search}`, function (data) {
					if (data.Response !== "False") {
						app.movies = data.Search;
					}
				});
			}


		}
	}
});


// loading datas
$.getJSON(`http://www.omdbapi.com/?plot=full&r=json&s=a`, function (data) {
	if (data.Response !== "False") {
		app.movies = data.Search;
	}
});

