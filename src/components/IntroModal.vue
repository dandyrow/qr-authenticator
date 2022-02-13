<template>
  <ion-modal :is-open="openIntro">
    <Toolbar
      page-title="Welcome!"
      button="close"
      :close-func="closeIntro"
    />
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

import Toolbar from './Toolbar.vue';

const store = useStore();

const openIntro = computed(() => {
  return !store.getters.hasSeenIntro;
});

function closeIntro() {
  store.commit('setSeenIntro', true);
}
</script>
