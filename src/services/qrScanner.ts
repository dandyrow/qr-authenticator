import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ref } from 'vue';

class QRScanner {
    #scanActive;

  constructor() {
      this.#scanActive = ref(false);
  }

  get scanActive() {
    return this.#scanActive;
  }

  async checkPermissions() {
    const status = await BarcodeScanner.checkPermission({
      force: true,
    });
    if (status.granted) {
      return true;
    }
    return false;
  }

  async startScan() {
    this.#scanActive.value = true;
    document.body.style.background = 'transparent';
    const result = await BarcodeScanner.startScan();

    if (result?.hasContent) {
      this.stopScan();
      return result;
    }
  }

  stopScan() {
    this.#scanActive.value = false;
    document.body.style.background = 'unset';
  }
}

export default QRScanner;
