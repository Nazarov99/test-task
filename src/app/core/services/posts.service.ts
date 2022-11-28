import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostList} from "../interfaces/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiVersion = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private formUrl(methodUri: any) {
    return `${this.apiVersion}/${methodUri}`;
  }

  public getParams(filterParams: any) {
    const paramKeys: {[index: string]:any} = {};

    if (filterParams) {

      if (filterParams.hasOwnProperty('tag') && filterParams.tag) {
        paramKeys['tag'] = filterParams['tag'];
      }

      if (filterParams.hasOwnProperty('page') && filterParams.page) {
        paramKeys['page'] = filterParams['page'];
      }

      if (filterParams.hasOwnProperty('pageSize') && filterParams.pageSize) {
        paramKeys['pageSize'] = filterParams['pageSize'];
      }
    }
    return paramKeys;
  }

  getPosts(filterParams: any): Observable<PostList> {
    const params = new HttpParams({ fromObject: this.getParams(filterParams)});
    return this.http.get<PostList>(this.formUrl('getPosts'), {params});
  }


}
