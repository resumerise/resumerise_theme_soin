import { render } from "./mod.ts";
import {
  getDefaultResume,
} from "https://deno.land/x/resumerise_library/mod.ts";
console.log(await render(getDefaultResume(), "PDF"));
