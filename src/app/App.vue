<template>
	<div>
		<Header />
		<RouterView />
	</div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
	components: {
		Header,
	},
	data() {
		
	}
}
</script>


<style>
	@import '../style/reset.css';
	@import '../style/variables.css';
	@import '../style/fonts.css';
	@import '../style/style.css';
</style>
