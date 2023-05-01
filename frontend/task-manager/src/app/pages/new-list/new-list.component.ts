import { Component,ViewChild,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {
  constructor(private taskservice: TaskService, private router: Router) { }
  @ViewChild('listTitle') listTitle: any;
  
  createList(title: string) {
    
    this.taskservice.createList(title).subscribe(
      {
        next:
          (res) => {
            console.log(res);
            this.router.navigate(['/lists', `${res._id}`])
          },
        error:
          (err) => {
            console.log(err)
          }
      })
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKeyPress(event: KeyboardEvent) {
    event.preventDefault(); // prevent the default behavior of the Enter key
    this.createList(this.listTitle.nativeElement.value);
  }
}
