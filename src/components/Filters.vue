<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['sort', 'pricemin', 'pricemax'])
// console.log('props>>>', props)

const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref(props.sort)

const handleSubmit = () => {
  const queries = { ...props }
  if (priceMin.value) {
    queries.pricemin = priceMin.value
  } else {
    delete queries.pricemin
  }

  if (priceMax.value) {
    queries.pricemax = priceMax.value
  } else {
    delete queries.pricemax
  }
  if (sort.value) {
    queries.sort = sort.value
  } else {
    delete queries.sort
  }

  // penser a revenir à un poru la page
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>Prix</div>
    <div>
      <input
        type="number"
        name="priceMin"
        id="priceMin"
        placeholder="Minimum"
        min="0"
        v-model="priceMin"
      />
      <label for="priceMin"> €</label>
    </div>
    <div>
      <input
        type="number"
        name="priceMax"
        id="priceMax"
        placeholder="Maximum"
        v-model="priceMax"
        :min="priceMin"
      />
      <label for="priceMax"> €</label>
    </div>

    <div>
      <p>Tri</p>
      <div>
        <label>
          Prix croissants
          <input type="radio" value="price:asc" id="priceAsc" v-model="sort" />
        </label>
        <label>
          Prix décroissants
          <input type="radio" value="price:desc" id="pricedesc" v-model="sort" />
        </label>
        <label>
          Pas de tri
          <input type="radio" value="none" id="noSort" v-model="sort" />
        </label>
      </div>
    </div>
    <button>Rechercher</button>
  </form>
</template>
<style scoped>
form {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}
</style>
