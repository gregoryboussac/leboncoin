<script setup>
import HomeView from '@/views/HomeView.vue'
import BtnPublishOffer from './BtnPublishOffer.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <div class="TopPart">
        <RouterLink :to="{ name: 'home' }">
          <img src="/src/assets/logo/logo.svg" alt="logo" />
        </RouterLink>
        <div class="middlePart">
          <BtnPublishOffer />
          <div>
            <input type="text" name="search" id="search" placeholder="Rechercher sur leboncoin" />
            <font-awesome-icon :icon="['fas', 'search']" />
          </div>
        </div>

        <div class="connectionPart">
          <div>
            <font-awesome-icon :icon="['far', 'user']" />
            <p>Se connecter</p>
          </div>
          <!-- <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> -->
        </div>
      </div>
      <div class="BottomPart">
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
</template>

<style scoped>
header {
  height: var(--headerHeight);
  /* margin-bottom: 30px; */
  border-bottom: 1px grey solid;
}

.container > div {
  display: flex;
}
img {
  width: 140px;
}
/* --------TOP PART------------- */

.TopPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

/* --------MIDDLE PART------------- */

.middlePart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.middlePart > div {
  display: flex;
  align-items: center;
  background-color: var(--blueLight);
  border-radius: 10px;
  padding: 7px;
}
.middlePart > div > svg {
  background-color: var(--orange);
  color: white;
  padding: 7px;
  border-radius: 5px;
  box-sizing: content-box;
}
input {
  width: 250px;
  border: none;
  background-color: var(--blueLight);
}
input::placeholder {
  color: black;
}
input:focus {
  outline: none;
}
/* --------------------- */

.connectionPart > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.connectionPart svg {
  font-size: 18px;
}

/* --------BOTTOM PART------------- */

.BottomPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.BottomPart span {
  font-size: 14px;
}
.BottomPart svg {
  font-size: 3px;
}
</style>
