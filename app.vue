<script setup lang="ts">
import { swap, animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

const ExpressionArray = [
  { id: '1', value: '1' },
  { id: '2', value: ' ' },
  { id: '3', value: '2' },
  { id: '4', value: ' ' },
  { id: '5', value: '3' },
  { id: '6', value: ' ' },
  { id: '7', value: '4' }
];
const MathSignsArray = [
  {
    id: '1-2', value: '+'
  },
  {
    id: '2-2', value: '-'
  },
  {
    id: '3-2', value: '×'
  },
  {
    id: '4-2', value: '÷'
  },
];

const [parentexp, Expression] = useDragAndDrop(ExpressionArray, { group: "hello", plugins: [swap()] });

const [parentmath, Mathsign] = useDragAndDrop(MathSignsArray, { group: "hello" });




</script>
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
          <div ref="parentexp"
            class="flex items-center justify-center gap-2 font-medium sm:font-normal text-4xl sm:text-5xl">
            <span v-for="exper in Expression" :key="exper.id">{{ exper.value }}</span>
          </div>
          <div ref="parentmath"
            class="mt-10 h-1/6 w-3/6 flex items-center justify-center gap-10 font-medium text-4xl sm:text-5xl">
            <span v-for="sign in Mathsign" :key="sign.id">{{ sign.value }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
body {
  font-family: Roboto, sans-serif;
}

.main-linear-bg-desktop {
  background: linear-gradient(to bottom,
      rgb(4, 24, 46) 0%,
      rgba(60, 135, 175, 0.94) 100%);
}
</style>
