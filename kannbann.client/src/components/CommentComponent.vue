<template>
  <div class="commentComponent" v-if="commentProps.taskId == taskProps.id">
    <div class="row">
      <div class="col-10">
        <p>{{ commentProps.title }}</p>
      </div>
      <div class="col-2">
        <button class="text-danger btn btn-link" @click="deleteComment(commentProps.id)">
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { commentService } from '../services/CommentService'
export default {
  name: 'CommentComponent',
  props: ['commentProps', 'taskProps'],
  setup() {
    return {
      deleteComment(id) {
        commentService.deleteComment(id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
