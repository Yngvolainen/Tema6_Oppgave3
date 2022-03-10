export default {
	state() {
		return {
			citizens: []
		};
	},
	getters: {
		getCitizens(state) {
			return state.citizens
		}
	},
	mutations: {
		updateCitizens(state, result) {
			state.citizens = result
		}

	},
	actions: {
		async fetchCitizens(store) {
			const url = 'https://randomuser.me/api/?results=5'
			const response = await fetch(url)
			const {results} = await response.json()
			// console.log(result)
			store.commit('updateCitizens', results)
		}
	}
};
