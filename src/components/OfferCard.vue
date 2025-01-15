<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  offerInfos: Object,
})
// console.log(props.offerInfos.attributes.owner.data)
const formatedDates = computed(() => {
  return props.offerInfos.attributes.publishedAt.split('T')[0].split('-').reverse().join('/')
})
</script>
<template>
  <RouterLink :to="{ name: 'offer', params: { id: offerInfos.id } }" class="offerCard">
    <div>
      <div class="ownerPart">
        <img
          :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url"
          alt="avatar"
          class="avatar"
          v-if="offerInfos.attributes.owner.data.attributes.avatar.data"
        />
        <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
      </div>

      <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
      <p>{{ offerInfos.attributes.title }}</p>
      <p>{{ offerInfos.attributes.price }} €</p>

      <div>
        <p class="date">{{ formatedDates }}</p>
        <font-awesome-icon :icon="['far', 'heart']" />
      </div>
    </div>
  </RouterLink>
</template>
<style scoped>
.offerCard {
  width: calc((100% - 60px) / 5);
}
.ownerPart {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
.ownerPart p {
  font-size: 14px;
  font-weight: bold;
}
.offerCard > div > img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 10px;
}
.offerCard > div > p {
  font-weight: bold;
  margin-bottom: 10px;
}

.offerCard > div > div {
  /* border: solid purple 1px; */
  display: flex;
  justify-content: space-between;
  color: var(--darkGrey);
}
.date {
  font-size: 12px;
}
.date + svg {
  font-size: 18px;
}
</style>
