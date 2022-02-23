import {
  MutationAction,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators'

import { $axios } from '@/utils/api'

@Module({
  name: 'demo',
  namespaced: true,
  stateFactory: true,
})
export default class ThingsModule extends VuexModule {
  things: string[] = []

  @Mutation
  set(things: string[]) {
    this.things = things
  }

  @Mutation
  add(...things: string[]) {
    this.things.push(...things)
  }

  @Mutation
  remove(index: number) {
    if (index !== -1) {
      this.things.splice(index, 1)
    }
  }

  @Mutation
  update(index: number, thing: string) {
    this.things.splice(index, 1, thing)
  }

  @MutationAction
  async fetchAll() {
    const things = await $axios.$get<string[]>('/posts')

    return { things }
  }

  get thing() {
    return (id: number) => this.things[id]
  }
}
