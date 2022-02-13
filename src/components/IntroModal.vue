<template>
  <ion-modal :is-open="openIntro">
    <ion-toolbar>
      <ion-title>Intro Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeIntro()">
          <ion-icon
            slot="icon-only"
            :icon="close"
          />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-content class="ion-padding">
      <p>Welcome to QR Authenticate! The purpose of this app is as part of the larger QR auth system. This app will be used to scan </p>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonModal,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/vue';
import { close } from 'ionicons/icons';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const openIntro = computed(() => {
  return !store.getters.hasSeenIntro;
});

function closeIntro() {
  store.commit('setSeenIntro', true);
}
</script>
