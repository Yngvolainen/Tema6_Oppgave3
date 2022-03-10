<template>
	<div id="map"></div>
	<Citizen v-bind:people="people" />
</template>

<script>

import mapboxgl from 'mapbox-gl';
import Citizen from '../components/Citizen.vue'

export default {
	components: {
		Citizen
	},

	data() {
		return {
			mapbox_id: import.meta.env.VITE_MAPBOX_ID,
			people: []
		}
	},
	async created() {
		await this.$store.dispatch('fetchCitizens')
		await this.getPeople

		// GET MAP
		mapboxgl.accessToken = this.mapbox_id;
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
			// const marker1 = new mapboxgl.Marker()
			for (const marker of this.people) {
				// Create a DOM element for each marker.
				const el = document.createElement('div');
				el.className = 'marker';
				el.style.backgroundImage = `url(${marker.picture.thumbnail})`;
				el.style.width = `50px`;
				el.style.height = `50px`;
				el.style.backgroundSize = '100%';
				
				el.addEventListener('click', () => {
				window.alert(`clicked the id of ${marker.name.first}`);
				});
				// Add markers to the map.
				new mapboxgl.Marker(el)
				.setLngLat([(marker.location.coordinates.latitude / 2), (marker.location.coordinates.longitude / 2)])
				.addTo(map);
				}
			}
		},
	computed: {
		getPeople() {
			this.people = this.$store.getters.getCitizens;
			console.log(this.people)
		}
	}
}
</script>

<style>
	#map {
		width: 100%;
		height: 400px;
	}
	.marker {
		display: block;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		padding: 0;
		}
</style>