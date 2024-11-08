<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  export let name: string

  let characters = [
    "░",
    "▓",
    "▒",
    "1",
    "2",
    "3",
    "4",
    "5",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "X",
    "X",
    "X",
  ]
  let message = ""
  let displayedMessage = ""

  const line = "-".repeat(40)

  // Function to generate a random message of 200 characters
  function generateRandomMessage(length: number) {
    let result = ""
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)]
    }
    return result
  }

  async function typewriterEffect() {
    for (let i = 0; i < message.length; i++) {
      displayedMessage += message[i]
      await new Promise(resolve => setTimeout(resolve, 3))
    }
    await new Promise(resolve => setTimeout(resolve, 500))
    displayedMessage += `<br/>${line}`
    await new Promise(resolve => setTimeout(resolve, 500))
    displayedMessage += "<br/>SYNTHESIS COMPLETED SUCESSFULLY"
    await new Promise(resolve => setTimeout(resolve, 500))
    displayedMessage += `<br/>${line}`
    await new Promise(resolve => setTimeout(resolve, 500))
    displayedMessage += `<br/><strong>${name} CREATED</strong>`
    await new Promise(resolve => setTimeout(resolve, 1500))
    dispatch("done", { finished: true })
  }

  onMount(async () => {
    message = generateRandomMessage(400)
    await typewriterEffect()
  })
</script>

<div class="result">{@html displayedMessage}</div>

<style lang="scss">
  .result {
    word-break: break-all;
  }
</style>
