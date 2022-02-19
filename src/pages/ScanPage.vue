<template>
  <BaseLayout
    page-title="Scan QR"
    toolbar-button="menu"
    :scan-active="qrScanner.scanActive"
  >
    <scanBox />
    <ion-alert
      :is-open="!permission"
      header="Need Permission"
      message="This app needs permission to access your camera to scan QR codes."
      :buttons="alertButtons"
    />
    <AuthModal
      :is-open="authIsOpen"
      @close="modalClosed()"
    />
  </BaseLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import { onIonViewDidEnter, onIonViewWillLeave, IonAlert } from '@ionic/vue';

import scanBox from '@/components/scanBox.vue';
import QRScanner from '@/services/qrScanner';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import AuthModal from '@/components/modals/AuthModal.vue';

const router = useRouter();
let authIsOpen = ref(false);

const qrScanner = new QRScanner();
const permission = ref(true);
const alertButtons = [{
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Open Settings',
            handler: () => {
              BarcodeScanner.openAppSettings();
            },
          }];

async function scan() {
  if (permission.value) {
    const result = await qrScanner.startScan();
    authIsOpen.value = true;
    // router.push('/auth');
  }
}

function modalClosed() {
  authIsOpen.value = false;
  scan();
}

onIonViewDidEnter(async () => {
  permission.value = await qrScanner.checkPermissions();
  scan();
});

//Stop scanning when leave to a different tab
onIonViewWillLeave(() => qrScanner.stopScan());
</script>