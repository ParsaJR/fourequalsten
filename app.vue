<template>
  <div>
    <NuxtRouteAnnouncer />
    <main class="h-screen main-linear-bg-mobile sm:main-linear-bg-desktop flex flex-col">
      <section class="h-[40%]">
        <div class="flex flex-row gap-10 justify-between m-2 items-center">
          <UButton icon="i-heroicons-bars-3-bottom-left-16-solid" size="xl" variant="ghost" color="white"/>
          <div class="p-2"><span>0</span><span>/</span><span>20</span></div>
        </div>
        <div class="h-full flex justify-center items-center">
          <h2 class="text-7xl">10</h2>
        </div>
      </section>
      <section class="h-[60%]"></section>
    </main>
  </div>
</template>
<style></style>
