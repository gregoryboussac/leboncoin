<script setup></script>

<template>
  <main>
    <footer class="container">
      <p>
        Made by <a href="https://github.com/gregoryboussac" target="_blank">Grégory</a> with
        <a href="https://vuejs.org/">Vue.js</a>
      </p>
    </footer>
  </main>
</template>
<style scoped>
footer {
  height: var(--footerHeight);
  background-color: var(--blueLight);
  display: flex;
  align-items: center;
  justify-content: center;
}
a {
  text-decoration: none;
  font-weight: bold;
  color: black;
}
</style>
