<template>
    <div class="citizen">
        <div class="citizen__header">
            <h1>{{people[0].name.first}}</h1>
            <button>X</button>
        </div>
        <h2>{{people[0].name.last}}</h2>
        <h3>{{people[0].email}}</h3>
        <p>{{people[0].phone}}</p>
        <img src="images/favicon.png" alt="a picture">
    </div>
</template>

<script>
export default {
    props: ['people'],
    data() {
        return {
           
        }
    }
}
</script>

<style>
    .citizen {
        width: 50%;
        min-width: 300px;
        /* position: absolute;
        top: 10px;
        right: 10px; */
    }
    .citizen__header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: flex-start;
    }
</style>