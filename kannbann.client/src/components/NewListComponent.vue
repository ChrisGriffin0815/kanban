<template>
  <div class="newListComponent">
    <form class="" @submit.prevent="createList(boardProp.id)">
      <input type="text" class="p-2 border radius-25" placeholder="New List" v-model="state.newList.title">
      <button class="btn" type="submit">
        <i class="far fa-paper-plane"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { listService } from '../services/ListService'
export default {
  name: 'NewListComponent',
  props: ['boardProp'],
  setup() {
    const state = reactive({
      newList: {

      }
    })
    return {
      state,
      createList(boardId, newList) {
        listService.createList(boardId, state.newList)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 25px;
}
</style>
