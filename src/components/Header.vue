<script setup></script>

<template>
  <main>
    <header class="container">
      <div class="mainHeader">
        <img src="/src/assets/logo/logo.svg" alt="logo" />
        <div>
          <font-awesome-icon :icon="['far', 'square-plus']" />
          <button>Déposer une annonce</button>
          <input type="text" value="Rechercher sur leboncoin" />
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </div>
        <div>
          <font-awesome-icon :icon="['far', 'user']" />
          <p>Se connecter</p>
        </div>
      </div>
      <div class="navHeader">
        <p>Immobilier</p>
        <p>Véhicules</p>
        <p>Locations de vacances</p>
        <p>Emploi</p>
        <p>Mode</p>
        <p>Maison & Jardin</p>
        <p>Famille</p>
        <p>Electronique</p>
        <p>Loisirs</p>
        <p>Autres</p>
      </div>
    </header>
  </main>
</template>
<style scoped>
header {
  border: solid red 1px;
  height: var(--headerHeight);
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.container {
  width: auto 1050px;
}
.mainHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: solid rgb(51, 0, 255) 1px; */
  flex: 2;
}
.navHeader {
  /* border: solid rgb(255, 213, 0) 1px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  flex: 1;
}
img {
  height: 30px;
}
button {
  background-color: var(--orange);
  color: white;
  padding: 7px 15px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  margin-right: 20px;
}
input {
  height: 30px;
  width: 300px;
  border: none;
  background-color: #f4f9fd;
  border-radius: 5px;
}
.mainHeader div:last-of-type {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.mainHeader div:last-of-type > p {
  font-size: 12px;
}
</style>
