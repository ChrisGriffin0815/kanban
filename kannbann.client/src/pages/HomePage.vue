<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12">
        <form action="" @submit.prevent="createBoard()">
          <div class="form-group">
            <input type="text"
                   name=""
                   id=""
                   class="form-control"
                   placeholder="Enter Title"
                   aria-describedby="helpId"
                   v-model="state.newBoard.title"
            >
          </div>
          <button type="submit" class="btn btn-dark btn-link">
            Create Board
          </button>
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
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
