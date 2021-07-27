import { render } from "./mod.ts";
import {
  getDefaultResume,
} from "https://deno.land/x/resumerise_library@0.0.3/mod.ts";
console.log(await render(getDefaultResume(), "PDF"));
