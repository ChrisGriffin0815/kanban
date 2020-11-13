<template>
  <div class="boardComponent col-4" v-if="boardProps.creatorId == profile.id">
    <div class="shadow-lg radius-25 bg-light text-dark p-2 m-3">
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <button @click="deleteBoard(boardProps.id)" class="btn grow">
            <i class="far fa-times-circle text-danger"></i>
          </button>

          <button type="button" class="btn grow" data-toggle="modal" :data-target="'#edit'+boardProps.id">
            <i class="far fa-edit text-primary"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 py-2 text-center">
          <h3>
            {{ boardProps.title }}
          </h3>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade"
           :id="'edit'+boardProps.id"
           tabindex="-1"
           role="dialog"
           aria-labelledby="modelTitleId"
           aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                Edit Board Title
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="" @click.prevent="editBoard(state.newBoard, boardProps.id)">
                <div class="d-flex">
                  <input type="text" class="form-control radius-25 shadow" :placeholder="boardProps.title" v-model="state.newBoard.title">
                  <button type="submit" class="btn bg-transparent move-left">
                    <i class="far fa-paper-plane text-dark"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{name: 'ActiveBoard', params: {boardId: boardProps.id}}" class=" text-dark">
      <h6 class="text-right">
        See Board
      </h6>
    </router-link>
  </div>
</template>

<script>
import { boardService } from '../services/BoardService'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'BoardComponent',
  props: ['boardProps'],
  setup() {
    const state = reactive({
      newBoard: {

      }
    })

    return {
      state,
      deleteBoard(id) {
        boardService.deleteBoard(id)
      },
      editBoard(newBoard, id) {
        boardService.editBoard(state.newBoard, id)
      },
      profile: computed(() => AppState.profile),
      lists: computed(() => AppState.lists),
      // lists: computed(() => AppState.lists.filter(
      //   list => list.boardId == AppState.boards
      // )),
      boards: computed(() => AppState.boards)

    }
  },
  components: { }
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 25px;
}
.grow:hover {
  transform: scale(1.01);
  transition: all .25s ease-in-out;
  }

  .move-left {
    position: relative;
    left: -50px;
  }

</style>
