import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  constructor(private taskService:TaskService, private route: ActivatedRoute, private router:Router) { }
  
  
  createTask(title: string) {
    this.route.params.subscribe({
      next:
        (params) => {
          if (params['listId']) {
            let listId = params['listId'] as string;
            this.taskService.createTask(title, listId).subscribe({
              next:
                (task) => {
                  console.log(task);
                  this.router.navigate(['../'], {relativeTo:this.route})
                },
              error:
                (error) => {
                  console.log(error)
                  this.router.navigate(['../'], {relativeTo:this.route})

                }
            })
          }
        },
      error: (error) => {
        console.log(error)
        this.router.navigate(['../'], {relativeTo:this.route})
      }
    })
    
  }
}
