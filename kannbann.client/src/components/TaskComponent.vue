<template>
  <div class="taskComponent" v-if="listProps.id == taskProps.listId">
    <div class="col-9">
      <p class="text-dark">
        {{ taskProps.title }}
      </p>
    </div>
    <div class="col-2 d-flex">
      <button class="btn btn-link text-green" data-toggle="modal" :data-target="'#modelId' + taskProps.id">
        +
      </button>
      <button class="text-danger btn btn-link" @click="deleteTask(taskProps.id)">
        &times;
      </button>
      <button class="btn" v-if="importId" @click="exportTask(importId, taskProps.id)">
        <i class="fas fa-file-export"></i>
      </button>
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
          <div class="modal-body">
            <h3 class="text-center">
              {{ taskProps.title }}
            </h3>
            <form @submit.prevent="addComment(taskProps.id)" class="pb-2">
              <div class="d-flex">
                <input type="text" class="form-control radius-25 shadow grow" v-model="state.newComment.title">
                <button class="btn">
                  <i class="far fa-paper-plane"></i>
                </button>
              </div>
            </form>

            <CommentComponent :task-props="taskProps" v-for="c in comments" :key="c.id" :comment-props="c" />
          </div>
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
      importId: computed(() => AppState.importId),

      addComment(taskId, comment) {
        commentService.addComment(taskId, state.newComment)
      },
      deleteTask(id) {
        taskService.deleteTask(id)
      },
      exportTask(importId, id) {
        taskService.exportTask(importId, id)
      }
    }
  },
  components: { CommentComponent }
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 25px;
}

.grow:hover {
  transform: scale(1.01);
  transition: all .10s ease-in-out;
  }

.move-left {
  position: relative;
  left: -50px;
}
</style>
