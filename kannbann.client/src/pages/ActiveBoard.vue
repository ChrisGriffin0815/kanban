<template>
  <div class="activeBoardPage container-fluid">
    <transition-group name="fade">
      <div class="row">
        <div class="col-12 d-flex my-2">
          <h1 class="text-left p-2">
            {{ activeBoard.title }}
          </h1>
          <div class="my-auto pl-2 grow"
               data-toggle="collapse"
               data-target="#contentId"
          >
            <i class="fas fa-caret-down fa-3x"></i>
          </div>
        </div>
      </div>

      <div class="row collapse" id="contentId">
        <div class="col-6 offset-3 py-2">
          <newListComponent :board-prop="activeBoard" />
        </div>
      </div>
    </transition-group>

    <div class="scroll d-flex h-100">
      <listComponent v-for="list in lists" :key="list.id" :board-prop="activeBoard" :list-props="list" />
    </div>
  </div>
</template>

<script>
import ListComponent from '../components/ListComponent'
import NewListComponent from '../components/NewListComponent'
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { boardService } from '../services/BoardService'
import { useRoute } from 'vue-router'

export default {
  name: 'ActiveBoardPage',
  setup() {
    const route = useRoute()
    onMounted(() => {
      boardService.getActiveBoard(route.params.boardId)
    })
    return {
      activeBoard: computed(() => AppState.activeBoard),
      lists: computed(() => AppState.lists),
      tasks: computed(() => AppState.tasks),
      comments: computed(() => AppState.comments)

    }
  },
  components: { ListComponent, NewListComponent }
}
</script>

<style lang="scss" scoped>
.radius-25 {
  border-radius: 25px;
}

.border-box {
  border: 2px solid black;
}

.grow:hover {
  transform: scale(1.01);
  transition: all .25s ease-in-out;
  }

.scroll{

  white-space: nowrap;
  overflow-x: auto;

}
</style>
