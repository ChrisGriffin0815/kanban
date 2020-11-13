<template>
  <div class="listComponent col-4 wrap" v-if="listProps.boardId == boardProp.id">
    <div class="radius-25 shadow-lg bg-light text-dark p-2 mt-2">
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
          <button @click="deleteList(listProps.id)" class="btn bg-transparent">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h3 class="text-center p-1">
            {{ listProps.title }}
          </h3>
        </div>
      </div>
      <TaskComponent v-for="task in tasks" class="row" :key="task.id" :task-props="task" :list-props="listProps" />

      <div class="collapse" :id="'collapse'+listProps.id">
        <div class="row">
          <div class="col-12">
            <form class="form-group" @submit.prevent="createTask(listProps.id)">
              <div class="d-flex">
                <input class="form-control radius-25 shadow grow" type="text" placeholder="New Task" v-model="state.newTask.title">
                <button type="submit" class="btn">
                  <i class="far fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <button v-if="!ID" class="btn btn-success radius-25" @click="copyId(listProps.id)">
              Import On
            </button>
            <button v-else-if="ID"
                    class="btn btn-danger radius-25"
                    @click="disableImport"
                    data-toggle="collapse"
                    :data-target="'#collapse'+listProps.id"
            >
              Import Off
            </button>
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
import { listService } from '../services/ListService'
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
      ID: computed(() => AppState.importId),

      createTask(listId, newTask) {
        taskService.createTask(listId, state.newTask)
      },
      deleteTasks(listId) {
        taskService.deleteTasks(listId)
      },
      deleteList(listId) {
        listService.deleteList(listId)
      },
      copyId(id) {
        AppState.importId = id
      },
      disableImport() {
        AppState.importId = null
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

.grow:hover {
  transform: scale(1.01);
  transition: all .10s ease-in-out;
  }

.move-left {
  position: relative;
  left: -50px;
}
.wrap{

  white-space: normal;

}

</style>
