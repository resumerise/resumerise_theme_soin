import * as path from "https://deno.land/std@0.97.0/path/mod.ts";
import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts";

eta.configure({
  views: path.join("views"),
});

export const render = (jsonResume: string): string | Promise<string> | void => {
  var css = Deno.readTextFileSync("./style.css");
  var layout = Deno.readTextFileSync("./layout.eta");

  eta.templates.define(
    "award",
    eta.loadFile("./views/awards.eta", {} as any, true),
  );
  eta.templates.define(
    "basic",
    eta.loadFile("./views/basics.eta", {} as any, true),
  );
  eta.templates.define(
    "education",
    eta.loadFile("./views/education.eta", {} as any, true),
  );
  eta.templates.define(
    "interest",
    eta.loadFile("./views/interests.eta", {} as any, true),
  );
  eta.templates.define(
    "language",
    eta.loadFile("./views/languages.eta", {} as any, true),
  );
  eta.templates.define(
    "publication",
    eta.loadFile("./views/publications.eta", {} as any, true),
  );
  eta.templates.define(
    "reference",
    eta.loadFile("./views/references.eta", {} as any, true),
  );
  eta.templates.define(
    "skills",
    eta.loadFile("./views/skills.eta", {} as any, true),
  );
  eta.templates.define(
    "volunteer",
    eta.loadFile("./views/volunteer.eta", {} as any, true),
  );
  eta.templates.define(
    "work",
    eta.loadFile("./views/work.eta", {} as any, true),
  );

  return eta.render(layout, {
    css: css,
    resume: JSON.parse(jsonResume),
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
};
