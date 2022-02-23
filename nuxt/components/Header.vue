<template>
  <header class="bg-nord-nord6 dark:bg-dark-container w-full shadow-md">
    <div
      class="max-w-screen-lg py-4 px-12 m-auto flex justify-between items-center"
    >
      <NuxtLink to="/"
        ><h1 class="text-3xl -pr-4">{{ pageTitle }}</h1></NuxtLink
      >
      <div class="nav transition">
        <NuxtLink to="/">Home</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  head(this: Header) {
    return {
      changed: (info) => {
        if (info.title) {
          this.pageTitle = info.title
        }
      },
    }
  },
})
export default class Header extends Vue {
  pageTitle = 'Nuxt template'
}
</script>

<style lang="postcss" scoped>
.nav a {
  @apply mx-2;

  &.nuxt-link-exact-active {
    @apply font-bold;
  }
}
</style>
