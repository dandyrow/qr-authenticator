<template #buttons>
  <ion-buttons slot="end">
    <ion-button>
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
</script>
