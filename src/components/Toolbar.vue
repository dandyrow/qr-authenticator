<template>
  <ion-toolbar>
    <ion-title data-title="title">
      {{ pageTitle }}
    </ion-title>
    <ElipsesMenu v-if="button === 'menu'" />
    <CloseButton 
      v-if="button === 'close'" 
      @close="closeFunc()" 
    />
  </ion-toolbar>
</template>

<script setup lang="ts">
import { IonToolbar, IonTitle } from '@ionic/vue';

import ElipsesMenu from './ElipsesMenu.vue';
import CloseButton from './CloseButton.vue';

interface Props {
  pageTitle: string;
  button?: 'close' | 'menu';
  closeFunc?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  button: undefined,
  closeFunc: () => {
    console.error('Close function not handed into Toolbar component!');
  },
});
</script>
