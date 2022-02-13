<template>
  <ion-buttons slot="end">
    <ion-button id="trigger-button">
      <ion-icon
        slot="icon-only"
        :ios="ellipsisHorizontal"
        :md="ellipsisVertical"
      />
    </ion-button>
    <ion-popover trigger="trigger-button">
      <ion-list>
        <slot />
      </ion-list>
    </ion-popover>
  </ion-buttons>
</template>

<script setup lang="ts">
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { IonButtons, IonButton, IonIcon, IonPopover, IonList } from '@ionic/vue';
</script>
