<template>
  <base-layout title="Scan QR" :scanActive="scanActive">
    <div class="scan-box">
      <h3>Scan the QR Code presented on your computer</h3>
    </div>
  </base-layout>
</template>

<script lang="ts">
import BaseLayout from '@/components/base/Base-Layout.vue';
import { defineComponent, } from '@vue/runtime-core';
import { BarcodeScanner, } from '@capacitor-community/barcode-scanner';
import { onIonViewDidEnter, onIonViewWillLeave, } from '@ionic/vue';
import { camera, } from 'ionicons/icons';
import { ref, } from 'vue';

export default defineComponent ({
  components: {
    BaseLayout,
  },

  setup() {

    const scanActive = ref<boolean>(false,);

    const startScan = async () => {
      await checkPermissions();
      scanActive.value = true;
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        scanActive.value = false;
        //TODO: Attempt to authenticate and show feedback to the user
      }
    };

    const checkPermissions = async () => {
      //TODO: increase permission checking/handling
      const status = await BarcodeScanner.checkPermission({ force: true, },);
      if (status.granted) {
        return true;
      }
      return false;
    };

    onIonViewDidEnter(() => {
      startScan();
    },);

    //Stop scanning when leave to a different tab
    onIonViewWillLeave(() => {
      BarcodeScanner.stopScan();
      scanActive.value = false;
    },);

    return {
      startScan,
      camera,
      scanActive,
    };
  },
},);
</script>

<style scoped>
h3 {
  position: relative;
  top: -28%;
  text-align: center;
}

.scan-box {
  content: '';
  display: flex;
  justify-content: center;
  position: absolute;
  width:70vw; 
  height:70vw;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: visible;
  border: 2px solid #fff;
  border-radius: 5px;
  box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.6);  
}

@media (orientation:landscape) {
  .scan-box {
    top: 50%;
    width:50vh; 
    height:50vh;
  }

  h3 {
    width: max-content;
    flex-shrink: 0;
  }
}
</style>