import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationRequest } from '../model/req/application-req.model';
import { ApplicationRequestListModel } from '../model/res/application-request-list.model';

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

  createApplication(req: ApplicationRequest): Observable<ApplicationRequest> {
    return this.httpClient.post<ApplicationRequest>(`${this.URL}`, req);
  }
}
