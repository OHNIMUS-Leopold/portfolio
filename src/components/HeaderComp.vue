<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="fixed top-0 left-0 z-10">
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>
</template>