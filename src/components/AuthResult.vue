<template>
  <div class="container">
    <ion-icon
      :icon="success ? checkmarkCircle : closeCircle"
      :style="{ color: success ? 'greenyellow' : 'red' }"
    />
    <h1>{{ success ? successHeading : failuresHeading }}</h1>
    <ion-label>{{ success ? successSubText : failureSubText }}</ion-label>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonLabel } from '@ionic/vue';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

const props = defineProps<{ success: boolean }>();
const successHeading = 'Authentication Success';
const failuresHeading = 'Authentication Failed';
const successSubText =
  'Please press enter on your computer to continue logging in.';
const failureSubText =
  'This could be because you don\'t have access to the computer you\'re trying to log into.';
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
}

ion-icon {
  margin: 4rem auto 0 auto;
  width: 50%;
  height: 50%;
  aspect-ratio: 1/1;
}

ion-label {
  margin: 0 20%;
}
</style>
