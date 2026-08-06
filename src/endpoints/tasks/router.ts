import { Hono } from "hono";
import { fromHono } from "chanfana";
import { TaskList } from "../../D1OS/API/Tasks/TaskList";
import { TaskCreate } from "../../D1OS/API/Tasks/TaskCreate";
import { TaskRead } from "../../D1OS/API/Tasks/TaskRead";
import { TaskUpdate } from "../../D1OS/API/Tasks/TaskUpdate";
import { TaskDelete } from "../../D1OS/API/Tasks/TaskDelete";

export const tasksRouter = fromHono(new Hono());

tasksRouter.get("/", TaskList);
tasksRouter.post("/", TaskCreate);
tasksRouter.get("/:id", TaskRead);
tasksRouter.put("/:id", TaskUpdate);
tasksRouter.delete("/:id", TaskDelete);
