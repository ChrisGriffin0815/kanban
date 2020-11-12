<template>
  <div class="listComponent float col-4" v-if="listProps.boardId == boardProp.id">
    <div class="radius-25 shadow-lg bg-light text-dark p-2 m-3">
      <div class="row">
        <div class="col-12">
          <h3 class="text-center p-1">
            {{ listProps.title }}
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <button class="btn"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapse'+listProps.id"
                  aria-expanded="false"
                  aria-controls="contentId"
          >
            <i class="fas fa-plus-circle text-dark"></i>
          </button>
          <button class="btn bg-transparent">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <TaskComponent v-for="task in tasks" class="row" :key="task.id" :task-props="task" :list-props="listProps" />

      <div class="collapse" :id="'collapse'+listProps.id">
        <div class="row">
          <div class="col-12">
            <form class="form-group" @submit="createTask(listProps.id)">
              <input class="form" type="text" placeholder="New Task" v-model="state.newTask.title">
              <button type="submit" class="btn btn-primary">
                +
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskComponent from '../components/TaskComponent'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
export default {
  name: 'ListComponent',
  props: ['listProps', 'boardProp'],
  setup() {
    const state = reactive({
      newTask: {

      }
    })

    return {
      state,
      tasks: computed(() => AppState.tasks),
      createTask(listId, newTask) {
        taskService.createTask(listId, state.newTask)
      },
      deleteTasks(listId) {
        taskService.deleteTasks(listId)
      }
    }
  },
  components: { TaskComponent }
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 25px;
}
</style>
