<script setup></script>

<template>
  <main>
    <footer>
      <p class="container">
        Made by <a href="https://github.com/gregoryboussac" target="_blank"> Grégory </a> with
        <a href="https://vuejs.org/"> Vue.js </a>
      </p>
    </footer>
  </main>
</template>
<style scoped>
footer {
  height: var(--footerHeight);
  background-color: var(--blueLight);
}
p {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
a {
  text-decoration: none;
  font-weight: bold;
  color: black;
}
</style>
