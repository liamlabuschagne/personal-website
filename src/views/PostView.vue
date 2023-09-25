<template>
	<h1>{{post.title}}</h1>
	<p>{{post.description}}</p>
	<section v-html="post.content"></section>
</template>

<script setup lang="ts">
	import store from '../store'
	import {ref,onBeforeMount} from 'vue'
	import {useRoute,useRouter} from 'vue-router'

	const post = ref({
		title:"",
		description:"",
		content:""
	})

	onBeforeMount(async () => {
		const route = useRoute()
		let data = store.posts.find(item => item.uri === route.params.uri)
		if(!data){
			useRouter().push("/blog")
			return;
		}
		const res = await fetch(`/blog/${data?.uri}.html`)
		const content = await res.text()
		post.value.title = data.title
		post.value.description = data.description
		post.value.content = content
	})
</script>
