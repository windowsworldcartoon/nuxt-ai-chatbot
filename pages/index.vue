<template>
  <div class="max-w-xl mx-auto text-black">
    <!-- Your existing chat interface here -->
    
    <!-- Shutdown message -->
    <div v-if="shutdown" class="text-center">
      <h1>this website is unavailable</h1>
      <p>The chat service is currently unavailable.</p>
      <div ref="errorElement" class="error"></div>
    </div>
  </div>
</template>

<script setup>
  const shutdown = ref(false); // Add a shutdown flag
  const errorElement = ref(null);

  function toggleShutdown() {
    return Promise.resolve({
      statusCode: 503,
      message: 'Service Unavailable',
    });
  }

  onMounted(() => {
    toggleShutdown().then((shutdownResponse) => {
      if (shutdownResponse.statusCode === 503) {
        shutdown.value = true;
        nextTick(() => {
          if (errorElement.value) {
            errorElement.value.innerHTML = `
              <h1>${shutdownResponse.statusCode}</h1>
              <p>${shutdownResponse.message}</p>
            `;
          }
        });
      }
    });
  })
</script>

<style>
	.loader {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: block;
		position: relative;
		color: #d3d3d3;
		box-sizing: border-box;
		animation: animloader 2s linear infinite;
	}

	@keyframes animloader {
		0% {
			box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px;
		}
		25% {
			box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 2px;
		}
		50% {
			box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px, -38px 0 0 -2px;
		}
		75% {
			box-shadow: 14px 0 0 2px, 38px 0 0 -2px;
		}
	}
</style>
