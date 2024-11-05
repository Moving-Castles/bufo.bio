<script lang="ts">
  import Connect from "$lib/components/Connect.svelte"
</script>

<div class="introduction">
  <p>connect to access the lab</p>
</div>

<Connect />

<style lang="scss">
  .introduction {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid var(--foreground);
    margin-bottom: 20px;
  }
</style>
