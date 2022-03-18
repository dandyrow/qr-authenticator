<template>
  <BaseModal 
    modal-title="Authenticating..." 
    :is-open="isOpen" 
    @close="closeModal"
  >
    <PinPad
      v-if="authenticating"
      @pin-entered="checkPin"
    />
    <AuthResult
      v-else
      :success="authSuccess"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import { AvailableResult, NativeBiometric } from 'capacitor-native-biometric';

import PinPad from '../PinPad.vue';
import BaseModal from './BaseModal.vue';
import AuthResult from '../AuthResult.vue';
import { postAuthSuccess } from '@/api/auth.api';

const props = defineProps<{
  isOpen: boolean;
  qrContent: string;
}>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const authenticating = ref(true);
const authSuccess = ref(false);
const title = ref('Authenticate');
const { isOpen } = toRefs(props);

const biometricOptions = {
  reason: 'To prove users identity',
  title: 'Authenticate to log in',
  description: 'Use biometrics to log into the remote computer',
  negativeButtonText: 'Use Passcode',
};

//ISSUE: breaks when using back button to close modal. Need back button handler
function closeModal() {
  emits('close');
  authenticating.value = true;
}

function checkPin(pinNum: number) {
  if (pinNum === 1234) {
    authenticating.value = false;
    authSuccess.value = true;
  } else {
    //TODO: Needs changed to show error about pin being wrong instead of complete auth failure
    authenticating.value = false;
    authSuccess.value = false;
  }
}

async function biometrics() {
  const result: AvailableResult = await NativeBiometric.isAvailable();
  const isAvailable: boolean = result.isAvailable;

  if (isAvailable) {
    await NativeBiometric.verifyIdentity(biometricOptions).then(() => {

      authenticating.value = false;
      authSuccess.value = true;
    });
  }
}

async function sendAuth(qrContent: string) {
  const res = await postAuthSuccess(qrContent);
  if (res.ok) {
    authenticating.value = false;
    authSuccess.value = true;
    return;
  }
  authenticating.value = false;
  authSuccess.value = false;
}

watch(isOpen, (newValue, _) => {
  if (newValue === true) {
    biometrics();
  }
});
</script>
