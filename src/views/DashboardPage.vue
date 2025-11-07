<template>
  <DashboardTemplate>
    <template #header>
      <UserProfileHeader />
    </template>
    <template #main>
      <GroupSearchPanel />
    </template>
  </DashboardTemplate>
</template>

<script setup lang="ts">
import DashboardTemplate from '@/templates/DashboardTemplate.vue';
import UserProfileHeader from '@/components/organisms/UserProfileHeader.vue';
import GroupSearchPanel from '@/components/organisms/GroupSearchPanel.vue';
</script>