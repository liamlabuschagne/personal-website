import {reactive} from 'vue';

const store = reactive({
    posts: [
        {
            "uri": "this-website",
            "title": "How This Website Was Build",
            "description": "This blog post outlines exactly how I've created this website, what challenges I faced and how I do it all for $0.",
            "created": new Date("2023-09-28T20:00Z"),
            "updated": new Date("2023-09-28T20:00Z")
        },
        {
            "uri": "example-blog-post",
            "title": "Example Blog Post",
            "description": "This blog post is just an example.",
            "created": new Date("2023-09-24T18:05Z"),
            "updated": new Date("2023-09-24T18:05Z")
        },
        {
            "uri": "a-great-article",
            "title": "A great Article",
            "description": "An awesome article to read.",
            "created": new Date("2023-10-24T15:05Z"),
            "updated": new Date("2023-10-24T15:05Z")
        },
        {
            "uri": "top-ten-tools",
            "title": "Top ten tools",
            "description": "These are my favourite tools. I really like them!",
            "created": new Date("2023-11-24T14:05Z"),
            "updated": new Date("2023-12-24T16:05Z")
        },
    ]
})

export default store;
