// src/app/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.SERVER_URL);
  }

  public register(userId: string): void {
    this.socket.emit('register', userId);
  }

  public sendTask(task: any): void {
    this.socket.emit('send-task', task);
  }

  public onTaskCompleted(callback: (result: any) => void): void {
    this.socket.on('task-completed', callback);
  }

  public onTaskResponse(callback: (response: any) => void): void {
    this.socket.on('task-response', callback);
  }

  public onTaskError(callback: (error: any) => void): void {
    this.socket.on('task-error', callback);
  }
}
