<script lang="ts">
  export let page: string
</script>

<div class="navbar">
  <a href="/lab" class:active={page === "lab"}>lab</a>
  <a href="/storage" class:active={page === "storage"}>storage</a>
</div>

<style lang="scss">
  .navbar {
    width: 100%;
    display: flex;
    margin-bottom: 20px;

    a {
      display: block;
      width: 50%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      text-decoration: none;
      color: var(--background);
      background: var(--color-mid);

      &.active {
        background: var(--color-light);
        font-weight: bold;
      }

      &:hover {
        text-decoration: underline;
      }

      &:active {
        background: var(--foreground);
      }
    }
  }
</style>
