<template>
  <BaseModal 
    modal-title="Authenticating..." 
    :is-open="isOpen" 
    @close="closeModal()"
  >
    <PinPad @pin-entered="closeModal()" />
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import { AvailableResult, NativeBiometric } from 'capacitor-native-biometric';

import PinPad from '../PinPad.vue';
import BaseModal from './BaseModal.vue';

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

function closeModal() {
  emits('close');
}

async function biometrics() {
  const result: AvailableResult = await NativeBiometric.isAvailable();
  const isAvailable: boolean = result.isAvailable;

  if (isAvailable) {
    await NativeBiometric.verifyIdentity(biometricOptions).then(() =>
      closeModal(),
    );
  }
}

watch(isOpen, (newValue, _) => {
  if (newValue === true) {
    biometrics();
  }
});
</script>
