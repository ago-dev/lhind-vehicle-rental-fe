import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationRequestListModel } from '../model/res/application-request-list.model';
import { ApplicationRequest } from '../model/res/application-request.model';

@Injectable({
  providedIn: 'root'
})
export class RentApplicationService {
  URL!: string;

  constructor(private httpClient: HttpClient) {
    this.URL = `${environment.baseURL}/application/`;
   }

  getPendingApplications(pageNo: number, pageSize: number): Observable<ApplicationRequestListModel> {
    return this.httpClient.get<ApplicationRequestListModel>(`${this.URL}pending/list?pageNo=${pageNo}&pageSize=${pageSize}`);
  }
}
