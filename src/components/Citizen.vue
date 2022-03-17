<template>
    <div class="citizen">
        <button class="citizen__close-button" @click="$emit('close-window')"><img src="images/close.svg" alt="close profile"></button>

        <div class="citizen__header">
            <img :src="people[idOfPerson].picture.large" alt="profile picture">
            <h2>{{people[idOfPerson].name.first}}</h2>
        </div>

        <div>
            <!-- <h3>{{people[idOfPerson].name.last}}</h3> -->
            <p>Criminal activity: {{activity}}</p>
            <p>Call now: {{people[idOfPerson].phone}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['people', 'idOfPerson'],
    data() {
        return {
            activity: ''
        }
    },
    mounted() {
        this.getQuote
    },
    computed: {
        async getQuote() {
            const url = 'https://www.boredapi.com/api/activity/'
            const response = await fetch(url)
            const { activity } = await response.json()
            this.activity = activity
            console.log(this.activity)
        }
    }
}
</script>

<style>
    .citizen {
        width: 50%;
        min-width: 250px; 
        position: absolute;
        top: 100px;
        left: 25%; 
        border-radius: 5px;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.8);
        color: white; 
    }
    .citizen__close-button  {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    .citizen__header {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    .citizen__header img {
        width: 150px; 
        border-radius: 50%;
    }
</style>