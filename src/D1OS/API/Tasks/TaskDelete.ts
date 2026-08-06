import { D1DeleteEndpoint } from "chanfana";
import { HandleArgs } from "../../types";
import TaskModel from "../../Models/TaskModel";

export class TaskDelete extends D1DeleteEndpoint<HandleArgs> {
  _meta = {
    model: TaskModel,
  };
}
