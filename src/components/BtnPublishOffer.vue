<script setup></script>

<template>
  <button>
    <font-awesome-icon :icon="['far', 'plus-square']" />
    Déposer une annonce
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
