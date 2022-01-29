<template>
    <base-layout pageTitle="Login">
      <form class="ion-padding" @submit.prevent="login">
        <ion-list>
            <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" v-model="userDetails.email"></ion-input>
            </ion-item>
        </ion-list>
        <ion-list>
            <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input type="password" v-model="userDetails.password"></ion-input>
            </ion-item>
        </ion-list>
        <ion-button type="submit" expand="full">Login</ion-button>
    </form>
    </base-layout>
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent  } from 'vue';
import { Router, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: "LoginPage",

  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  },

  setup() {
    const store = useStore();
    const router: Router = useRouter();

    const userDetails = {
      email: '',
      password: '',
    };

    const login = async () => {
      if (userDetails.email && userDetails.password) {
        await store.dispatch('auth/login', userDetails);
        if (store.state.authenticated) {
          router.replace({ path: '/tabs/scan' });
        } else {
          alert("Login Failed");
        }
      }
    };

    return {
      userDetails,
      login,
    };
  },
});
</script>
