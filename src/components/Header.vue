<script setup>
import HomeView from '@/views/HomeView.vue'
import BtnPublishOffer from './BtnPublishOffer.vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { inject, ref } from 'vue'

const GlobalStore = inject('GlobalStore')
// console.log('retour globalStore >>>', GlobalStore.userToken)
const route = useRoute()
const router = useRouter()
const search = ref('')

const disconnetUser = () => {
  GlobalStore.changeUserInfos(null)
  $cookies.remove('userInfos')
}

const handleSubmit = () => {
  console.log('handlesubmitsearch >>>', search.value, route.query)

  const queries = { ...route.query }
  if (search.value) {
    queries.title = search.value
  } else {
    delete queries.title
  }

  queries.page = 1
  router.push({ name: 'home', query: queries })
}
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

          <form @submit.prevent="handleSubmit">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Rechercher sur leboncoin"
              v-model="search"
            />
            <button>
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </form>
        </div>

        <div class="connectionPart">
          <RouterLink :to="{ name: 'login' }" v-if="!GlobalStore.userInfos.value">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>Se connecter</p>
          </RouterLink>

          <div v-else class="disconnectPart">
            <div>
              <font-awesome-icon :icon="['far', 'user']" />
              <p>{{ GlobalStore.userInfos.value.username }}</p>
            </div>
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" @click="disconnetUser" />
          </div>
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
  position: fixed;
  top: 0px;
  width: 100%;
  background-color: white;
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
.middlePart > form {
  display: flex;
  align-items: center;
  background-color: var(--blueLight);
  border-radius: 10px;
  padding: 7px;
}
.middlePart > form svg {
  background-color: var(--orange);
  color: black;
  padding: 7px;
  border-radius: 5px;
  box-sizing: content-box;
}
.middlePart > form button {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
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

.connectionPart > a {
  /* border: solid 3px rgb(255, 225, 0);
  background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.connectionPart svg {
  font-size: 18px;
}
/* --------------------- */
.disconnectPart {
  display: flex;
  gap: 20px;
  align-items: center;
}
.disconnectPart > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
