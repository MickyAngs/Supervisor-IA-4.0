import { Hono } from "hono";

type Env = any;

const app = new Hono<{ Bindings: Env }>();

export default app;
