<script lang="ts">
  export let seed: string
</script>

<div class="viewer">
  <div>
    <div>VIEWER (shader goes here)</div>
    <div>Seed: {seed}</div>
  </div>
</div>

<style lang="scss">
  .viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--background);
    font-size: 4em;
  }
</style>
