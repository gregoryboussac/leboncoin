<script setup></script>

<template>
  <main>
    <header>
      <div class="container">
        <div class="mainHeader">
          <img src="/src/assets/logo/logo.svg" alt="logo" />
          <div>
            <button><font-awesome-icon :icon="['far', 'plus-square']" />Déposer une annonce</button>
            <div>
              <input type="text" name="search" id="search" value="Rechercher sur leboncoin" />
              <font-awesome-icon :icon="['fas', 'search']" />
            </div>
          </div>
          <div>
            <div>
              <font-awesome-icon :icon="['far', 'user']" />
              <p>Se connecter</p>
            </div>
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          </div>
        </div>
        <div class="navHeader">
          <span>Immobilier</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Véhicules</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Locations de vacances</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Emploi</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Mode</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Maison & Jardin</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Famille</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Electronique</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Loisirs</span>
          <font-awesome-icon :icon="['fas', 'circle']" />
          <span>Autres</span>
        </div>
      </div>
    </header>
  </main>
</template>
<style scoped>
header {
  margin-bottom: 30px;
}
header > div {
  border: solid red 1px;
  height: var(--headerHeight);
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.container > div {
  display: flex;
}
.container {
  width: auto 1050px;
  /* background-color: red; */
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
  width: 140px;
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
  cursor: pointer;
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
svg {
  font-size: 15px;
}
</style>
