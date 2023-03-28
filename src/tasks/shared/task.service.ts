import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {
  // responsável pela integração com o banco de dados

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAll() {
    // busca infos no banco
    return await this.taskModel.find().exec();
  }

  async getById(id: string) {
    return await this.taskModel.findById(id).exec();
  }

  async create(task: Task) {
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  async update(id: string, task: Task) {
    await this.taskModel.updateOne({ _id: id }, task).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return await this.taskModel.deleteOne({ _id: id }).exec();
  }
}
