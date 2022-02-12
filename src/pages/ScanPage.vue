<template>
  <base-layout
    page-title="Scan QR"
    :scan-active="qrScanner.scanActive"
  >
    <scan-box />
  </base-layout>
</template>

<script setup lang="ts">
import { onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';

import scanBox from '@/components/scanBox.vue';
import QRScanner from '@/services/qrScanner';

const qrScanner = new QRScanner();

onIonViewDidEnter(async () => {
  const result = await qrScanner.startScan();
  console.log(result);
});

//Stop scanning when leave to a different tab
onIonViewWillLeave(() => qrScanner.stopScan());
</script>