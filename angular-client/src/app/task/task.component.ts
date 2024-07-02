// src/app/task/task.component.ts
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  userId: string = '';
  taskData: string = '';
  taskResult: any;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.onTaskCompleted((result) => {
      this.taskResult = result;
    });

    this.socketService.onTaskResponse((response) => {
      console.log('Task response:', response);
    });

    this.socketService.onTaskError((error) => {
      console.error('Task error:', error);
    });
  }

  registerUser(): void {
    this.socketService.register(this.userId);
  }

  sendTask(): void {
    const task = {
      userId: this.userId,
      data: { text: this.taskData }
    };
    this.socketService.sendTask(task);
  }
}
