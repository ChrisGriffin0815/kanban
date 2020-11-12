<template>
  <div class="taskComponent" v-if="listProps.id == taskProps.listId">
    <div class="col-12">
      <p class="bg-dark text-light">
        {{ taskProps.title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskComponent',
  props: ['listProps', 'taskProps'],
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
