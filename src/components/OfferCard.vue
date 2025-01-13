<script setup>
const props = defineProps({
  offerInfos: Object,
})
console.log(props.offerInfos.attributes.owner.data)
</script>
<template>
  <div>
    <div>
      <img
        :src="offerInfos.attributes.owner.data.attributes.avatar.data.attributes.url"
        alt="avatar"
        class="avatar"
      />
      <p>{{ offerInfos.attributes.owner.data.attributes.username }}</p>
    </div>
    <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
    <p>{{ offerInfos.attributes.title }}</p>
    <p>{{ offerInfos.attributes.price }} €</p>
    <div>
      <p>{{ offerInfos.attributes.publishedAt }}</p>
      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </div>
</template>
<style scoped>
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
img {
  width: 150px;
  height: 200px;
  object-fit: cover;
}
</style>
