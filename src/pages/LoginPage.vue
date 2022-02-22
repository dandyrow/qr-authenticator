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
            <span v-if="usernameErr">
              - Please enter your username
            </span>
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
            <span v-if="passwordErr">
              - Please enter your password
            </span>
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
import { Router, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IntroModal from '@/components/modals/IntroModal.vue';
import { fetchTokens } from '@/api/auth.api';

const store = useStore();
const router: Router = useRouter();

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

  const { accessToken, refreshToken } = await fetchTokens(username.value, password.value);

  if (username.value === 'dandyrow' && password.value === 'manbob') {
    router.replace('/tabs/scan');
  }
}
</script>
