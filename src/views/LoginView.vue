<script setup>
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, inject } from 'vue'

const email = ref('')
const password = ref('')

const isSubmitting = ref(false)
const errorMessage = ref('')

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const cleanErrorMessage = () => {
  errorMessage.value = ''
}

const handleSubmit = async () => {
  // console.log('données utilsataeur >>>', { email: email.value, password: password.value })
  if (email.value && password.value) {
    isSubmitting.value = true
    try {
      const { data } = await axios.post(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local`,
        { identifier: email.value, password: password.value },
      )
      // console.log('réponse serveur>>>> ', data)

      GlobalStore.changeToken(data.jwt)
      GlobalStore.changeUserName(data.user.username)

      router.push({ name: 'home' })
      router
    } catch (error) {
      // console.log('message erreur serveur>>>', error.response.data.error)
      errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
    }
    isSubmitting.value = false
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Bonjour !</h1>
      <h2>Connectez-vous pour découvrir toutes nos fonctionnalités.</h2>

      <form @submit.prevent="handleSubmit">
        <div class="container">
          <label for="email"> E-mail <sup>*</sup> </label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              @input="cleanErrorMessage"
            />
          </div>
        </div>

        <div>
          <label for="password"> Mot de passe <sup>*</sup> </label>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              @input="cleanErrorMessage"
            />
            <font-awesome-icon :icon="['far', 'eye-slash']" />
            <font-awesome-icon :icon="['far', 'eye']" />
          </div>
        </div>
        <p v-if="isSubmitting">Connexion en cours...</p>
        <button v-else>Se connecter <font-awesome-icon :icon="['fas', 'arrow-right']" /></button>
        <p>{{ errorMessage }}</p>

        <p>Envie de nous rejoindre ?</p>
        <RouterLink :to="{ name: 'signup' }">
          <span>Créer un compte</span>
        </RouterLink>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--headerHeight) - var(--footerHeight));
}
</style>
