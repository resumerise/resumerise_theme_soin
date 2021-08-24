import { Resume } from "../resumerise_library/codegen/model/resume.ts";
import { render } from "./main.ts";

// resume
const resume = JSON.parse(Deno.args[0]) as Resume;
// type
const type = Deno.args[1];

console.log(await render(resume, type));
