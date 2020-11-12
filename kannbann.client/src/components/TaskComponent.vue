<template>
  <div class="taskComponent" v-if="listProps.id == taskProps.listId">
    <div class="col-12 d-flex justify-content-between">
      <p class="bg-dark text-light">
        {{ taskProps.title }}
      </p>
      <div>
        <button class="btn btn-link text-green" data-toggle="modal" :data-target="'#modelId' + taskProps.id">
          +
        </button>
        <button class="text-danger btn btn-link" @click="deleteTask(taskProps.id)">
          &times;
        </button>
      </div>
    </div>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade"
         :id="'modelId' + taskProps.id"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Comments
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <h3>{{ taskProps.title }}</h3>
          <form @submit.prevent="addComment(taskProps.id)">
            <input type="text" v-model="state.newComment.title">
            <button class="btn">
              add
            </button>
          </form>
          <CommentComponent :task-props="taskProps" v-for="c in comments" :key="c.id" :comment-props="c" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import CommentComponent from '../components/CommentComponent'
import { reactive, computed } from 'vue'
import { commentService } from '../services/CommentService'
import { taskService } from '../services/TaskService'
export default {
  name: 'TaskComponent',
  props: ['listProps', 'taskProps'],
  setup() {
    const state = reactive({
      newComment: {

      }
    })
    return {
      state,
      comments: computed(() => AppState.comments),
      addComment(taskId, comment) {
        commentService.addComment(taskId, state.newComment)
      },
      deleteTask(id) {
        taskService.deleteTask(id)
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>

</style>
