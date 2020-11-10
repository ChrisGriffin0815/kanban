<template>
  <div class="boardComponent col-4 text-center">
    <div class="shadow rounded p-2 m-3">
      <h3>
        {{ boardProps.title }}
      </h3>
      <button @click="deleteBoard(boardProps.id)" class="btn btn-danger">
        Delete
      </button>

      <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#edit'+boardProps.id">
        Edit
      </button>

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
                Modal title
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="" @click="editBoard(state.newBoard, boardProps.id)">
                <input type="text" :placeholder="boardProps.title" v-model="state.newBoard.title">
                <button type="submit" class="btn btn-primary">
                  Submit
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
import { reactive } from 'vue'

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
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
