<template>
  <BaseModal 
    modal-title="Welcome!" 
    :is-open="isOpen" 
    @close="close()"
  >
    <p>
      Welcome to QR Authenticate! The purpose of this app is as part of the
      larger QR auth system. This app will be used to scan
    </p>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import BaseModal from './BaseModal.vue';

const store = useStore();

const isOpen = computed(() => {
  return !store.getters.hasSeenIntro;
});

function close() {
  store.commit('setSeenIntro', true);
}
</script>
