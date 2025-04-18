import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Task, TaskRequest} from '../interface/task';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = environment.api + '/api/task';

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshTasks();
  }

  private refreshTasks() {
    this.getAllTasks().subscribe(tasks => this.tasksSubject.next(tasks));
  }

  private getAllTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskRequest): Observable<string> {
    return this.http.post(this.apiUrl, task, { responseType: 'text' }).pipe(
      tap(() => this.refreshTasks())
    );
  }

  updateTask(id: number, task: TaskRequest) {
    return this.http.put(`${this.apiUrl}/${id}`, task, { responseType: 'text' }).pipe(
      tap(() => this.refreshTasks())
    );
  }

  completeTask(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/complete/${id}`, null, { responseType: 'text' }).pipe(
      tap(() => this.refreshTasks())
    );
  }

  deleteTask(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
      tap(() => this.refreshTasks())
    );
  }

}
