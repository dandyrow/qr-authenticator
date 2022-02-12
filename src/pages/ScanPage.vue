<template>
    <base-layout pageTitle="Scan QR" :scanActive="qrScanner.scanActive">
        <scan-box></scan-box>
    </base-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { onIonViewDidEnter, onIonViewWillLeave } from '@ionic/vue';

import scanBox from '@/components/scanBox.vue';
import QRScanner from '@/services/qrScanner';

export default defineComponent({
    name: 'ScanPage',

    components: { scanBox },

    setup() {
        const qrScanner = new QRScanner();

        onIonViewDidEnter(async () => {
            const result = await qrScanner.startScan();
            console.log(result);
        });

        //Stop scanning when leave to a different tab
        onIonViewWillLeave(() => qrScanner.stopScan());

        return {
            qrScanner,
        };
    },
});
</script>
