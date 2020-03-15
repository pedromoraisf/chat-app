<template>
  <div class="w-100 h-100 position-fixed loader d-flex align-items-center justify-content-center" v-if="!loaderPathControl">
    <b-spinner :variant="variantTheme"  style="width: 5rem; height: 5rem;"/>
  </div>
</template>

<script>
export default {
  props: {
    variantTheme: {
      type: String
    }, 
    loaderControl: {
      type: Number, 
      default: 0
    }
  }, 
  computed: {
    loaderPathControl () {
      return localStorage.getItem("username") === null ? true : this.loaderControl
    }
  }
}
</script>

<style scoped>
.loader {
  z-index: 10;
  background: rgba(255, 255, 255, .3);
  backdrop-filter: blur(.4rem);
  top: 0;
  left: 0;
}
</style>