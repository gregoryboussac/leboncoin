import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

/* Import de 'fontawesome core' */
import { library } from '@fortawesome/fontawesome-svg-core'

/* Import du composant 'vue-fontawesome' */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* Import des icônes de type 'solid' */
import {
  faCircle,
  faSearch,
  faSignOutAlt,
  faMapMarkerAlt,
  faCheckDouble,
  faChevronRight,
  faChevronLeft,
  faAsterisk,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

/* Import de l'icône de type 'regular' */
import {
  faPlusSquare,
  faUser,
  faHeart,
  faClock,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-regular-svg-icons'

/* Import d'icône de type 'brand' */

/* Ajout de ces icônes à la bibliothèque de votre projet */
library.add(
  faPlusSquare,
  faUser,
  faSearch,
  faSignOutAlt,
  faCircle,
  faHeart,
  faMapMarkerAlt,
  faCheckDouble,
  faClock,
  faChevronRight,
  faChevronLeft,
  faAsterisk,
  faEyeSlash,
  faArrowRight,
  faEye,
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
/* Indique à l'instance Vue.js quelle va utiliser le composant vue-fontawesome */

app.use(router)

const userToken = ref('')
const userName = ref('')

const changeToken = (token) => {
  userToken.value = token
}
const changeUserName = (username) => {
  userName.value = username
}

app.provide('GlobalStore', {
  userToken: userToken,
  userName: userName,
  changeToken: changeToken,
  changeUserName: changeUserName,
})

app.mount('#app')
