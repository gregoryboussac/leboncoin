<script setup>
import PublishView from '@/views/PublishView.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <button>
    <RouterLink :to="{ name: 'publish' }">
      <font-awesome-icon :icon="['far', 'plus-square']" />
      Déposer une annonce
    </RouterLink>
  </button>
</template>

<style scoped>
button {
  background-color: var(--orange);
  border: none;
  border-radius: 10px;
  padding: 7px 10px 5px 10px;
  color: white;
  font-size: inherit;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
}
button svg {
  margin-right: 5px;
}
</style>
