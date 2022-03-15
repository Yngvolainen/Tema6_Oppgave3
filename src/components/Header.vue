<template>
    <div class="header">
        <h1>Partner in Crime</h1>
        <button @click="$emit('reload-page')">Find new criminals</button>
    </div>
    <p>Your one-stop location for criminal activities and the partners who are willing to do heinous things with you :-O</p>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        async getNewPeople() {
            await this.$store.dispatch('fetchCitizens');
            this.$store.getters.getCitizens
            console.log('poot')
        }
    }
}
</script>

<style>
    .header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
</style>