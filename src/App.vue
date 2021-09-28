<template>
  <div id="app">
    <contact-form></contact-form>
  </div>
</template>

<script>
import contactForm from './components/contactForm.vue'

export default {
  name: 'App',
  components: {
    contactForm
  }
}
</script>

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
</style>
