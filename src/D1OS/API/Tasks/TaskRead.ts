import { D1ReadEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import TaskModel from "../../Models/TaskModel";

export class TaskRead extends D1ReadEndpoint<HandleArgs> {
  _meta = {
    model: TaskModel,
  };
}
