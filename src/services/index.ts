
import { Provider } from '@/common/dependency-injection'
import { PlayService } from './play.service';
import { ApiService } from '@/services/api.service';
export { PlayService }

export const provide = Provider([
    PlayService,
    ApiService,
])
