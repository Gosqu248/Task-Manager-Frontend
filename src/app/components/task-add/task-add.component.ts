import {Component, Inject} from '@angular/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {TaskRequest} from '../../interface/task';
import {TaskService} from '../../service/task.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-task-add',
  imports: [
    MatInput,
    FormsModule,
    MatFormField,
    MatButton
  ],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent {
  title: any;
  description: any;

  constructor(private taskService: TaskService,
              private matDialog: MatDialogRef<TaskAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.task) {
      this.title = data.task.title;
      this.description = data.task.description;
    }
  }

  addTask() {
    if (!this.title || !this.description) {
      return;
    }
    const task: TaskRequest = {
      title: this.title,
      description: this.description,
    };

    if (this.data.option === 'edit') {
      this.taskService.updateTask(this.data.task.id, task).subscribe({
        next: (response: string) => {
          console.log(response);
          this.title = '';
          this.description = '';
          this.matDialog.close();
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: (response: string) => {
          console.log(response);
          this.title = '';
          this.description = '';
          this.matDialog.close();
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });
    }
  }
}
