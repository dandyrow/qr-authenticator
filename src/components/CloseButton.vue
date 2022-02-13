<template>
  <ion-buttons slot="end">
    <ion-button @click="emit('close')">
      <ion-icon
        slot="icon-only" 
        :icon="close" 
      />
    </ion-button>
  </ion-buttons>
</template>

<script setup lang="ts">
import { close } from 'ionicons/icons';
import { IonButtons, IonButton, IonIcon } from '@ionic/vue';

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>
