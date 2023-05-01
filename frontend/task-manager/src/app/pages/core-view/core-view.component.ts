import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/lists.interface';
import { Task } from 'src/app/models/tasks.interface';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-core-view',
  templateUrl: './core-view.component.html',
  styleUrls: ['./core-view.component.scss'],
})
export class CoreViewComponent  implements OnInit {
  constructor(private taskService: TaskService,
    private route: ActivatedRoute
  ) {
  }
  lists!: List[];
  tasks!: Task[] ;
  isAnyListSelected!: boolean;
  selectedListId!: string;
  ngOnInit(): void {
    this.taskService.getAllLists().subscribe({
      next: (lists) => {
        this.lists = lists;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.route.params.subscribe(
      {
        next:
          (params) => {
            this.isAnyListSelected = params["listId"] ? true : false;

            if (this.isAnyListSelected) {
              this.selectedListId = params["listId"]
              this.taskService.getAllTasks(this.selectedListId).subscribe({
                next:
                  (tasks) => {
                    console.log(tasks);
                    this.tasks = tasks;
                  },
                error:
                  (error) => {
                    console.log(error);
                  }
              },
              );
            }
          },
        error:
          (error) => {
            console.log(error);
          }
      }
    );
  };

  toggleCompletionOfTask(task:Task) {
      this.taskService.toggleCompletionOfTask(task).subscribe(
        {
          next: (response) => {
            console.log(response);
            task.completed = !task.completed;
          },
          error: (error) => { console.log(error); }
        }
      )
  };

  deleteTask(taskToBeDeleted:Task) {
      this.taskService.deleteTask(taskToBeDeleted).subscribe(
        {
          next: (response) => {
            console.log("deleted task:", response);
            this.tasks = this.tasks.filter((task)=>{return task._id !== taskToBeDeleted._id})
          },
          error:(error)=>{console.log(error)}
        }
      )
  };
  deleteList(list: List) {
    this.taskService.deleteList(list).subscribe({
      next: (deletedList) => {
        console.log(deletedList)
        this.lists = this.lists.filter((list)=>{return list._id !== deletedList._id})
      }
    })
  }
}
