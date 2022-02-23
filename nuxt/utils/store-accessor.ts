import type { Store } from 'vuex/types/index'
import ThingsModule from '@/store/things'

// eslint-disable-next-line import/no-mutable-exports
let thingsModule: ThingsModule

function initializeStores(store: Store<any>) {
  thingsModule = new ThingsModule(store)
}

export { initializeStores, thingsModule }
