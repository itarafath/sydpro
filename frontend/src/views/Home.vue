<template>
  <div class="home">
    <ListMessages/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListMessages from '@/components/ListMessages.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    ListMessages,
  },
});
</script>
