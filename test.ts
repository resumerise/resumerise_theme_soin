import { render } from "./mod.ts";

const result = await render(Deno.readTextFileSync('./resume.json'));

console.log(result);