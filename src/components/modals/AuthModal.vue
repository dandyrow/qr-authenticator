<template>
  <ion-modal :is-open="isOpen">
    <Toolbar
      :page-title="title"
      button="close"
      :close-func="() => emits('close')"
    />
    <ion-content>
      <PinPad @pin-entered="() => emits('close')" />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import { IonModal, IonContent } from '@ionic/vue';

import Toolbar from '../Toolbar.vue';
import PinPad from '../PinPad.vue';
import { AvailableResult, NativeBiometric } from 'capacitor-native-biometric';

const props = defineProps<{
  isOpen: boolean;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

//TODO: Check pin & do stuff after auth with pin or biometrics

const title = ref('Authenticate');
const { isOpen } = toRefs(props);

const biometricOptions = {
  reason: 'To prove users identity',
  title: 'Authenticate to log in',
  description: 'Use biometrics to log into the remote computer',
  negativeButtonText: 'Use Passcode',
};

async function biometrics() {
    const result: AvailableResult = await NativeBiometric.isAvailable();
    const isAvailable: boolean = result.isAvailable;

    if (isAvailable) {
        await NativeBiometric.verifyIdentity(biometricOptions).then(
            () => emits('close'),
        );
    }
}

watch(isOpen, (newValue, _) => {
    if (newValue === true) {
        biometrics();
    }
});
</script>
