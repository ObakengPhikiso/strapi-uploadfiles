import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData = environment.candidate;
  files = environment.strapiUploadFiles;

  constructor(private http: HttpClient) { }

  sendUserData(data: any): any {
    return this.http.post(this.userData, data);
  }


  upload(files: File, data?): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('files', files);
    formData.append('refId', data.refId);
    formData.append('field', data.field);
    formData.append('ref', data.ref);

    const req = new HttpRequest('POST', `${this.files}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
}
