<template>
  <div class="boardComponent col-4" v-if="boardProps.creatorId == profile.id">
    <div class="shadow-lg radius-25 bg-light text-dark p-2 m-3">
      <div class="row">
        <div class="col-12 d-flex justify-content-start">
          <button @click="deleteBoard(boardProps.id)" class="btn">
            <i class="far fa-times-circle text-danger"></i>
          </button>

          <button type="button" class="btn" data-toggle="modal" :data-target="'#edit'+boardProps.id">
            <i class="far fa-edit text-primary"></i>
          </button>

          <button class="btn"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapse'+boardProps.id"
                  aria-expanded="false"
                  aria-controls="contentId"
          >
            <i class="fas fa-plus-circle text-success"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 py-2">
          <h3>
            {{ boardProps.title }}
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <ListComponent v-for="list in lists" :list-props="list" :board-prop="boardProps" :key="list.id" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="collapse" :id="'collapse'+boardProps.id">
            <newListComponent :board-prop="boardProps" />
          </div>
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
              <form action="" @click="editBoard(state.newBoard, boardProps.id)">
                <input type="text" :placeholder="boardProps.title" v-model="state.newBoard.title">
                <button type="submit" class="btn bg-transparent">
                  <i class="far fa-paper-plane text-dark"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { boardService } from '../services/BoardService'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import NewListComponent from '../components/NewListComponent'
import ListComponent from '../components/ListComponent'
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
  components: { NewListComponent, ListComponent }
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 25px;
}

</style>
