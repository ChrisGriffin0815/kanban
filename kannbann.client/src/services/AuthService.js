import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../AuthConfig'
import router from '../router'
import { setBearer } from './AxiosService'
import { profileService } from './ProfileService'
import { boardService } from './BoardService'
import { listService } from './ListService'
import { taskService } from './TaskService'
import { commentService } from './CommentService'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  setBearer(AuthService.bearer)
  await profileService.getProfile()
  AppState.user = AuthService.user
  await boardService.getAllBoards()
  await listService.getAllLists()
  await taskService.getAllTasks()
  await commentService.getAllComments()

  // NOTE if there is something you want to do once the user is authenticated, place that here
})
