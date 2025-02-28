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
          cols="30"
          rows="10"
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
        <div class="priceBloc">
          <input type="number" name="price" id="price" v-model="price" @input="emptyErrorMessage" />
          <p>€</p>
        </div>

        <label class="fileInput" for="pictures">
          <font-awesome-icon :icon="['fas', 'camera']" />
          <span>Sélectionnez jusqu'à 10 photos </span>
        </label>
        <input type="file" name="pictures" id="pictures" multiple @input="selectPictures" />

        <div v-if="pictures" class="previews">
          <img v-for="url in imagesPreview" :src="url" alt="" />
        </div>

        <p v-if="isPublishing">Envoi en cours ...</p>
        <button>déposer mon annonce</button>
        <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--blueLight);
  padding: 40px 0;
}
.container {
  padding: 20px;
  background-color: white;
  border-radius: 20px;
}

h1 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
}
form {
  /* width: 770px; */
  display: flex;
  flex-direction: column;
}
label {
  margin: 30px 0 10px 0;
}
p {
  font-size: 12px;
  color: var(--medGrey);
  margin-top: 5px;
  width: 770px;
}

input,
textarea {
  border: 1px solid var(--medGrey);
  border-radius: 15px;
  width: 770px;
}
input[type='text'] {
  height: 45px;
}
.priceBloc {
  height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.priceBloc input {
  height: 100%;
  width: 190px;
  border: 1px solid var(--medGrey);
  border-radius: 15px 0 0 15px;
}
.priceBloc p {
  height: 100%;
  width: 45px;
  border: 1px solid var(--medGrey);
  border-left: none;
  border-radius: 0 15px 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  color: inherit;
  font-size: inherit;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox
input[type='number'] {
  -moz-appearance: textfield;
} */

input[type='file'] {
  display: none;
}
.fileInput {
  border: 1px solid black;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
  color: var(--blue);
}
.fileInput svg {
  font-size: 34px;
}
.fileInput span {
  text-align: center;
}
button {
  color: white;
  background-color: var(--orange);
  border-radius: 15px;
  padding: 10px 15px;
  border: none;
  align-self: flex-end;
  margin-top: 40px;
}
.previews {
  /* border: 1px solid black; */
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
}
.previews img {
  width: calc((100% - 40px) / 5);
  aspect-ratio: 1/1;
  border-radius: 10px;
  object-fit: cover;
}
.errorMessage {
  font-size: 16px;
  color: var(--orange);
  text-align: center;
}
</style>
