<script setup lang="ts">
const project_version = ref("");
const emit = defineEmits(['close'])

function onClose() {
    emit('close');
}


</script>
<template>
    <USlideover side="left">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <UButton @click="onClose" color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid"
                    class="flex sm:hidden absolute end-5 top-5 z-10" square padded/>
                <img class="pl-3" src="/favicon.ico" alt="Nuxt">
            </template>
            <div>
                <ul>
                    <li>
                        <UButton icon="i-grommet-icons-home-rounded" variant="ghost" color="gray" size="lg">Home
                        </UButton>
                    </li>
                    <li>
                        <UButton icon="i-grommet-icons-circle-information" variant="ghost" color="gray" size="lg">How to
                            play
                        </UButton>
                    </li>
                    <li>
                        <UButton icon="i-grommet-icons-user" variant="ghost" color="gray" size="lg">About</UButton>
                    </li>
                </ul>
            </div>
            <template #footer>
                <div class="flex justify-between items-center">
                    <p class="text-sm sm:text-base">&copy; 2024</p>
                    <UButton icon="i-grommet-icons-github" variant="ghost" color="gray" size="md"></UButton>
                </div>
            </template>
        </UCard>
    </USlideover>
</template>