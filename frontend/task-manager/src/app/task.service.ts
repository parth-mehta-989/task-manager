import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpService: WebRequestService) { }
  createList(title: string) {
    return this.httpService.post(`lists`, { title });
  }
  createTask(title: string, listId: string) {
    return this.httpService.post(`lists/${listId}/tasks`, { title });
  }
}
