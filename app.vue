<script setup lang="ts">
import { VueDraggable, type DraggableEvent, type UseDraggableReturn } from 'vue-draggable-plus'
const { loggedIn, user, clear } = useUserSession()

// @ts-ignore
import Eval from 'bigeval';
import { LoginModal,Slideover } from '#components';

let BigEval = new Eval();

// Temporary workaround for UDropdown problem on mobile 
const menuDisabled = ref(false);
const checkTouch = (e: PointerEvent) => {
  e.pointerType === 'touch'
    ? (menuDisabled.value = true)
    : (menuDisabled.value = false);
};

const hamburgerSlideover = useSlideover();
const modal = useModal();
const toast = useToast();
let isRotated = ref(false);

const userStatus = ref({
  currentLevel: 0,
  levelCount: 0
});

onMounted(async () => {
  if(loggedIn.value)
  await updateUserStatus();
})

function openSlideover () {
    hamburgerSlideover.open(Slideover,{onClose: hamburgerSlideover.close});
}

function openLoginModal() {
  if (loggedIn.value === false)
    modal.open(LoginModal);
  else
    return;
}
function toggleRotation() {
  isRotated.value = !isRotated.value;
  setTimeout(() => {
    isRotated.value = false;
  }, 500)
}

const items = [[{
  label: 'Logout',
  icon: 'i-heroicons-arrow-left-on-rectangle',
  click: clear
}]]

let IsValidLength = computed(() => {
  return Expression.value.length === 7 ? true : false
});
let result = computed(() => {
  return IsStructureValid() && IsValidLength.value ? calculateResult() : '?'
})
let solved = computed(() => {
  return result.value === 10
})

let BaseExpression = ref([
  { id: '1', value: '1' },
  { id: '2', value: '2' },
  { id: '3', value: '3' },
  { id: '4', value: '4' }
]);

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

async function updateUserStatus() {
  const response = await $fetch('/api/users/getUserLevel');
  userStatus.value.currentLevel = response[0];
  userStatus.value.levelCount = response[1];
  console.log(userStatus);
}


if (loggedIn.value) {
  // const userStatusResponse = await useFetch('/api/users/getUserLevel');
  // currentLevel.value = userStatusResponse.data.value[0].currentLevel;
  // allLevelCount.value = userStatusResponse.data.value[1];
  const levelResponse = await useFetch('/api/levels/getCurrentLevel');
  const actualLevels = levelResponse.data.value
  for (let index = 0; index < Expression.value.length; index++) {
    if (typeof actualLevels !== 'undefined' && actualLevels !== null)
      Expression.value[index].value = actualLevels[index];
  }
  BaseExpression.value = Expression.value;
}

function refreshExpression() {
  Expression.value = BaseExpression.value;
  toggleRotation()
}

async function setupNextLevel() {
  let hasError: boolean = false;
  await $fetch('/api/levels/nextLevel', { method: 'PATCH' }).catch((error) => {

    hasError = true;

    if (error.data.statusCode === 401) {
      toast.add({ title: 'Unauthorized. Please Login first' })
    }
    else if (error.data.statusCode === 400) {
      toast.add({ title: error.data.statusMessage });
    }
    else {
      toast.add({ title: 'Something Wrong' });
    }
  });

  if (hasError === false) {
    const ourlevel = await $fetch('/api/levels/getCurrentLevel');
    let NewExpression = ref([
      { id: '1', value: '' },
      { id: '2', value: '' },
      { id: '3', value: '' },
      { id: '4', value: '' }
    ]);
    for (let index = 0; index < NewExpression.value.length; index++) {
      if (typeof ourlevel !== 'undefined' && ourlevel !== null)
        NewExpression.value[index].value = ourlevel[index];
    }
    Expression.value = NewExpression.value;
    BaseExpression.value = NewExpression.value;
    await updateUserStatus()
  }
}



function ruleChecking(event: DraggableEvent) {
  //remove symbols & numbers when dropping in Symbols Sections
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

  // Symbols cant place at the end or start of expression
  if (isDroppedInExpressionSection(event)) {
    if (isSymbol(Expression.value[0].value)) {
      removeSingleFromExpressionByIndex(0);
    }
    else if (isSymbol(Expression.value[Expression.value.length - 1].value)) {
      removeSingleFromExpressionByIndex(Array.prototype.lastIndexOf(Expression))
    }
  }
  // only 1 Math Symbol can user put between two numbers
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
    if (isSymbol(array[index + 1].value) && isSymbol(array[index].value)) {
      array.splice(index, 1);
    }
  }
}
function IsStructureValid() {
  let IsStructureValid: boolean = true;
  for (let index = 0; index < Expression.value.length - 1; index++) {
    switch (index) {
      case 0:
        if (!isNumber(Expression.value[index].value))
          IsStructureValid = false;
        break;
      case 1:
        if (!isSymbol(Expression.value[index].value))
          IsStructureValid = false;
        break;
      case 2:
        if (!isNumber(Expression.value[index].value))
          IsStructureValid = false;
        break;
      case 3:
        if (!isSymbol(Expression.value[index].value))
          IsStructureValid = false;
        break;
      case 4:
        if (!isNumber(Expression.value[index].value))
          IsStructureValid = false;
        break;
      case 5:
        if (!isSymbol(Expression.value[index].value))
          IsStructureValid = false;
        break;
      case 6:
        if (isNumber(Expression.value[index].value))
          IsStructureValid = false;
        break;
      default:
        IsStructureValid = false;
        break;
    }
  }
  return IsStructureValid;
}
function calculateResult() {
  // stick the whole expression together in one signle string 
  let totalExpression: string = '';
  for (let index = 0; index < Expression.value.length; index++) {
    totalExpression += Expression.value[index].value
  }
  // replace * & / for avoid bigeval error
  const splitedExpression = totalExpression.split("");
  for (let index = 0; index < splitedExpression.length - 1; index++) {
    switch (splitedExpression[index]) {
      case '×':
        splitedExpression[index] = '*'
        break;
      case '÷':
        splitedExpression[index] = '/'
      default:
        break;
    }
  }
  totalExpression = splitedExpression.join("");
  let result: number = BigEval.exec(totalExpression);
  return result;
}
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="h-screen main-linear-bg-desktop flex flex-col">
      <section class="h-3/6 flex flex-col">
        <div class="flex flex-row justify-between m-5 items-center">
          <div class="flex justify-center">
            <UButton icon="i-heroicons-bars-3-16-solid" @click="openSlideover()" size="xl" variant="ghost" color="white" />
          </div>
          <div class="flex items-center gap-2">
            <UBadge v-if="user" color="white" variant="outline" size="lg" :class="'ring-white ring-1'">{{
              userStatus.currentLevel }} / {{ userStatus.levelCount }}</UBadge>
            <UButton v-if="!user" size="xl" variant="ghost" color="white" @click="openLoginModal()"
              title="Login/Signin">
              <UAvatar icon="i-heroicons-user-solid" size="lg" />
            </UButton>
            <UDropdown v-else :items="items" :disabled="menuDisabled" :popper="{ placement: 'bottom' }">
              <UButton @click="checkTouch" variant="ghost" color="white" trailing-icon="i-heroicons-chevron-down-20-solid">
                <UAvatar :src="user.picture" size="md" :alt="user.name" />
                <span class="hidden lg:inline">{{ user.name }}</span>
              </UButton>
            </UDropdown>
          </div>
        </div>
        <div class="h-full flex justify-center items-center flex-col gap-y-12">
          <h2 v-bind:class="[solved ? 'text-9xl font-bold' : 'text-7xl font-thin' ]">{{ result }}</h2>
          <a v-if="solved" @click="setupNextLevel()" class="hover:cursor-pointer">
            <Icon name="i-heroicons-arrow-long-right-16-solid" size="60px"></Icon>
          </a>
        </div>
      </section>
      <section class="h-3/6">
        <div class="bg-[#020919] h-full">
          <div class="flex flex-row justify-end p-3 w-full h-16">
            <UButton variant="ghost" color="white" @click="refreshExpression()">
              <Icon name="i-heroicons-arrow-path-solid" size="1.5rem" class="transition-transform"
                :class="{ 'rotate-animation': isRotated }" />
            </UButton>
          </div>
          <div class="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
            <VueDraggable :group="{ name: 'Draggables', pull: 'clone' }" v-model="Expression" @end="onEnd"
              :animation="100"
              class="expression flex items-center justify-center gap-3 font-normal text-4xl sm:text-5xl">
              <span v-for="exper in Expression" :key="exper.id">{{ exper.value }}</span>
            </VueDraggable>
            <VueDraggable :group="{ name: 'Draggables', pull: 'clone' }" :sort="false" @end="onEnd" v-model="Symbols"
              ref="el" class="symbols mt-10 flex items-center justify-center gap-5 sm:gap-7 font-light text-4xl sm:text-5xl">
              <span v-for="symbol in Symbols" :key="symbol.id" class="size-10 flex justify-center items-center">{{ symbol.value }}</span>
            </VueDraggable>
          </div>
        </div>
      </section>
    </div>
  </div>
  <UNotifications />
  <UModals />
  <USlideovers />
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

.rotate-animation {
  animation: rotate-once 500ms normal;
  animation-fill-mode: forwards;
}

@keyframes rotate-once {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
