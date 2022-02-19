<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          :tab="tabNames.tab1"
          href="/tabs/account"
        >
          <ion-icon :icon="person" />
          <ion-label>{{ tabNames.tab1 }}</ion-label>
        </ion-tab-button>

        <ion-tab-button
          :tab="tabNames.tab2"
          href="/tabs/scan"
        >
          <ion-icon :icon="qrCode" />
          <ion-label>{{ tabNames.tab2 }}</ion-label>
        </ion-tab-button>

        <ion-tab-button
          :tab="tabNames.tab3"
          href="/tabs/log"
        >
          <ion-icon :icon="reader" />
          <ion-label>{{ tabNames.tab3 }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from '@ionic/vue';

import { person, qrCode, reader } from 'ionicons/icons';

const tabNames = {
  tab1: 'Account Info',
  tab2: 'Scan QR Code',
  tab3: 'Auth Log',
};
</script>