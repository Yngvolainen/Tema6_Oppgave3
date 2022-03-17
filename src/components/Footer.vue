<template>
    <div class="footer">
        <button @click="$emit('reload-page')">Reload ze criminals</button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style>
    .footer {
        text-align: center;
    }
</style>