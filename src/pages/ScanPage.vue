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
  </BaseLayout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { onIonViewDidEnter, onIonViewWillLeave, IonAlert } from '@ionic/vue';

import scanBox from '@/components/scanBox.vue';
import QRScanner from '@/services/qrScanner';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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
    console.log(result);
  }
}

onIonViewDidEnter(async () => {
  permission.value = await qrScanner.checkPermissions();
  scan();
});

//Stop scanning when leave to a different tab
onIonViewWillLeave(() => qrScanner.stopScan());
</script>