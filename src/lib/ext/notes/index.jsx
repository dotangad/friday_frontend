/* eslint-disable react/prop-types */
import z from "zod";
import { Create } from "./Create";
import { DisplayRow } from "./DisplayRow";

export const icon = "/notes-icon.png";
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
  DisplayRow,
  Create,
};