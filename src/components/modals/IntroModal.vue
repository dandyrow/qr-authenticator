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

import BaseModal from './BaseModal.vue';
import { useSettings } from '@/stores/settings.store';

const settingsStore = useSettings();

const isOpen = computed(() => {
  return !settingsStore.seenIntro;
});

function close() {
  settingsStore.seenIntro = true;
}
</script>
