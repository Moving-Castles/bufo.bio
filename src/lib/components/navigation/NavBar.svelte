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
      height: 80px;
      line-height: 80px;
      text-align: center;
      text-decoration: none;
      font-weight: bold;
      color: var(--background);
      background: lightgray;

      &:first-child {
        border-right: 1px solid white;
      }

      &.active {
        background: grey;
      }
    }
  }
</style>
