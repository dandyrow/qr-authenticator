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
    sendAuth();
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
    await NativeBiometric.verifyIdentity(biometricOptions).then(() => sendAuth());
  }
}

async function sendAuth() {
  try {
    console.log(props.qrContent);
    const res = await postAuthSuccess(props.qrContent);
    console.log(res);
    if (res && res.ok) {
      authenticating.value = false;
      authSuccess.value = true;
      return;
    }
    throw new Error('Authentication rejected');
  } catch (err) {
    console.error(err);
    authenticating.value = false;
    authSuccess.value = false;
  }
}

watch(isOpen, (newValue, _) => {
  if (newValue === true) {
    biometrics();
  }
});
</script>
