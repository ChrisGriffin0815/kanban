<template>
  <div class="newListComponent">
    <form class="" @submit.prevent="createList(boardProp.id)">
      <div class="d-flex grow">
        <input type="text" class="form-control radius-25 shadow" placeholder="New List" v-model="state.newList.title">
        <button class="btn move-left" type="submit">
          <i class="far fa-paper-plane"></i>
        </button>
      </div>
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

.move-left {
  position: relative;
  left: -50px;
}

.grow:hover {
  transform: scale(1.01);
  transition: all .25s ease-in-out;
  }
</style>
