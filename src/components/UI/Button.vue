<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'my-button'
}
</script>
<style>
.btn {
    padding: 10px;
    cursor: pointer;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
    justify-content: center;
}
</style>