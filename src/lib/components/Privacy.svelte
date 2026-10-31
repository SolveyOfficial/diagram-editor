<script lang="ts">
  import * as Dialog from '$/components/ui/dialog';
  import ShieldIcon from '~icons/material-symbols/shield-lock-outline-rounded';
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <ShieldIcon />
  </Dialog.Trigger>
  <Dialog.Content class="max-h-full overflow-hidden overflow-y-auto p-12">
    <Dialog.Header>
      <Dialog.Title class="flex items-center gap-2 text-xl">
        <ShieldIcon class="size-8 text-green-700" />
        Data security
      </Dialog.Title>
    </Dialog.Header>
    <p class="text-xl font-semibold">Your diagrams never leave your browser.</p>
    <p>They're only stored in the URL and your browser's local storage.</p>
    <p>
      This is a fully client-side app. It has no analytics or tracking, loads no third-party
      resources, and works offline once it has loaded.
    </p>
  </Dialog.Content>
</Dialog.Root>
