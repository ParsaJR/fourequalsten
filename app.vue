<script setup lang="ts">
import { VueDraggable, type DraggableEvent, type UseDraggableReturn } from 'vue-draggable-plus'
let Expression = ref([
  { id: '1', value: '1' },
  { id: '2', value: '2' },
  { id: '3', value: '3' },
  { id: '4', value: '4' }
]);
const Symbols = ref([
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
const el = ref<UseDraggableReturn>()


function onEnd(event: DraggableEvent) {
  ruleChecking(event)
}
function onMove(event: DraggableEvent) {
  return false;
}



function ruleChecking(event: DraggableEvent) {
  if (isFromSameSection(event)) {
    console.log("same section");
  }
  else {
    if (isSymbol(event.item.innerText)) {
      if (isDroppedInSymbolsSection(event)) {
        console.log('dropped in signs');
        if (typeof event.newIndex === 'number' && typeof event.oldIndex === 'number') {
          removeSingleFromSymbolsByIndex(event.newIndex)
          removeSingleFromExpressionByIndex(event.oldIndex)
        }
      }
      else {
        console.log('not dropped in signs');
      }
    }
    if (isNumber(event.item.innerText)) {
      if (isDroppedInSymbolsSection(event)) {
        console.log('dropped in signs');
        if (typeof event.newIndex === 'number' && typeof event.oldIndex === 'number') {
          removeSingleFromSymbolsByIndex(event.newIndex)
        }
      }
    }
  }

  // Symbols cant place at end or start of expression
  if (isDroppedInExpressionSection(event)) {
    if (isSymbol(Expression.value[0].value)) {
      removeSingleFromExpressionByIndex(0);
    }
    else if (isSymbol(Expression.value[Expression.value.length - 1].value)) {
      removeSingleFromExpressionByIndex(Array.prototype.lastIndexOf(Expression))
    }
  }
  // only 1 Math Symbol can user put between two number
  if (isDroppedInExpressionSection(event)) {
    removeDuplicateSymbols(Expression.value)
  }
}

function isFromSameSection(event: DraggableEvent) {
  return event.from === event.to;
}
function isSymbol(item: string) {
  const mathSignRegex = /^[\+\-\×\÷]$/;
  return mathSignRegex.test(item);
}
function isNumber(value: any) {
  const numberRegex = /^[0-9]$/;
  return numberRegex.test(value);
}
function isDroppedInSymbolsSection(event: DraggableEvent) {
  return event.to.classList.contains("symbols");
}
function isDroppedInExpressionSection(event: DraggableEvent) {
  return event.to.classList.contains("expression");
}
function removeSingleFromSymbolsByIndex(index: number) {
  Symbols.value.splice(index, 1)
}
function removeSingleFromExpressionByIndex(index: number) {
  Expression.value.splice(index, 1)
}
function removeDuplicateSymbols(array: { id: string; value: string; }[]) {
  for (let index = 0; index < array.length - 1; index++) {
    if (array[index].value === array[index + 1].value && isSymbol(array[index].value)) {
      array.splice(index, 1);
    }
  }
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
          <VueDraggable :group="{ name: 'Draggables', pull: 'clone' }" v-model="Expression" @end="onEnd" @move="onMove"
            class="expression flex items-center justify-center gap-2 font-medium sm:font-normal text-4xl sm:text-5xl">
            <span v-for="exper in Expression" :key="exper.id">{{ exper.value }}</span>
          </VueDraggable>
          <VueDraggable :group="{ name: 'Draggables', pull: 'clone' }" :sort="false" @end="onEnd" v-model="Symbols"
            ref="el" class="symbols mt-10 flex items-center justify-center gap-10 font-medium text-4xl sm:text-5xl">
            <span v-for="symbol in Symbols" :key="symbol.id">{{ symbol.value }}</span>
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
