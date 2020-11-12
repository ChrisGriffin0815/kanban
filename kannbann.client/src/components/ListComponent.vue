<template>
  <div class="listComponent" v-if="listProps.boardId == boardProp.id">
    <div class="row">
      <div class="col-10">
        <p class="text-left p-1">
          {{ listProps.title }}
        </p>
      </div>
      <div class="col-2">
        <button class="btn bg-transparent">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListComponent',
  props: ['listProps', 'boardProp'],
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
