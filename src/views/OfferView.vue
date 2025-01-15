<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  id: String,
})
const offerInfos = ref(null)
// console.log('offerview > ID>>>', props.id)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures&populate[1]=owner.avatar`,
    )
    console.log('Offerview data >>>', data.data.attributes)
    offerInfos.value = data.data
  } catch (error) {
    console.log('catch offerview', error)
  }
})
</script>

<template>
  <main>
    <p class="container" v-if="offerInfos === null">Chargement en Cours ...</p>
    <div class="container" v-else>
      <div>
        <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="product" />
        <p>{{ offerInfos.attributes.title }}</p>
        <p>{{ offerInfos.attributes.price }} €</p>
        <p>{{ offerInfos.attributes.publishedAt }}</p>
        <div>
          <h2>Description</h2>
          <p>{{ offerInfos.attributes.description }}</p>
        </div>
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        <span>Agon-Coutainville (50230)</span>
      </div>
      <div>
        <div>
          <img
            :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url"
            alt="avatar"
          />
          <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
        </div>
        <font-awesome-icon :icon="['fas', 'check-double']" />
        <p>Pièce d’identité vérifiée</p>
        <font-awesome-icon :icon="['far', 'clock']" />
        <p>Répond généralement en 1 heure</p>
        <div>
          <button>Acheter</button>
          <button>Message</button>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
img {
  height: 200px;
}
</style>
