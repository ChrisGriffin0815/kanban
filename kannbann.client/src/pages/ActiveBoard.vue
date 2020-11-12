<template>
  <div class="activeBoardPage container-fluid">
    <div class="row">
      <div class="col-6 offset-3 pt-4">
        <newListComponent :board-prop="activeBoard" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1 class="text-center p-3">
          {{ activeBoard.title }}
        </h1>
      </div>
    </div>
    <div class="row">
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
</style>
