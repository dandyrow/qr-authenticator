<template>
  <ion-modal :is-open="isOpen">
    <ion-toolbar>
      <ion-title data-title="title">
        {{ modalTitle }}
      </ion-title>
      <CloseButton @click="emits('close')" />
    </ion-toolbar>
    <ion-content>
      <slot />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import CloseButton from '../base/CloseButton.vue';

const props = defineProps<{ 
    modalTitle: string ,
    isOpen: boolean,
}>();

const emits = defineEmits<{(e: 'close'): void}>();
</script>
