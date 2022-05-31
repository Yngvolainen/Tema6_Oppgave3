<template>
	<div class="wrapper">
		<Heady />
		<div class="map-background">
			<div id="map"></div>
		</div>
		<Citizen class="map-overlay" :people="people" :idOfPerson="idOfPerson" v-if="personChosen" @close-window="personChosen = false" />
		<Footer @reload-page="reloadPage" />
	</div>
</template>

<script>

import mapboxgl from 'mapbox-gl';
import Citizen from '../components/Citizen.vue'
import Heady from '../components/Heady.vue'
import Footer from '../components/Footer.vue'

export default {
	components: {
		Heady,
		Citizen,
		Footer
	},
	data() {
		return {
			mapbox_id: import.meta.env.VITE_MAPBOX_ID,
			// mapbox_id: 'pk.eyJ1IjoieW5ndm9sYWluZW4iLCJhIjoiY2wwZ2ZpN28yMHFrajNscXQ2aGg0eGZvdyJ9.AN48Q16Nw_AXyXeeBkEflA',
			people: [],
			idOfPerson: '',
			personChosen: false
		}
	},
	async created() {
		await this.getPeople

		// GET MAP
		mapboxgl.accessToken = this.mapbox_id;
		// console.log(this.mapbox_id)
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [10.75, 59.91], // starting position [lng, lat]
			zoom: 1 // starting zoom
			});
		this.markers(map);
	},
	methods: {
		markers(map) {
			// below "const marker1" part of example for mapbox markers, but doesn´t seem to do anything?
			// const marker1 = new mapboxgl.Marker()
			for (const marker of this.people) {
				// "Create a DOM element for each marker."
				const el = document.createElement('div');
				el.className = 'marker';
				// give id based on cellphone number, because randomuser.me returns unpredictable values in id
				el.id = `${marker.cell}`
				el.style.backgroundImage = `url(${marker.picture.thumbnail})`;
				el.style.width = `50px`;
				el.style.height = `50px`;
				el.style.backgroundSize = '100%';


				el.addEventListener('click', () => {
					// marker.cell is the most easily accessible unique feature of each person. Im using that as the basis to find the index of each individual person
					const personId =  el.id;
					// find index of people-array matching "personId"
					this.idOfPerson = this.people.findIndex( marker => marker.cell === personId)
					// switch this value to true for v-if directive to show the <Citizen> overlay
					this.personChosen = true;
				});


				// "Add markers to the map."
				new mapboxgl.Marker(el)
				.setLngLat([marker.location.coordinates.longitude, marker.location.coordinates.latitude])
				.addTo(map);
				}
			},
			reloadPage() {
				location.reload();
			}
		},
	computed: {
		async getPeople() {
			await this.$store.dispatch('fetchCitizens');
			this.people = this.$store.getters.getCitizens;
		}
	}
}
</script>

<style>
	#map {
		width: 100%;
		height: 500px;
		border-radius: 50%; 
	}
	.wrapper {
		position: relative;
		padding: 1rem;
	}
	.map-background {
		background-image: url(/images/space.jpg);
		background-size: 100%;
	}
	.marker {
		display: block;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		padding: 0;
		}
	.map-overlay {
		position: absolute;
		margin: 0 auto;
	}
</style>