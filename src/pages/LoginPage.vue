<template>
  <BaseLayout page-title="Login">
    <form
      class="ion-padding"
      @submit.prevent="login"
    >
      <ion-list>
        <ion-item>
          <ion-label
            :color="formInput.usernameErr ? 'danger' : ''"
            position="floating"
          >
            Username
            <span v-if="formInput.usernameErr">
              - Please enter your username
            </span>
          </ion-label>
          <ion-input v-model="formInput.username" />
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-item>
          <ion-label
            :color="formInput.passwordErr ? 'danger' : ''"
            position="floating"
          >
            Password
            <span v-if="formInput.passwordErr">
              - Please enter your password
            </span>
          </ion-label>
          <ion-input
            v-model="formInput.password"
            type="password"
          />
        </ion-item>
      </ion-list>
      <ion-button
        type="submit"
        expand="full"
        :disabled="formInput.username === '' || formInput.password === ''"
      >
        Login
      </ion-button>
    </form>
  </BaseLayout>
  <IntroModal />
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { reactive, toRefs } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IntroModal from '@/components/IntroModal.vue';

interface FormInput {
  username: string;
  usernameErr: boolean;
  password: string;
  passwordErr: boolean;
}

const store = useStore();
const router: Router = useRouter();

const formInput = reactive<FormInput>({
  username: '',
  usernameErr: false,
  password: '',
  passwordErr: false,
});

const login = async () => {
  const { username, usernameErr, password, passwordErr } = toRefs(formInput);

  usernameErr.value = username.value === '';
  passwordErr.value = password.value === '';

  if (usernameErr.value || passwordErr.value) {
    return;
  }

  if (username.value === 'dandyrow' && password.value === 'manbob') {
    router.push('/tabs/scan');
  }
};
</script>
