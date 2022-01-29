<template>
    <base-layout pageTitle="Intro">
    </base-layout>
</template>

<script lang="ts">
import { onIonViewDidEnter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'IntroPage',
    
    setup() {
        const store = useStore();

        onIonViewDidEnter(() => {
            store.commit('intro/setSeenIntro', true);
            console.log("set");
        });
    },
});
</script>
