import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditedElementType } from 'src/app/models/enums';
import { List } from 'src/app/models/lists.interface';
import { Task } from 'src/app/models/tasks.interface';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router:Router
  ) { }
  editedElementType: EditedElementType|undefined;
  listId!: string;
  previousValue!: string;
  taskId!: string ;
  selectedList!: List;
  selectedTask!: Task ;

  editValue(title: string) {
    switch (this.editedElementType) {
      case EditedElementType.List:{
        this.editList(title)
        break
      }
      case EditedElementType.Task: {
        this.editTask(title);
        break
      }
    }
  }
  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('listId')||'' ;
    this.taskId = this.route.snapshot.paramMap.get('taskId') ||'';
    if (this.taskId) {
      this.editedElementType = EditedElementType.Task
    } else {
      this.editedElementType = EditedElementType.List
    }
    this.getAndSetEditedElement(this.editedElementType)
  }

  getAndSetEditedElement(editedElementType: EditedElementType) {
    switch (editedElementType) {
      case EditedElementType.List:{
        this.getAndSetList()
        break
      }
      case EditedElementType.Task: {
        this.getAndSetTask();
      }
    }
      
  }

  getAndSetList(): void{
    this.taskService.getListById(this.listId).subscribe({
      next:
        (list) => {
          this.selectedList = list;
          this.previousValue = list.title;
        },
      error:
        (error) => {
          console.log(error)
        }
      }
    )
  }
  getAndSetTask(): void{
    this.taskService.getTaskById(this.listId, this.taskId).subscribe({
      next:
        (task) => {
          this.selectedTask = task;
          this.previousValue = task.title;
        },
      error:
        (error) => {
          console.log(error)
        }
      }
    )
  }
  editTask(title: string) {
    this.selectedTask.title = title
    this.taskService.updateTask(this.selectedTask).subscribe({
      next:
        (response) => {
          console.log(response);
          this.router.navigate(['../'])
        },
      error:
        (error) => {
          console.log(error);
        }
    });
  };

  editList(title: string) {
    this.selectedList.title = title
    this.taskService.updateList(this.selectedList).subscribe({
      next:
        (response) => {
          console.log(response);
          this.router.navigate(['../'])
        },
      error:
        (error) => {
          console.log(error);
        }
    });
  };

  }

