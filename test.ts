import { render } from "./mod.ts";
import htmlPrettify from 'https://cdn.skypack.dev/html-prettify';

const result = await render(Deno.readTextFileSync('./resume.json'));

console.log(htmlPrettify(result));