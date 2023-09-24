<template>
    <h1>{{post?.title}}</h1>
    <p>{{post?.description}}</p>
    <section v-html="content">
    </section>
</template>

<script setup lang="ts">
    import store from '../store'
	import {ref} from 'vue'
    import {useRoute} from 'vue-router'
    const route = useRoute()
    const post = store.posts.find(item => item.uri === route.params.uri)
	const content = ref("")
    fetch(`/blog/${post?.uri}.html`)
	.then(res => res.text())
	.then(text => {content.value = text})
</script>
