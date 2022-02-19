<template>
  <div class="pin-container">
    <ion-label id="pin-label">
      Please enter your PIN or use biometrics
    </ion-label>

    <div class="pin-display">
      <ion-icon :icon="pin.length > 0 ? radioButtonOn : radioButtonOff" />
      <ion-icon :icon="pin.length > 1 ? radioButtonOn : radioButtonOff" />
      <ion-icon :icon="pin.length > 2 ? radioButtonOn : radioButtonOff" />
      <ion-icon :icon="pin.length > 3 ? radioButtonOn : radioButtonOff" />
    </div>

    <div class="button-grid">
      <slot />
      <ion-button
        v-for="(button, index) in buttons"
        :key="index"
        fill="outline"
        color="white"
        shape="round"
        size="large"
        @click="enterNum(button)"
      >
        {{ button }}
      </ion-button>
      <ion-button
        id="zero"
        fill="outline"
        color="white"
        shape="round"
        size="large"
        @click="enterNum(0)"
      >
        0
      </ion-button>
      <ion-button
        fill="clear"
        color="white"
        shape="round"
        size="large"
        class="ion-no-padding"
        @click="pin.pop()"
      >
        <ion-icon slot="icon-only" :icon="backspaceOutline" />
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonIcon, IonLabel } from '@ionic/vue';
import {
  backspaceOutline,
  radioButtonOn,
  radioButtonOff,
} from 'ionicons/icons';

const emits = defineEmits<{
    (e: 'pinEntered'): void
}>();

const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3];
const pin = ref<Array<number>>([]);

function enterNum(num: number) {
  const length = pin.value.push(num);
  if (length === 4) {
      emits('pinEntered');
  }
}
</script>

<style scoped>
.pin-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

#pin-label {
  width: 12.4rem;
  margin: 3rem auto 0 auto;
  text-align: center;
  font-size: 1.1rem;
}

.pin-display {
  margin: 1.5rem auto;
  font-size: large;
}

.pin-display > ion-icon {
  margin: 0 0.2rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(4, auto);
  gap: 2rem;
  margin: 0 auto;
}

.button-grid > ion-button {
  font-size: x-large;
}

#zero {
  grid-column: 2;
}
</style>
