<template><div>418</div></template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Error418 extends Vue {
  beforeMount() {
    this.$nuxt.error({ statusCode: 418, message: "I'm a teapot" })
  }
}
</script>
