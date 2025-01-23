<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')

const isSubmitting = ref(false)
const errorMessage = ref('')

const GlobalStore = inject('GlobalStore')
const router = useRouter()

// console.log('Globalstore>>>', GlobalStore)

const cleanErrorMessage = () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

const handleSubmit = async () => {
  // console.log('submit ==>', {
  //   username: username.value,
  //   email: email.value,
  //   password: password.value,
  // })
  if (username.value && email.value && password.value) {
    isSubmitting.value = true
    try {
      const { data } = await axios.post(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register`,
        { username: username.value, password: password.value, email: email.value },
      )
      // console.log('réponse >>>> ', data)
      // console.log('JWT token >>>> ', data.jwt)

      GlobalStore.changeToken(data.jwt)
      GlobalStore.changeUserName(data.user.username)

      router.push({ name: 'home' })
    } catch (error) {
      // console.log('retour erreur serveur>>>', error.response.data.error)
      errorMessage.value = 'Une erreur est survenue'
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
      <form @submit.prevent="handleSubmit">
        <h1>Bonjour !</h1>
        <h2>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</h2>

        <label for="username">Nom <sup>*</sup></label>
        <input
          type="text"
          name="username"
          id="username"
          v-model="username"
          @input="cleanErrorMessage"
        />

        <label for="email">E-mail <sup>*</sup></label>
        <input type="email" name="email" id="email" v-model="email" @input="cleanErrorMessage" />

        <label for="password">Mot de passe <sup>*</sup></label>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            @input="cleanErrorMessage"
          />
          <font-awesome-icon :icon="['far', 'eye-slash']" />
        </div>

        <p v-if="isSubmitting">Inscription en cours ...</p>
        <button v-else>S'inscrire <font-awesome-icon :icon="['fas', 'arrow-right']" /></button>
        <p v-if="errorMessage">{{ errorMessage }}</p>

        <!-- {{ response.data.data.jwt }} -->
        <p>Vous avez déjà un compte ?</p>
        <RouterLink :to="{ name: 'login' }">
          <span>Connectez-vous</span>
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
