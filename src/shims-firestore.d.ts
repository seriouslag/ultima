import { firestore } from 'firebase';

declare module 'vue/types/vue' {
  interface Vue {
    $firestore: firestore.Firestore;
  }
}
