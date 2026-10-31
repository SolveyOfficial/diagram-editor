<script lang="ts">
  import { resolve } from '$app/paths';
  import MainMenu from '$/components/MainMenu.svelte';
  import { type Snippet } from 'svelte';
  import SolveyIcon from '~icons/custom/solvey';

  interface Props {
    mobileToggle?: Snippet;
    children: Snippet;
  }

  let { children, mobileToggle }: Props = $props();
</script>

<nav class="z-50 flex p-4 sm:p-6">
  <div class="flex flex-1 items-center gap-2">
    <MainMenu />
    <SolveyIcon class="size-6" />
    <a href={resolve('/', {})} class="font-heading whitespace-nowrap text-accent">
      {#if !mobileToggle}
        Solvey
      {/if}
      Diagram Editor
    </a>
  </div>
  <div
    id="menu"
    class="hidden flex-nowrap items-center justify-between gap-3 overflow-hidden md:flex">
    {@render children()}
  </div>
  {@render mobileToggle?.()}
</nav>
