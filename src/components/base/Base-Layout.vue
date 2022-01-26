<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="defaultBackLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
        <!--3 dot menu with settigns about and logout-->
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-bind:class="{ 'scan-active': scanActive }">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/vue';

export default defineComponent({
  name: "Base-Layout",

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    defaultBackLink: {
      type: String,
      default: '',
    },
    scanActive: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return;
  },
},);
</script>

<style scoped>
.scan-active {
  visibility: hidden;
}
</style>