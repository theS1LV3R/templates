<template>
  <div
    class="bg-nord-nord6 dark:bg-dark-container lg:max-w-screen-lg m-auto mt-6"
  >
    <div v-if="error.statusCode === 404">
      <h2>404</h2>
      <p>
        That page wasn't found. Click here to go to the front page:
        <NuxtLink to="/">/</NuxtLink>
      </p>
    </div>
    <div v-else>
      <p>An error occured that i havent bothered creating an error page for.</p>
    </div>
    <hr />
    <pre class="language-json">{{ error }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import type { NuxtError } from '@nuxt/types'

import * as Prism from 'prismjs'
import 'prismjs/components/prism-json'

@Component({
  head(this: Error) {
    return {
      title: `${this.error.statusCode}: ${this.error.message}`,
      titleTemplate: '%s',
    }
  },
})
export default class Error extends Vue {
  layout = 'default'

  @Prop({ type: () => Object as NuxtError })
  error!: NuxtError

  mounted() {
    Prism.highlightAll()
  }
}
</script>
