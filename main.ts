import * as stdPath from "https://deno.land/std@0.97.0/path/mod.ts";
import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts";
import { ResumeriseMeta } from "resumerise_library/mod.ts";
import { Resume } from "../resumerise_library/codegen/models/model/resume.ts";

const __dirname = stdPath.dirname(stdPath.fromFileUrl(import.meta.url));

eta.configure({
  views: stdPath.join("views"),
});

export const render = async (
  resume: Resume,
  type: string,
): Promise<string> => {
  const css = Deno.readTextFileSync(`${__dirname}/style.css`);
  const layout = Deno.readTextFileSync(`${__dirname}/layout.eta`);

  const awardTemplateName = "awards";
  eta.templates.define(
    awardTemplateName,
    eta.loadFile(`${__dirname}/views/awards.eta`, {} as any, true),
  );

  const basicTemplateName = "basic";
  eta.templates.define(
    basicTemplateName,
    eta.loadFile(`${__dirname}/views/basics.eta`, {} as any, true),
  );

  const profileTemplateName = "profile";
  eta.templates.define(
    profileTemplateName,
    eta.loadFile(`${__dirname}/views/profiles.eta`, {} as any, true),
  );

  const educationTemplateName = "education";
  eta.templates.define(
    educationTemplateName,
    eta.loadFile(`${__dirname}/views/education.eta`, {} as any, true),
  );

  const interestTemplateName = "interest";
  eta.templates.define(
    interestTemplateName,
    eta.loadFile(`${__dirname}/views/interests.eta`, {} as any, true),
  );

  const languageTemplateName = "language";
  eta.templates.define(
    languageTemplateName,
    eta.loadFile(`${__dirname}/views/languages.eta`, {} as any, true),
  );

  const publicationTemplateName = "publication";
  eta.templates.define(
    publicationTemplateName,
    eta.loadFile(`${__dirname}/views/publications.eta`, {} as any, true),
  );

  const referenceTemplateName = "reference";
  eta.templates.define(
    referenceTemplateName,
    eta.loadFile(`${__dirname}/views/references.eta`, {} as any, true),
  );

  const skillsTemplateName = "skills";
  eta.templates.define(
    skillsTemplateName,
    eta.loadFile(`${__dirname}/views/skills.eta`, {} as any, true),
  );

  const volunteerTemplateName = "volunteer";
  eta.templates.define(
    volunteerTemplateName,
    eta.loadFile(`${__dirname}/views/volunteer.eta`, {} as any, true),
  );

  const workTemplateName = "work";
  eta.templates.define(
    workTemplateName,
    eta.loadFile(`${__dirname}/views/work.eta`, {} as any, true),
  );

  const projectTemplateName = "project";
  eta.templates.define(
    projectTemplateName,
    eta.loadFile(`${__dirname}/views/projects.eta`, {} as any, true),
  );

  const certificateTemplateName = "certification";
  eta.templates.define(
    certificateTemplateName,
    eta.loadFile(`${__dirname}/views/certifications.eta`, {} as any, true),
  );

  const dateRangeTemplateName = "date-range";
  eta.templates.define(
    dateRangeTemplateName,
    eta.loadFile(`${__dirname}/views/date-range.eta`, {} as any, true),
  );

  const map = new Map<string, string>();
  map.set("AWARDS", awardTemplateName);
  map.set("BASICS", basicTemplateName);
  map.set("PROFILE", profileTemplateName);
  map.set("PROJECT", projectTemplateName);
  map.set("EDUCATION", educationTemplateName);
  map.set("CERTIFICATE", certificateTemplateName);
  map.set("INTEREST", interestTemplateName);
  map.set("LANGUAGE", languageTemplateName);
  map.set("PUBLICATION", publicationTemplateName);
  map.set("REFERENCE", referenceTemplateName);
  map.set("SKILL", skillsTemplateName);
  map.set("VOLUNTEER", volunteerTemplateName);
  map.set("WORK", workTemplateName);

  const orderedMap = new Map<string, string>();
  resume.settings?.visibleCategories?.forEach((resumeCategory) => {
    orderedMap.set(resumeCategory, map.get(resumeCategory)!);
  });

  try {
    const result = await eta.render(layout, {
      css: css,
      resume: resume,
      type: type,
      templates: Array.from(orderedMap.values()).filter((item) => !!item),
    }) as string;
    return result;
  } catch (e) {
    console.log(`Error while compiling resume: ${e}`);
    return "";
  }
};

export const getMeta = (): ResumeriseMeta => {
  return JSON.parse(
    Deno.readTextFileSync(
      `${__dirname}/meta.json`,
    ),
  ) as ResumeriseMeta;
};
