<script>
  import { onDestroy } from "svelte"
  export let maxDots = 16 // Maximum number of dots in the animation
  export let speed = 100 // Speed in milliseconds for each dot change

  let dots = "═"
  let dotCount = 1

  // Animation function that increments dots up to maxDots, then resets to 1 instead of 0
  const animateDots = () => {
    dotCount = dotCount < maxDots ? dotCount + 1 : 1
    dots = "═".repeat(dotCount)
  }

  // Set interval for dot animation
  const interval = setInterval(animateDots, speed)

  // Clear interval on component destroy
  onDestroy(() => {
    clearInterval(interval)
  })
</script>

<span>{dots}</span>
