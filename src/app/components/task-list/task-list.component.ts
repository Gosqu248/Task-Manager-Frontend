import {Component, OnInit} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {Task} from '../../interface/task';
import {MatCard} from '@angular/material/card';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {TaskService} from '../../service/task.service';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {TaskAddComponent} from '../task-add/task-add.component';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatCheckbox,
    FormsModule,
    MatCard,
    NgForOf,
    MatButton,
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{
  tasks: Task[] = [];

  constructor(private taskService: TaskService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  toggleCompleted(id: number) {
    this.taskService.completeTask(id).subscribe({
      next: (response: string) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error completing task:', error);
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (response: string) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }

  editTask(task: Task) {
    this.dialog.open(TaskAddComponent, {
      width: '600px',
      data: {
        option: 'edit',
        task: task
      }
    });
  }
}
