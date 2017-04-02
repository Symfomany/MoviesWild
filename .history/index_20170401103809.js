
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




// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
	{ path: '/foo', component: Foo },
	{ path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
	routes // short for routes: routes
})

var data = { counter: 0 }

Vue.component('currency-input', {
	template: `
    <span>
      $
      <input
        ref="input"
        :value="value"
        v-on:input="updateValue($event.target.value)">
    </span>
  `,
	props: ['value'],
	methods: {
		// Instead of updating the value directly, this
		// method is used to format and place constraints
		// on the input's value
		updateValue: function (value) {
			var formattedValue = value
				// Remove whitespace on either side
				.trim()
				// Shorten to 2 decimal places
				.slice(0, value.indexOf('.') + 3)
			// If the value was not already normalized,
			// manually override it to conform
			if (formattedValue !== value) {
				this.$refs.input.value = formattedValue
			}
			// Emit the number value through the input event
			this.$emit('input', Number(formattedValue))
		}
	}
});

Vue.component('my-main', {
	template: '<button @click="increment">{{ counter }} {{ message }}</button>',
	props: {
		message: [String],
		required: true,
		default: ''
	},


	data: function () {
		// Then Vue will halt and emit warnings in the console, telling you that data must be a function for component instances. It’s good to understand why the rules exist though, so let’s cheat.
		// chaque instance aura ses datas
		return {
			counter: 0,
		}
	},

	methods: {
		increment: function () {
			this.counter += 1;
			this.$emit('increment');
		}

	},

});

// @click.native="doTheThing" : Binding Native Events to Components

let app = new Vue({
	router,
	el: '#app',
	data: {
		price: 52,
		search: '',
		selected: false,
		selectedMovie: null,
		favoritesMovie: [],
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

