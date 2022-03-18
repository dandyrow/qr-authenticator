<template>
  <base-layout page-title="Account Info">
    <p><strong>User ID: </strong>{{ userId }}</p>
    <p><strong>Username: </strong>{{ username }}</p>
    <IonButton @click="logout()">
      Logout
    </IonButton>
  </base-layout>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { useAuth } from '@/stores/auth.store';
import { clearRefreshToken } from '@/api/auth.api';
import { useRouter } from 'vue-router';

const auth = useAuth();
const { userId, username } = auth;
const router = useRouter();

async function logout() {
  const res = await clearRefreshToken();
  if (res && res.ok) {
    auth.clearAccessToken();
    router.push('/login');
  }
}
</script>
