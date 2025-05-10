<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { computed } from 'vue'
import { useCycleList, usePrevious } from '@vueuse/core'
import { RouterLink } from 'vue-router'

const props = defineProps({
  id: String,
})

const offerInfos = ref(null)
// console.log('offerview > ID>>>', props.id)

const formatedDate = computed(() => {
  return offerInfos.value.attributes.publishedAt.split('T')[0].split('-').reverse().join('/')
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures&populate[1]=owner.avatar`,
    )
    // console.log('Offerview data >>>', data.data.attributes)
    offerInfos.value = data.data
  } catch (error) {
    console.log('catch offerview', error)
  }
})

const cycleList = computed(() => {
  if (offerInfos.value.attributes.pictures.data) {
    const { state, next, prev } = useCycleList(offerInfos.value.attributes.pictures.data)
    return { state, next, prev }
  } else {
    return {}
  }
})
</script>

<template>
  <main>
    <p class="container" v-if="offerInfos === null">Chargement en Cours ...</p>
    <div class="container" v-else>
      <div class="leftCol">
        <div class="caroussel">
          <font-awesome-icon
            :icon="['fas', 'chevron-left']"
            @click="cycleList.prev()"
            v-if="offerInfos.attributes.pictures.data?.length > 1"
          />
          <img :src="cycleList.state.value.attributes.url" alt="product" />
          <font-awesome-icon
            :icon="['fas', 'chevron-right']"
            @click="cycleList.next()"
            v-if="offerInfos.attributes.pictures.data?.length > 1"
          />
        </div>
        <p class="title">{{ offerInfos.attributes.title }}</p>
        <p class="price">{{ offerInfos.attributes.price }} €</p>
        <p class="date">{{ formatedDate }}</p>

        <h2>Description</h2>

        <p>{{ offerInfos.attributes.description }}</p>

        <font-awesome-icon :icon="['fas', 'map-marker-alt']" /><span>
          Agon-Coutainville (50230)</span
        >
      </div>
      <div class="rightCol">
        <div class="owner">
          <div>
            <img
              v-if="offerInfos.attributes.owner.data.attributes.avatar.data"
              :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url"
              alt="avatar"
            />
            <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
          </div>
          <p class="identity">
            <font-awesome-icon :icon="['fas', 'check-double']" /> Pièce d’identité vérifiée
          </p>
          <p><font-awesome-icon :icon="['far', 'clock']" /> Répond généralement en 1 heure</p>
        </div>

        <div class="btnPart">
          <button>
            <RouterLink :to="{ name: 'payment', params: { id: offerInfos.id } }"
              >Acheter</RouterLink
            >
          </button>
          <button>Message</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--headerHeight) - var(--footerHeight));
}
.container {
  padding-top: 40px;
  /* border: solid 2px rgb(255, 0, 221); */
  display: flex;
  gap: 20px;
}

.leftCol {
  /* border: solid 1px red; */
  width: 65%;
}
.leftCol img {
  height: 350px;
  width: 100%;
  object-fit: contain;
  margin-bottom: 40px;
}
.caroussel {
  display: flex;
  align-items: center;
}
.caroussel svg {
  font-size: 18px;
  cursor: pointer;
}
.title {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
}
.price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.date {
  font-size: 12px;
  color: var(--darkGrey);
  margin-bottom: 50px;
}
h2 {
  border-top: 1px solid var(--medGrey);
  padding-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
}
h2 + p {
  padding-bottom: 50px;
  border-bottom: 1px solid var(--medGrey);
  margin-bottom: 20px;
}
/* _____RIGHT COL_________ */

.rightCol {
  /* border: solid 1px rgb(38, 0, 255); */
  width: 35%;
  height: 365px;
  flex-direction: column;
  box-shadow: 0px 0px 5px var(--medGrey);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.owner > div {
  /* border: solid 3px rgb(255, 221, 0); */
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.owner img {
  height: 65px;
  width: 65px;
  border-radius: 50%;
}
.owner > div > p {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}
.identity {
  color: var(--brown);
  background-color: var(--orangeLight);
  font-size: 12px;
  padding: 5px;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 20px;
}
.identity + p {
  font-size: 14px;
}
.btnPart {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

button {
  background-color: var(--orange);
  color: white;
  font-weight: bold;
  padding: 15px 0;
  border-radius: 15px;
  border: none;
  font-size: inherit;
}
button:last-child {
  background-color: var(--blue);
}
</style>
