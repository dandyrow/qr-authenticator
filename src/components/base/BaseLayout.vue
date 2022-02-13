<template>
  <ion-page>
    <ion-header>
      <Toolbar 
        :page-title="pageTitle" 
        :button="toolbarButton" 
      />
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
import Toolbar from '../Toolbar.vue';

interface Props {
  pageTitle: string;
  toolbarButton?: 'close' | 'menu';
  scanActive?: Ref<boolean> | boolean | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  toolbarButton: undefined,
  scanActive: false,
});
</script>

<style scoped>
.hide {
  visibility: hidden;
}
</style>