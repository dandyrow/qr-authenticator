<template>
  <BaseLayout
    page-title="Scan QR"
    :scan-active="qrScanner.scanActive"
  >
    <ScanBox />
    <ion-alert
      :is-open="!cameraPermission"
      header="Need Permission"
      message="This app needs permission to access your camera to scan QR codes."
      :buttons="alertButtons"
    />
    <AuthModal
      :is-open="authIsOpen"
      :qr-content="qrContent"
      @close="modalClosed"
    />
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onIonViewDidEnter, onIonViewWillLeave, IonAlert } from '@ionic/vue';

import ScanBox from '@/components/scanBox.vue';
import QRScanner from '@/services/qrScanner';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import AuthModal from '@/components/modals/AuthModal.vue';

const cameraPermission = ref(true);
const authIsOpen = ref(false);
const qrContent = ref('');

const qrScanner = new QRScanner();
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
  cameraPermission.value = await qrScanner.checkPermissions();
  if (cameraPermission.value) {
    const result = await qrScanner.startScan();
    if (result && result.content) {
      qrContent.value = result.content;
      authIsOpen.value = true;
    }
  }
}

function modalClosed() {
  authIsOpen.value = false;
  scan();
}

onIonViewDidEnter(async () => scan());

//Stop scanning when leave to a different tab
onIonViewWillLeave(() => qrScanner.stopScan());
</script>