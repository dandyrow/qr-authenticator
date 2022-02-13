<template>
  <BaseLayout
    page-title="Scan QR"
    toolbar-button="menu"
    :scan-active="qrScanner.scanActive"
  >
    <scanBox />
  </BaseLayout>
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