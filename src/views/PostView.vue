<template>
    <h1>{{post?.title}}</h1>
    <p>{{post?.description}}</p>
    <section v-html="content">
    </section>
</template>

<script setup lang="ts">
    import store from '../store';
    import {useRoute} from 'vue-router';
    const route = useRoute()
    const post = store.posts.find(item => item.uri === route.params.uri); 
    import content from '../assets/blog/example-blog-post.html?raw'
</script>
