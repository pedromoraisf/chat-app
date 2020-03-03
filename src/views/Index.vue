<template>
  <div id="index" class="bg-dark w-100 px-2 pt-2 pb-4">
    
    <orchestrator />

  </div>
</template>

<script>
import Orchestrator from '@/components/Orchestrator'

export default {
  components: {
    Orchestrator
  }
}
</script>

<style lang="scss">
  #index {
    min-height: 100vh;
  }
</style>
