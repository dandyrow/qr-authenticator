<template>
  <base-layout title="Account Info">
  </base-layout>
</template>

<script lang="ts">
import BaseLayout from '@/components/base/Base-Layout.vue';
import { defineComponent, } from '@vue/runtime-core';

export default defineComponent ({
  name: 'TabOne',

  components: {
    BaseLayout,
  },
},);
</script>