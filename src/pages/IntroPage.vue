<template>
  <base-layout page-title="Intro" />
</template>

<script setup lang="ts">
import { onIonViewDidEnter } from '@ionic/vue';
import { useStore } from 'vuex';

const store = useStore();

onIonViewDidEnter(() => {
  store.commit('intro/setSeenIntro', true);
  console.log('set');
});
</script>
