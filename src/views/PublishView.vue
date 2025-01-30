<script setup>
import { inject, ref } from 'vue'
import axios from 'axios'

const GlobalStore = inject('GlobalStore')
console.log(GlobalStore.userInfos.value.token)

const title = ref('')
const descrption = ref('')
const price = ref('')
const pictures = ref(null)

const isPublishing = ref(false)

const handleSubmit = async () => {
  isPublishing.value = true

  const formData = new FormData()
  formData.append('files.pictures', pictures.value)

  const stringifiedInfos = JSON.stringify({
    title: title.value,
    descrption: descrption.value,
    price: price.value,
  })
  formData.append('data', stringifiedInfos)
  try {
    const response = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
      formData,
      {
        headers: {
          Authorization: 'Bearer' + GlobalStore.userInfos.value.token,
          'Content-type': 'multipart/form-data',
        },
      },
    )
    console.log('response>>', response)
  } catch (error) {
    console.log('catch error>>', error)
  }
  isPublishing.value = false
}
</script>
<template>
  <main>
    <h1>Déposer une annonce</h1>
    <p v-if="isPublishing">Envoi en cours ...</p>
    <form @submit.prevent="handleSubmit" v-else>
      <label for="title">Titre de l'annonce</label>
      <input type="text" name="title" id="title" v-model="title" />
      <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici</p>
      <label for="descrption">Descrption de l'annonce</label>
      <textarea name="descrption" id="descrption" v-model="descrption"></textarea>
      <p>
        Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à ajouter
        tout élément permettant de prouver l'authenticité de votre article: numéro de série,
        facture, certificat, inscription de la marque sur l'article, emballage etc. Indiquez dans le
        texte de l'annonce si vous proposez un droit de retractation a l'acheteur. En L'absence de
        toute mention. L'acheteur n'en benenciera pas et ne pourra pas demander le remboursement ou
        l'échange du bien ou service proposé
      </p>
      <label for="price">Votre prix de vente</label>
      <input type="number" name="price" id="price" v-model="price" />
      <label for="pictures">Ajoutez des photos</label>
      <input
        type="file"
        name="pictures"
        id="pictures"
        @input="(event) => (pictures = event.target.files[0])"
      />
      <button>déposer mon annonce</button>
    </form>
  </main>
</template>
<style></style>
