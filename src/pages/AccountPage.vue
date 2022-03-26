<template>
  <BaseLayout page-title="Account Info">
    <IonCard class="centre ion-padding">
      <IonCardHeader>
        <IonCardTitle>Account Details</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p><strong>User ID: </strong>{{ userId }}</p>
        <p><strong>Username: </strong>{{ username }}</p>
      </IonCardContent>
      <IonButton
        expand="full"
        @click="logout()"
      >
        Logout
        <IonIcon
          slot="end"
          :icon="exitOutline"
        />
      </IonButton>
    </IonCard>
  </BaseLayout>
</template>

<script setup lang="ts">
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/vue';
import { exitOutline } from 'ionicons/icons';
import { useAuth } from '@/stores/auth.store';
import { clearRefreshToken } from '@/api/auth.api';
import { useRouter } from 'vue-router';
import { useSettings } from '@/stores/settings.store';

const auth = useAuth();
const settings = useSettings();
const { userId, username } = auth;
const router = useRouter();

async function logout() {
  const res = await clearRefreshToken();
  if (res && res.ok) {
    auth.clearAccessToken();
    settings.pin = 0;
    router.push('/login');
  }
}
</script>

<style scoped>
.centre {
  margin: 0 auto;
}
</style>