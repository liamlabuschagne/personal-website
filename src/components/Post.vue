<template>
    <h1>{{props.title}}</h1>
    <p>{{props.description}}</p>
    <p>Posted: {{props.created}}</p>
    <p>Updated: {{props.updated}}</p>
</template>

<script setup lang="ts">
    const props = defineProps(['title','description','created','updated']);
</script>
