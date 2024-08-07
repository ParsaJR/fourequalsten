<script setup>
const { loggedIn, user, session, fetch, clear } = useUserSession()


</script>
<template>
    <UModal>
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header v-if="loggedIn">
                <p>Welcome {{ user.name }} !</p>
            </template>
            <template #header v-else>
                <p>Login Method</p>
            </template>


            <div v-if="loggedIn">
                logged in Now -----
                <UButton @click="clear">logout</UButton>
            </div>

            <div class="flex flex-row space-x-4" v-else>
                <a class="inline-block flex-1 text-center hover:opacity-20 transition-opacity" href="/auth/google">
                    <Icon name="i-logos-google-icon" size="80px"></Icon>
                </a>
                <a class="inline-block flex-1 text-center opacity-5 transition-opacity cursor-not-allowed" title="Coming Soon">
                    <Icon name="i-grommet-icons-github" size="80px"></Icon>
                </a>
            </div>

        </UCard>
    </UModal>
</template>