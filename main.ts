import * as stdPath from "https://deno.land/std@0.97.0/path/mod.ts";
import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts";
import { ResumeriseMeta } from "resumerise_library/mod.ts";
import { Resume } from "../resumerise_library/codegen/models/model/resume.ts";
import { format } from "https://deno.land/std@0.102.0/datetime/mod.ts";
import { Settings } from "../resumerise_library/codegen/models/model/settings.ts";

const __dirname = stdPath.dirname(stdPath.fromFileUrl(import.meta.url));

function formatDate(timestamp: string, settings: Settings) {
  try {
    return format(new Date(timestamp), settings?.dateFormat!);
  } catch (e) {
    console.log(`Date could not be formatted ${e}`);
  }
}

eta.configure({
  views: stdPath.join("views"),
});

export const render = async (
  resume: Resume,
  type: string,
): Promise<string> => {
  const css = Deno.readTextFileSync(`${__dirname}/css/style.css`);
  const layout = Deno.readTextFileSync(`${__dirname}/templates/layout.eta`);

  const awardTemplateName = "awards";
  eta.templates.define(
    awardTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/awards.eta`,
      {} as any,
      true,
    ),
  );

  const basicTemplateName = "basic";
  eta.templates.define(
    basicTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/basics.eta`,
      {} as any,
      true,
    ),
  );

  const profileTemplateName = "profile";
  eta.templates.define(
    profileTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/profiles.eta`,
      {} as any,
      true,
    ),
  );

  const educationTemplateName = "education";
  eta.templates.define(
    educationTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/education.eta`,
      {} as any,
      true,
    ),
  );

  const interestTemplateName = "interest";
  eta.templates.define(
    interestTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/interests.eta`,
      {} as any,
      true,
    ),
  );

  const languageTemplateName = "language";
  eta.templates.define(
    languageTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/languages.eta`,
      {} as any,
      true,
    ),
  );

  const publicationTemplateName = "publication";
  eta.templates.define(
    publicationTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/publications.eta`,
      {} as any,
      true,
    ),
  );

  const referenceTemplateName = "reference";
  eta.templates.define(
    referenceTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/references.eta`,
      {} as any,
      true,
    ),
  );

  const skillsTemplateName = "skills";
  eta.templates.define(
    skillsTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/skills.eta`,
      {} as any,
      true,
    ),
  );

  const volunteerTemplateName = "volunteer";
  eta.templates.define(
    volunteerTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/volunteer.eta`,
      {} as any,
      true,
    ),
  );

  const workTemplateName = "work";
  eta.templates.define(
    workTemplateName,
    eta.loadFile(`${__dirname}/templates/categories/work.eta`, {} as any, true),
  );

  const projectTemplateName = "project";
  eta.templates.define(
    projectTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/projects.eta`,
      {} as any,
      true,
    ),
  );

  const certificateTemplateName = "certification";
  eta.templates.define(
    certificateTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/certifications.eta`,
      {} as any,
      true,
    ),
  );

  const dateRangeTemplateName = "date-range";
  eta.templates.define(
    dateRangeTemplateName,
    eta.loadFile(
      `${__dirname}/templates/widgets/date-range.eta`,
      {} as any,
      true,
    ),
  );

  const keyValueTemplateName = "key-value-item";
  eta.templates.define(
    keyValueTemplateName,
    eta.loadFile(
      `${__dirname}/templates/widgets/key-value-item.eta`,
      {} as any,
      true,
    ),
  );

  const listTemplateName = "list";
  eta.templates.define(
    listTemplateName,
    eta.loadFile(
      `${__dirname}/templates/widgets/list.eta`,
      {} as any,
      true,
    ),
  );

  const locationTemplateName = "location";
  eta.templates.define(
    locationTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/location.eta`,
      {} as any,
      true,
    ),
  );

  const profilePictureTemplateName = "profile-picture";
  eta.templates.define(
    profilePictureTemplateName,
    eta.loadFile(
      `${__dirname}/templates/categories/profile-picture.eta`,
      {} as any,
      true,
    ),
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
  map.set("LOCATION", locationTemplateName);
  map.set("VOLUNTEER", volunteerTemplateName);
  map.set("WORK", workTemplateName);

  const orderedMap = new Map<string, string>();
  resume.settings?.visibleCategories?.forEach((resumeCategory) => {
    orderedMap.set(resumeCategory, map.get(resumeCategory)!);
  });

  try {
    const result = await eta.render(layout, {
      css: css,
      formatDate: formatDate,
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
