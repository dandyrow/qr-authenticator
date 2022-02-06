<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- <ion-buttons slot="start">
          <ion-back-button :default-href="defaultBackLink"></ion-back-button>
        </ion-buttons> -->
        <ion-title data-title="title">{{ pageTitle }}</ion-title>
        <!--3 dot menu with settigns about and logout-->
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" v-show="!scanActive">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ pageTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <slot></slot>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from '@ionic/vue';

export default defineComponent({
  name: 'BaseLayout',

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },

  props: {
    pageTitle: {
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
});
</script>
