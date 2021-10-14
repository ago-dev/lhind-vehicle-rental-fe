import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserReqModel } from '../model/req/user-req.model';
import { UserListModel } from '../model/res/user-list.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL!: string;
  pageSize!: number;
  pageNo!: number;

  constructor(private httpClient: HttpClient) { 
      this.URL = `${environment.baseURL}/user/`;
      this.pageSize = 10;
      this.pageNo = 1;
  }

  getUsersPage(pageNo: number, pageSize: number): Observable<UserListModel> {
    return this.httpClient.get<UserListModel>(`${this.URL}list?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  createUser(req: UserReqModel) :Observable<UserReqModel>{
    return this.httpClient.post<UserReqModel>(`${this.URL}`, req);
  }

  updateUser(req: UserReqModel) :Observable<UserReqModel>{
    return this.httpClient.put<UserReqModel>(`${this.URL}`, req);
  }

  deleteUser(id: number) :Observable<void>{
    return this.httpClient.delete<void>(`${this.URL}${id}`);
  }
}
