<script setup>
import { inject, ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const GlobalStore = inject('GlobalStore')
console.log(GlobalStore.userInfos.value)
const router = useRouter()

const title = ref('')
const description = ref('')
const price = ref(null)
const pictures = ref(null)

const isPublishing = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  isPublishing.value = true
  if (title.value && description.value && price.value && pictures.value) {
    const formData = new FormData()

    for (const key in pictures.value) {
      if (Object.hasOwnProperty.call(pictures.value, key)) {
        formData.append('files.pictures', pictures.value[key])
      }
    }

    const stringifiedInfos = JSON.stringify({
      title: title.value,
      description: description.value,
      price: price.value,
      owner: GlobalStore.userInfos.value.id,
    })

    console.log(stringifiedInfos)

    formData.append('data', stringifiedInfos)

    try {
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',

        formData,
        {
          headers: {
            Authorization: `Bearer  ${GlobalStore.userInfos.value.token}`,

            'Content-type': 'multipart/form-data',
          },
        },
      )
      console.log('response serveur>>', data)
      router.push({ name: 'offer', params: { id: data.data.id } })
    } catch (error) {
      console.log('catch error>>', error)
    }
    isPublishing.value = false
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
    isPublishing.value = false
  }
}

const imagesPreview = computed(() => {
  const tab = []
  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }
  return tab
})

const selectPictures = (event) => {
  errorMessage.value = ''

  const numOfFiles = event.target.files.length
  if (numOfFiles <= 10) {
    pictures.value = event.target.files
  } else {
    errorMessage.value = '10 photos maximum'
  }
}

const emptyErrorMessage = () => {
  errorMessage.value = ''
}
</script>
<template>
  <main>
    <div class="container">
      <h1>Déposer une annonce</h1>

      <form @submit.prevent="handleSubmit">
        <label for="title">Titre de l'annonce</label>
        <input type="text" name="title" id="title" v-model="title" @input="emptyErrorMessage" />

        <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici</p>

        <label for="description">Description de l'annonce</label>
        <textarea
          name="description"
          id="description"
          v-model="description"
          @input="emptyErrorMessage"
        ></textarea>
        <p>
          Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à
          ajouter tout élément permettant de prouver l'authenticité de votre article: numéro de
          série, facture, certificat, inscription de la marque sur l'article, emballage etc.
          Indiquez dans le texte de l'annonce si vous proposez un droit de retractation a
          l'acheteur. En L'absence de toute mention. L'acheteur n'en benenciera pas et ne pourra pas
          demander le remboursement ou l'échange du bien ou service proposé
        </p>

        <label for="price">Votre prix de vente</label>
        <div>
          <input type="number" name="price" id="price" v-model="price" @input="emptyErrorMessage" />
          <p>€</p>
        </div>

        <input type="file" name="pictures" id="pictures" multiple @input="selectPictures" />
        <div v-if="pictures">
          <img v-for="url in imagesPreview" :src="url" alt="" />
        </div>

        <p v-if="errorMessage">{{ errorMessage }}</p>

        <p v-if="isPublishing">Envoi en cours ...</p>
        <button>déposer mon annonce</button>
      </form>
    </div>
  </main>
</template>
<style scoped>
img {
  width: 300px;
}
</style>
