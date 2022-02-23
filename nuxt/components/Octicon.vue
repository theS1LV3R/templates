<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="octicon-wrapper" v-html="svgpath"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
// @ts-ignore I wont bother creating typings
// See https://primer.style/octicons/packages/javascript
import octicons from '@primer/octicons'

@Component
export default class Octicon extends Vue {
  @Prop({ type: String, required: true })
  icon = ''

  svgpath = octicons[this.icon].toSVG()
}
</script>

<style lang="scss" scoped>
.octicon-wrapper {
  display: inline-block;
}
</style>

<style lang="scss">
.octicon {
  display: inline-block;
  vertical-align: middle;
  fill: currentcolor;
}
</style>
