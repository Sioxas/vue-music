import Vue from 'vue';
import { HttpHeaders, HttpOptions, HttpResponse, $http, $resource } from 'vue-resource/types/vue_resource';

declare module 'vue/types/vue' {
    interface VueConstructor {
        http: {
            (options: HttpOptions): PromiseLike<HttpResponse>;
            get: $http;
            post: $http;
            put: $http;
            patch: $http;
            delete: $http;
            jsonp: $http;
        };
        resource: $resource;
    }
}
