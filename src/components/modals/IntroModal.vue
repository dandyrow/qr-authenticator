<template>
  <ion-modal :is-open="isOpen">
    <Toolbar page-title="Welcome!" button="close" :close-func="close" />
    <ion-content class="ion-padding">
      <p>
        Welcome to QR Authenticate! The purpose of this app is as part of the
        larger QR auth system. This app will be used to scan
      </p>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonContent } from '@ionic/vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

import Toolbar from '../Toolbar.vue';

const store = useStore();

const isOpen = computed(() => {
  return !store.getters.hasSeenIntro;
});

function close() {
  store.commit('setSeenIntro', true);
}
</script>
