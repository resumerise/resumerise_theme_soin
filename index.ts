import * as path from 'https://deno.land/std@0.97.0/path/mod.ts';
import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts"
import makeloc from 'https://deno.land/x/dirname@1.1.2/mod.ts'
const { __dirname } = makeloc(import.meta)

eta.configure({
  views: path.join(__dirname, 'views')
});

function _render(resume: string): string | Promise<string> | void {
  var css = Deno.readFileSync(__dirname + '/style.css');
  var tpl = Deno.readFileSync(__dirname + '/layout.eta');
  return eta.render(tpl.toString(), {
    css: css,
    resume: resume,
  });
}

export const render = _render;
