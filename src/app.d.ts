// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import '@poppanator/sveltekit-svg/dist/svg.d.ts';
import 'unplugin-icons/types/svelte';
declare global {
  namespace App {
    interface Error {
      title: string;
      resolution: string;
    }
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
