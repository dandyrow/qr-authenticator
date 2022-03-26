<template>
  <ion-modal :is-open="isOpen">
    <ion-toolbar>
      <ion-title data-title="title">
        Please set a PIN number
      </ion-title>
    </ion-toolbar>
    <ion-content>
      <PinPad
        pin-text="Please set a 4 digit PIN code"
        :error="false"
        @pin-entered="setPin"
      />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { useSettings } from '@/stores/settings.store';
import { IonModal, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import PinPad from '../PinPad.vue';

const props = defineProps<{
    isOpen: boolean,
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const settings = useSettings();

function setPin(pinNum: number) {
    settings.pin = pinNum;
    emits('close');
}
</script>
