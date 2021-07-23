import { render } from "./mod.ts";
import {
  compilePNG,
  getDefaultResume,
  ThemeAction,
  validateMeta,
} from "https://deno.land/x/resumerise_library@0.0.2/mod.ts";
console.log(await render(getDefaultResume(), "PDF"));
