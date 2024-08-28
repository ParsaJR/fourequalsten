<script setup lang="ts">
const emit = defineEmits(['refresh']);
let isRotated = ref(false);
function onRefresh() {
    emit('refresh');
    toggleRotation();
}
function toggleRotation() {
    isRotated.value = !isRotated.value;
    setTimeout(() => {
        isRotated.value = false;
    }, 500)
}
</script>
<template>
    <UButton variant="ghost" color="white" @click="onRefresh">
        <Icon name="i-heroicons-arrow-path-solid" size="1.5rem" class="transition-transform"
            :class="{ 'rotate-animation': isRotated }" />
    </UButton>
</template>
<style>
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