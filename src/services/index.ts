
import { Provider } from '@/common/dependency-injection'
import { PlayService } from '@/services/play.service';
import { ApiService } from '@/services/api.service';
export { PlayService,ApiService }

export const provide = Provider([
    PlayService,
    ApiService,
])
