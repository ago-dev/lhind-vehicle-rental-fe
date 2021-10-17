import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationRequest } from '../model/req/application-request.model';
import { ApplicationListModel } from '../model/res/application-list.model';
import { ApplicationRequestListModel } from '../model/res/application-request-list.model';
import { RentApplication } from '../model/res/rent-application.model';

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
    console.log('hey');
    return this.httpClient.post<ApplicationRequest>(`${this.URL}`, req);
  }

  updateApplication(id: number, req: ApplicationRequest): Observable<ApplicationRequest> {
    return this.httpClient.put<ApplicationRequest>(`${this.URL}${id}`, req);
  }

  listApplications(pageNo: number, pageSize: number): Observable<ApplicationListModel> {
    return this.httpClient.get<ApplicationListModel>(`${this.URL}list?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  deleteApplication(id: number) :Observable<void>{
    return this.httpClient.delete<void>(`${this.URL}${id}`);
  }
}
