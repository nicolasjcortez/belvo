import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from 'src/environments/environment';

const API_URL = api.url;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  createLink(link: string, institution: string): Observable<any> {
    return this.http.post(API_URL + 'users/me/links', {
      "link": link,
      "institution": institution
    }, httpOptions);
  }

  getAccounts(link: string): Observable<any> {
    return this.http.post(API_URL + 'accounts', {
      "link": link
    }, httpOptions);
  }

  getOwners(link: string): Observable<any> {
    return this.http.post(API_URL + 'owners', {
      "link": link
    }, httpOptions);
  }

  getIncomeReport(link: string, account: string): Observable<any> {
    return this.http.post(API_URL + 'incomes', {
      "link_id": link,
      "account_id": account
    }, httpOptions);
  }

  getTransactionsTable(link: string, account: string): Observable<any> {
    return this.http.post(API_URL + 'transactions_table', {
      "link_id": link,
      "account_id": account
    }, httpOptions);
  }

  getLinks(): Observable<any> {
    return this.http.get(API_URL + 'users/me/links/details', {
    });
  }
  
}


