<template>
	<div id="map"></div>
</template>

<script>

import mapboxgl from 'mapbox-gl';

export default {
	data() {
		return {
			mapbox_id: import.meta.env.VITE_MAPBOX_ID,
			butikker: [],
			geojson: {
				'type': 'FeatureCollection',
				'features': [
					{
					'type': 'Feature',
					'properties': {
						'message': 'Foo',
						'iconSize': [60, 60]
					},
					'geometry': {
						'type': 'Point',
						'coordinates': [10.75000, 59.91000]
						}
					},

					{
					'type': 'Feature',
					'properties': {
						'message': 'Bar',
						'iconSize': [50, 50]
						},
					'geometry': {
						'type': 'Point',
						'coordinates': [-61.21582, -15.971891]
						}
					},

					{
					'type': 'Feature',
					'properties': {
						'message': 'Baz',
						'iconSize': [40, 40]
						},
					'geometry': {
						'type': 'Point',
						'coordinates': [-63.292236, -18.281518]
					}
					}
				]
			}
		}
	},
	mounted() {
		mapboxgl.accessToken = this.mapbox_id;
		const map = new mapboxgl.Map({
		container: 'map', // container ID
		style: 'mapbox://styles/mapbox/streets-v11', // style URL
		center: [10.75, 59.91], // starting position [lng, lat]
		zoom: 14 // starting zoom
		});

		this.getStuff();
		this.markers(map);
	},
	methods: {
		async getStuff() {

			// VINMONOPOLETS API ER BARE TULLLLLLL
			// const url = 'https://apis.vinmonopolet.no/stores/v0/details';

			const url = 'http://cors-anywhere.herokuapp.com/https://rema.no/api/v2/stores'
			const response = await fetch(url)
			console.log(response)
			const result = await response.json()
			console.log(result.results[0])
		},
		markers(map) {
			mapboxgl.accessToken = this.mapbox_id;
			console.log('skjera?')
			const marker1 = new mapboxgl.Marker()
			for (const marker of this.geojson.features) {
				// Create a DOM element for each marker.
				const el = document.createElement('div');
				const width = marker.properties.iconSize[0];
				const height = marker.properties.iconSize[1];
				el.className = 'marker';
				el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
				el.style.width = `${width}px`;
				el.style.height = `${height}px`;
				el.style.backgroundSize = '100%';
				
				el.addEventListener('click', () => {
				window.alert(marker.properties.message);
				});
				console.log('mellomloggggg')
				// Add markers to the map.
				new mapboxgl.Marker(el)
				.setLngLat(marker.geometry.coordinates)
				.addTo(map);
			console.log('ingenting!')
			}
		}
	}
}
</script>

<style scoped>
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