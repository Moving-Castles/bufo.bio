<script lang="ts">
  export let title: string | null = null

  const defaultDescription = "derive novel substances from frogs"

  const defaultImage = "https://shulgin.engineering/logo.jpg"

  $: title = (title ? title + " | " : "") + "shulgin.engineering"

  $: description = defaultDescription

  $: image = defaultImage
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
  <meta name="twitter:site" content="@movingcastles_" />
  <meta name="twitter:creator" content="@movingcastles_" />
  <meta name="application-name" content={title} />
  <meta name="apple-mobile-web-app-title" content={title} />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <link rel="apple-touch-icon" href={image} />
</svelte:head>
