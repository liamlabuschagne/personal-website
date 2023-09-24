<template>
    <h1>Blog</h1>
    <div v-for="item, itemIndex in store.posts" :key="itemIndex">
        <PostPreview :title="item.title" :description="item.description" :created="item.created" :updated="item.updated" @click="$router.push(`/blog/${item.uri}`)" />
    </div>
</template>

<script setup>
import store from '../store';    
import PostPreview from '../components/PostPreview.vue';
</script>
