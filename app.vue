<script setup lang="ts">
import { VueDraggable, type DraggableEvent } from 'vue-draggable-plus'
const Expression = ref([
  { id: '1', value: '1' },
  { id: '2', value: '2' },
  { id: '3', value: '3' },
  { id: '4', value: '4' }
]);
const Mathsign = ref([
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
]);

function onEnd(event: DraggableEvent) {
  console.log(event);
  ruleChecking(event)
}

function ruleChecking(event: DraggableEvent) {
  if (isFromSameSection(event.from, event.to)) {
    console.log("same section");
  }
  else {
    if (isMathSign(event.item.innerText)) {
      if (isDroppedInSignsSection(event.to.classList)) {
        console.log('dropped in signs');
        if (typeof event.newIndex === 'number') {
          Mathsign.value.splice(event.newIndex, 1)
        }
      }
      else {
        console.log('not dropped in signs');
      }
    }
    if (isNumber(event.item.innerText)) {
      if (isDroppedInSignsSection(event.to.classList)) {
        console.log('dropped in signs');
        if (typeof event.newIndex === 'number') {
          Mathsign.value.splice(event.newIndex, 1)
        }
      }
    }
  }
}

function isFromSameSection(from: HTMLElement, to: HTMLElement) {
  return from === to;
}
function isMathSign(item: string) {
  const mathSignRegex = /^[\+\-\×\÷]$/;
  return mathSignRegex.test(item);
}
function isNumber(value: any) {
  const numberRegex = /^[0-9]$/;
  return numberRegex.test(value);
}
function isDroppedInSignsSection(classes: DOMTokenList) {
  return classes.contains("signs");
}
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
          <VueDraggable :animation="150" :group="{ name: 'Draggables', pull: 'clone'}" v-model="Expression" @end="onEnd"
            class="expression flex items-center justify-center gap-2 font-medium sm:font-normal text-4xl sm:text-5xl">
            <span v-for="exper in Expression" :key="exper.id">{{ exper.value }}</span>
          </VueDraggable>
          <VueDraggable :animation="150" :group="{ name: 'Draggables', pull: 'clone' }" :sort="false" @end="onEnd"
            v-model="Mathsign"
            class="signs mt-10 flex items-center justify-center gap-10 font-medium text-4xl sm:text-5xl">
            <span v-for="sign in Mathsign" :key="sign.id">{{ sign.value }}</span>
          </VueDraggable>
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
