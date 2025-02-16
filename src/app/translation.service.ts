import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'https://transl.zeabur.app/fetch-and-translate';

  constructor(private http: HttpClient) { }

  fetchTranslation(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
