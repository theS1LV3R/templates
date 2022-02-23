<template>
  <div v-show="active" class="p-3">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export interface TabType {
  name: string
  title: string
  icon?: string
  component?: Vue.Component
  [key: string]: any
}

@Component
export default class Tab extends Vue {
  @Prop({ type: String, required: true })
  title = ''

  @Prop({ type: String, required: true })
  name = ''

  @Prop({ type: String, required: false, default: '' })
  icon = ''

  active = true
}
</script>
