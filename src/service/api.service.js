export class ApiService{
    onInit(DI){
        const http = DI.get('http')
        http.get('')
    }
}