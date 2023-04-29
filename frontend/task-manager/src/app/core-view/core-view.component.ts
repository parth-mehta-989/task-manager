import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-core-view',
  templateUrl: './core-view.component.html',
  styleUrls: ['./core-view.component.scss'],
})
export class CoreViewComponent implements OnInit {
  constructor(private taskService: TaskService) {
  }
  ngOnInit(): void {
    // some code
  }
  
  creatNewList() {
    this.taskService.createList('List1').subscribe((res) => {
      console.log(res)
    })
  }

}
