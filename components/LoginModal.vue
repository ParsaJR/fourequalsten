<script setup lang="ts">

</script>
<template>
    <UModal>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <p>Login Method</p>
            </template>
            <div class="flex flex-row space-x-4">
                <button class="inline-block flex-1 text-center hover:opacity-20 transition-opacity">
                    <Icon name="i-logos-google-icon" size="80px"></Icon>
                </button>
                <button class="inline-block flex-1 text-center hover:opacity-20 transition-opacity">
                    <Icon name="i-grommet-icons-github" size="80px"></Icon>
                </button>
            </div>

        </UCard>
    </UModal>
</template>