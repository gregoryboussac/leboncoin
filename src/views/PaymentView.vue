<script setup>
import { onMounted, ref, computed, onBeforeMount, inject } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import { errorMessages } from 'vue/compiler-sfc'

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const isLoading = ref(true)
const offerInfos = ref(null)
const option = ref('faceToFace')
const cardElement = ref(null)
const isProcessing = ref(false)
const errorMessage = ref('')

const firstname = ref('')
const lastname = ref('')
const phone = ref('')

const stripePromise = loadStripe(
  'pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP',
)
const props = defineProps({
  id: String,
})

onBeforeMount(async () => {
  const stripe = await stripePromise

  const elements = stripe.elements()
  cardElement.value = elements.create('card')
  cardElement.value.mount('#card-element')
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures`,
    )
    // console.log(data)
    offerInfos.value = data.data
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
})

const total = computed(() => {
  let optionPrice = 0
  if (option.value === 'delivery') {
    optionPrice = 15.6
  }
  return 0.99 + optionPrice + offerInfos.value.attributes.price
})

const handlePayment = async () => {
  if (!firstname.value || !lastname.value) {
    return (errorMessage.value = 'Veuillez rentrer vos nom et prénom')
  }
  isProcessing.value = true
  try {
    const stripe = await stripePromise

    const { token } = await stripe.createToken(cardElement.value)
    const stripeToken = token.id

    const { data } = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/buy',
      {
        title: offerInfos.value.attributes.title,
        amount: total.value,
        token: stripeToken,
      },
      { headers: { Authorization: `Bearer ${GlobalStore.userInfos.value.token} ` } },
    )
    console.log('date - payment>>>', data)

    if (data.status === 'succeeded') {
      alert(
        `Paiement de ${total.value} € validé pour l'achat du poduit ${offerInfos.value.attributes.title} par ${firstname.value} ${lastname.value} `,
      )
      router.replace({ name: 'home' })
    }
  } catch (error) {
    console.log(error.response)
  }
  isProcessing.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>
      <div>
        <div class="firstCol">
          <div>
            <h2>Informations personnelles</h2>
            <p>Une pièce d'identité vous sera demandée pour récupérer votre colis.</p>

            <label for="firstname">Prénom :</label
            ><input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Prénom"
              v-model="firstname"
              @input="errorMessage = ''"
            />

            <label for="lastname">Nom:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Nom"
              v-model="lastname"
              @input="errorMessage = ''"
            />

            <label for="phone">Téléphone :</label>
            <input type="text" id="phone" name="phone" placeholder="Téléphone" v-model="phone" />

            <p>recevoir un SMS pour l'arivée de votre colis ou votre code de locker</p>
          </div>

          <p>
            Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
            commande.
          </p>

          <div>
            <h2>Coordonnées bancaires</h2>

            <div id="card-element"></div>

            <button @click="handlePayment" :disabled="isProcessing">payer</button>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <p>
              Paiement sécurisé Votre banque peut vous demander d'autoriser le paiement pour
              compléter votre achat.
            </p>
            <p>
              Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss de
              nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
            </p>
          </div>
        </div>

        <p v-if="isLoading">Chargement en cours ...</p>
        <div v-else class="secondCol">
          <div>
            <img :src="offerInfos.attributes.pictures.data[0].attributes.url" alt="" />
            <h3>{{ offerInfos.attributes.title }}</h3>

            <p>{{ offerInfos.attributes.price }} €</p>
          </div>

          <div>
            <h3>Mode de paiement</h3>

            <div>
              <input
                type="radio"
                name="faceToFace"
                id="faceToFace"
                value="faceToFace"
                v-model="option"
              />
              <label for="faceToFace">
                <p>Remise en main propre</p>
                <p>Payez en ligne et récupérez votre achat en main</p>
                <p>propre lors de votre rendez-vous avec le vendeur</p>
              </label>
            </div>

            <div>
              <input type="radio" name="delivery" id="delivery" value="delivery" v-model="option" />
              <label for="delivery">
                <p>Colissimo</p>
                <p>à votre domicile sous 2-3 jours</p>
              </label>

              <p>15,60 €</p>
            </div>

            <div>
              <h4>Protection leboncoin</h4>
              <p>0,99 €</p>
            </div>

            <p>
              <font-awesome-icon :icon="['fas', 'check']" /><span
                >Votre argent est sécurisé et versé au bon moment</span
              >
            </p>
            <p>
              <font-awesome-icon :icon="['fas', 'check']" /><span
                >Notre service client dedié vous accompagne</span
              >
            </p>
          </div>

          <div>
            <h2>Total</h2>

            <p>{{ total }} €</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - var(--headerHeight) - var(--footerHeight));
}
.container > div {
  display: flex;
  gap: 20px;
}
/* ___________FIRST COL */

/* ___________SECOND COL */
.secondCol > div:first-child img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
