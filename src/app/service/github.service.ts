import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string;
  language: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private username = 'manasaku-panda';
  private apiUrl = `https://api.github.com/users/${this.username}/repos?sort=updated&per_page=10`;

  constructor(private http: HttpClient) {}

  getRepos(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(this.apiUrl);
  }
}
