<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- <ion-buttons slot="start">
          <ion-back-button :default-href="defaultBackLink"></ion-back-button>
        </ion-buttons> -->
        <ion-title data-title="title">
          {{ pageTitle }}
        </ion-title>
        <!--3 dot menu with settigns about and logout-->
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from '@ionic/vue';

interface Props {
  pageTitle: string;
  defaultBackLink?: string;
  scanActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultBackLink: '',
  scanActive: false,
});
</script>

<style scoped>
.hide {
  visibility: hidden;
}
</style>