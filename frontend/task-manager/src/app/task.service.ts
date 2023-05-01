import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './models/lists.interface';
import { Task } from './models/tasks.interface';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: WebRequestService) { }
  createList(title: string):Observable<List> {
    return this.httpService.post<List>(`lists`, { title });
  }
  createTask(title: string, listId: string):Observable<Task>{
    return this.httpService.post<Task>(`lists/${listId}/tasks`, { title });
  }
  getAllLists():Observable<List[]> {
    return this.httpService.get<List[]>('lists')
  }
  getListById(listId: string):Observable<List>{
    return this.httpService.get<List>(`lists/${listId}`)
  }
  getAllTasks(listId:string):Observable<Task[]> {
    return this.httpService.get<Task[]>(`lists/${listId}/tasks`)
  }
  getTaskById(listId:string, taskId:string):Observable<Task> {
    return this.httpService.get<Task>(`lists/${listId}/tasks/${taskId}`)
  }
  toggleCompletionOfTask(task:Task) {
    return this.httpService.patch<Task>(`lists/${task._listId}/tasks/${task._id}`,{"completed":!task.completed})
  }
  deleteTask(task:Task):Observable<Task> {
    return this.httpService.delete<Task>(`lists/${task._listId}/tasks/${task._id}`)
  }
  deleteList(list: List){
    return this.httpService.delete<List>(`lists/${list._id}`)
  }
  updateList(list: List):Observable<List> {
    return this.httpService.patch<List>(`lists/${list._id}`, list)
  }

  updateTask(task: Task):Observable<Task> {
    return this.httpService.patch<Task>(`lists/${task._listId}/tasks/${task._id}`, task)
  }
}
