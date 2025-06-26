<template>
    <input type="text" :value="value" @input="updateInput" class="input">
</template>
<script>
export default {
    name: 'my-input',
    props: {
        value: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:value', event.target.value)
        }
    }
}
</script>
<style>
.input {
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 2px;
    height: 45px; 
    font-size: 17px;
}
@media (max-width: 580px) {
.input {
    padding: 6px 10px;
    height: 35px; 
    font-size: 13px;
}
}
@media (max-width: 350px) {
.input {
    padding: 2px 6px;
    height: 30px; 
    font-size: 11px;
}
}
</style>