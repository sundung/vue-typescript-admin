<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count)

    return {
      count
    }
  }
})
</script>
