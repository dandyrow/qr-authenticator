<template>
  <BaseLayout page-title="Login">
    <form
      class="ion-padding"
      @submit.prevent="submit"
    >
      <ion-list>
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
      </ion-button>
    </form>
    <IntroModal />
  </BaseLayout>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
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

const authStore = useAuth();
const router: Router = useRouter();
const route: RouteLocationNormalizedLoaded = useRoute();

const username = ref<string>('');
const usernameErr = ref<boolean>(false);
const password = ref<string>('');
const passwordErr = ref<boolean>(false);

async function submit() {
  usernameErr.value = username.value === '';
  passwordErr.value = password.value === '';

  if (usernameErr.value || passwordErr.value) {
    return;
  }

  try {
    const res = await login(username.value, password.value);
    const { accessToken } = await res.json();
    authStore.setAccessToken(accessToken);

    const redirectPath = route.query.redirect?.toString() ?? '/tabs/scan';
    router.replace(redirectPath);
  } catch (err) {
    console.error(`Error logging in: ${err}`);
  }
}
</script>
