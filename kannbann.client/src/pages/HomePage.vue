<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-6 offset-3 my-4">
        <form action="" @submit.prevent="createBoard()">
          <div class="d-flex grow">
            <input type="text"
                   name=""
                   id=""
                   class="form-control radius-25 shadow"
                   placeholder="Enter Title"
                   aria-describedby="helpId"
                   v-model="state.newBoard.title"
            >
            <button type="submit" class="btn move-left">
              <i class="far fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <BoardComponent v-for="board in boards" :key="board.id" :board-props="board" />
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
// import { listService } from '../services/ListService'

import BoardComponent from '../components/BoardComponent'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      boardService.getAllBoards()
    })
    const state = reactive({
      newBoard: {

      }
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      boards: computed(() => AppState.boards),

      createBoard(newBoard) {
        boardService.createBoard(state.newBoard)
      }
    }
  },
  components: { BoardComponent }
}
</script>

<style scoped lang="scss">
.grow:hover {
  transform: scale(1.01);
  transition: all .25s ease-in-out;
  }

  .radius-25 {
    border-radius: 25px;
  }

.move-left {
  position: relative;
  left: -50px;
}
</style>
