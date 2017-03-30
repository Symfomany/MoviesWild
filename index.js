
/**
 * VueJS
 */

Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
})


let app = new Vue({
  el: '#app',
  data: {
		search: '',
		movies: []
  },
	methods: {
		love: function(movie){
			Materialize.toast('Ajouté à vos favoris!', 4000) // 4000 is the duration of the toast
		},
		searching: function(){
			app.movies = [];
			if(this.search.length >= 3){
					$.getJSON(`http://www.omdbapi.com/?plot=full&r=json&t=${this.search}`, function(data) {
						
						if(data.Response !== "False"){
							app.movies.push(data);
						
					}
					});

			}
			

		}
	}
});

/**
 * Instance Jquery 
 */
$.getJSON("http://www.omdbapi.com/?t=pou", function( data ) {
	app.movies.push(data);
});