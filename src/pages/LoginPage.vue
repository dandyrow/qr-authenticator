<template>
  <BaseLayout page-title="Login">
    <form
      class="ion-padding"
      @submit.prevent="submit"
    >
      <ion-list>
        <ion-text color="danger">
          <p
            v-if="error"
            style="padding-left: 1em;"
          >
            {{ error }}
          </p>
        </ion-text>
        <ion-item>
          <ion-label
            :color="usernameErr ? 'danger' : ''"
            position="floating"
          >
            Username
            <span v-if="usernameErr"> - Please enter your username </span>
          </ion-label>
          <ion-input v-model="username" />
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-item>
          <ion-label
            :color="passwordErr ? 'danger' : ''"
            position="floating"
          >
            Password
            <span v-if="passwordErr"> - Please enter your password </span>
          </ion-label>
          <ion-input
            v-model="password"
            type="password"
          />
        </ion-item>
      </ion-list>
      <ion-button
        type="submit"
        expand="full"
        :disabled="username === '' || password === ''"
      >
        Login
        <ion-icon
          slot="end"
          :icon="enterOutline"
        />
      </ion-button>
    </form>
    <IntroModal />
    <PinSetModal
      :is-open="needToSetPin"
      @close="closePinSetModal()"
    />
  </BaseLayout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonText, IonIcon } from '@ionic/vue';
import { enterOutline } from 'ionicons/icons';
import { ref } from 'vue';
import {
  RouteLocationNormalizedLoaded,
  Router,
  useRoute,
  useRouter,
} from 'vue-router';

import IntroModal from '@/components/modals/IntroModal.vue';
import { login } from '@/api/auth.api';
import { useAuth } from '@/stores/auth.store';
import { useSettings } from '@/stores/settings.store';
import PinSetModal from '@/components/modals/PinSetModal.vue';

const auth = useAuth();
const settings = useSettings();
const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

const username = ref<string>('');
const usernameErr = ref<boolean>(false);
const password = ref<string>('');
const passwordErr = ref<boolean>(false);
const error = ref<string>('');

const needToSetPin = ref<boolean>(false);

function closePinSetModal() {
  needToSetPin.value = false;
  const redirectPath = route.query.redirect?.toString() ?? '/tabs/scan';
  router.replace(redirectPath);
}

async function submit() {
  usernameErr.value = username.value === '';
  passwordErr.value = password.value === '';

  if (usernameErr.value || passwordErr.value) {
    return;
  }

  try {
    const res = await login(username.value, password.value);

    if (!res) {
      error.value =
        'Error communicating with the server. Please try again later';
      return;
    } else if (!res.ok) {
      error.value = 'Incorrect username or password';
      return;
    }

    const { accessToken } = await res.json();
    auth.setAccessToken(accessToken);

    if (settings.pin === 0) {
      needToSetPin.value = true;
      return;
    }

  } catch (err) {
    console.error(`Error logging in: ${err}`);
    error.value = 'Error communicating with the server. Please try again later';
  }
}
</script>
