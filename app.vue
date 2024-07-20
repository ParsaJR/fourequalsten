<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="h-screen main-linear-bg-desktop flex flex-col">
      <section class="h-3/6 flex flex-col">
        <div class="flex flex-row justify-between m-5 items-center">
          <UButton icon="i-heroicons-bars-3-16-solid" size="xl" variant="ghost" color="white" />
          <div class="p-2 text-lg sm:text-3xl"><span>0</span><span>/</span><span>20</span></div>
        </div>
        <div class="h-full flex justify-center items-center">
          <h2 class="text-7xl">10</h2>
        </div>
      </section>
      <section class="h-3/6">
          <div class="wrapper bg-[#020919] h-full w-full flex flex-col items-center justify-center">
            <div class="flex items-center justify-center gap-10 font-medium sm:font-normal text-4xl sm:text-5xl">
              <span>1</span><span>2</span><span>3</span><span>4</span>
            </div>
            <div class="mt-10 flex items-center justify-center gap-10 font-medium text-4xl sm:text-5xl">
              <span>+</span><span>-</span><span>×</span><span>÷</span>
            </div>
          </div>
      </section>
    </div>
  </div>
</template>
<style>
body {
  font-family:  Roboto, sans-serif;
}
.main-linear-bg-desktop {
  background: linear-gradient(to bottom,
      rgb(4, 24, 46) 0%,
      rgba(60, 135, 175, 0.94) 100%);
}

</style>
