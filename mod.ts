import * as stdPath from "https://deno.land/std@0.97.0/path/mod.ts";
import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts";
import generate from "https://x.nest.land/denoname@0.8.2/mod.ts";
import { ResumeriseMeta } from "../resumerise-theme-library/schema";
import { ThemeAction } from "../resumerise-theme-library/mod.ts";
const { dirname } = generate(import.meta);

eta.configure({
  views: stdPath.join("views"),
});
export default class Main implements ThemeAction {
  render(jsonResume: string, type: string): string | void | Promise<string> {
    const css = Deno.readTextFileSync(`/${dirname}/style.css`);
    const layout = Deno.readTextFileSync(`/${dirname}/layout.eta`);

    eta.templates.define(
      "award",
      eta.loadFile(`/${dirname}/views/awards.eta`, {} as any, true),
    );
    eta.templates.define(
      "basic",
      eta.loadFile(`/${dirname}/views/basics.eta`, {} as any, true),
    );
    eta.templates.define(
      "education",
      eta.loadFile(`/${dirname}/views/education.eta`, {} as any, true),
    );
    eta.templates.define(
      "interest",
      eta.loadFile(`/${dirname}/views/interests.eta`, {} as any, true),
    );
    eta.templates.define(
      "language",
      eta.loadFile(`/${dirname}/views/languages.eta`, {} as any, true),
    );
    eta.templates.define(
      "publication",
      eta.loadFile(`/${dirname}/views/publications.eta`, {} as any, true),
    );
    eta.templates.define(
      "reference",
      eta.loadFile(`/${dirname}/views/references.eta`, {} as any, true),
    );
    eta.templates.define(
      "skills",
      eta.loadFile(`/${dirname}/views/skills.eta`, {} as any, true),
    );
    eta.templates.define(
      "volunteer",
      eta.loadFile(`/${dirname}/views/volunteer.eta`, {} as any, true),
    );
    eta.templates.define(
      "work",
      eta.loadFile(`/${dirname}/views/work.eta`, {} as any, true),
    );

    return eta.render(layout, {
      css: css,
      resume: JSON.parse(jsonResume),
      type: type,
      templates: [
        "basic",
        "award",
        "education",
        "interest",
        "language",
        "publication",
        "reference",
        "skills",
        "volunteer",
        "work",
      ],
    });
  }
  get schema(): ResumeriseMeta {
    return "TEST";
  }
}
