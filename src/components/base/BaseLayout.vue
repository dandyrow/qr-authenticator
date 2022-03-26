<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title data-title="title">
          {{ pageTitle }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content 
      :fullscreen="true" 
      :class="{ hide: scanActive }"
    >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ pageTitle }}
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/vue';

interface Props {
  pageTitle: string;
  scanActive?: Ref<boolean> | boolean | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  scanActive: false,
});
</script>

<style scoped>
.hide {
  visibility: hidden;
}
</style>
