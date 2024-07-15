<template>
  <div>
    <NuxtRouteAnnouncer />
    <main class="h-screen main-linear-bg-mobile sm:main-linear-bg-desktop flex flex-col">
      <section class="h-[40%]">
        <div class="flex flex-row gap-10 justify-between m-2">
          <UButton icon="i-heroicons-bars-3-16-solid" size="md" variant="ghost" color="white"/>
          <div><span>0</span><span>/</span><span>20</span></div>
        </div>
      </section>
      <section class="h-[60%]"></section>
    </main>
  </div>
</template>
<style></style>
