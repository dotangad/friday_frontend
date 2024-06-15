import z from "zod";
import { Create } from "./Create";

export const icon = "/new-note.png";
export const name = "notes";
export const identifier = "notes";
export const description = "A simple note taking extension";
export const version = "1.0.0";

export default {
  icon,
  name,
  identifier,
  description,
  version,
  contentSchema: z.object({
    title: z.string(),
    content: z.string(),
  }),
  hooks: {},
  EditPage: () => <></>, // TODO: render for view
  DisplayRow: () => <></>, // TODO: render for view
  Create, // TODO: render for view
};