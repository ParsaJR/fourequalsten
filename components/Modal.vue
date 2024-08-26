<script setup>
const { loggedIn, user, session, fetch, clear } = useUserSession()
const props = defineProps(['login', 'howtoplay', 'about']);
</script>
<template>
    <UModal v-if="props.login">
        <UCard v-if="loggedIn == false" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <p>Login Method</p>
            </template>
            <div class="flex flex-row space-x-4">
                <a class="inline-block flex-1 text-center hover:opacity-20 transition-opacity" href="/auth/google">
                    <Icon name="i-logos-google-icon" size="80px"></Icon>
                </a>
                <a class="inline-block flex-1 text-center opacity-5 transition-opacity cursor-not-allowed"
                    title="Coming Soon">
                    <Icon name="i-grommet-icons-github" size="80px"></Icon>
                </a>
            </div>
        </UCard>
    </UModal>
    <UModal v-else-if="props.howtoplay">
        <UCard>
            <template #header>
                <p>How to Play</p>
            </template>
            The objective is to use four given numbers and signs to make the whole expression equal 10.
            <br>
            <br>
            <UDivider label="Tips" size="sm"></UDivider>
            <br>
            <ul class="list-disc list-inside">
                <li>Try dragging the numbers around and changing their order.</li>
                <li>Place mathematical signs between each pair of numbers.</li>
                <li>Once the expression is valid, the answer will be displayed on the screen.</li>
            </ul>
        </UCard>
    </UModal>
    <UModal v-else-if="props.about">
        from about?
    </UModal>
</template>