import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {TaskAddComponent} from '../task-add/task-add.component';

@Component({
  selector: 'app-header',
  imports: [
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {
  }

  goToAddTask() {
    this.dialog.open(TaskAddComponent, {
      width: '600px',
      data: {
        option: 'add',
      }
    });
  }
}
