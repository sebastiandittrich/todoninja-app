<template>
    <div class="text-5xl m-8 mt-0 flex flex-row items-center justify-start">
        <i class="feather text-3xl mr-4 rounded-lg p-2 px-3" :class="{ [workspace.getIcon()]: true, [`bg-${workspace.getColor()}-lightest dark:bg-${workspace.getColor()}-darker text-${workspace.getColor()} dark:text-${workspace.getColor()}-lighter`]: !workspace.isInbox(), 'border-2 border-grey': workspace.isInbox() }"></i>
        {{ workspace.name }}
    </div>
</template>

<script>
export default {
    props: { 
        workspace: { type: Object, default: () => ({}) }
     }
}
</script>

<style>

</style>
