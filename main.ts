import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts";
import {
  CompileException,
  getAddItemTemplatePath,
  getNavTemplatePath,
  getWidgetCSSFilePath,
  ResumeriseMeta,
} from "resumerise_library/mod.ts";
import { Resume } from "../resumerise_library/codegen/model/resume.ts";
import { format } from "https://deno.land/std@0.102.0/datetime/mod.ts";
import { Settings } from "../resumerise_library/codegen/model/settings.ts";
// use polyfill to load file with file:/// and href://
import "https://deno.land/x/file_fetch@0.2.0/polyfill.ts";

function formatDate(timestamp: string, settings: Settings) {
  try {
    return format(new Date(timestamp), settings?.dateFormat!);
  } catch (e) {
    console.log(`Date could not be formatted ${e}`);
  }
}

async function getFileContent(path: string): Promise<string> {
  console.log("import-meta-url: " + import.meta.url);
  return (await (await globalThis.fetch(
    new URL(
      path,
      import.meta.url,
    ).href,
  )).text());
}

export const render = async (
  resume: Resume,
  type: string,
): Promise<string> => {
  try {
    const layout = await getFileContent("./templates/layout.eta");
    const css = await getFileContent("./css/style.css");

    const awardTemplateName = "awards";
    eta.templates.define(
      awardTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/awards.eta"),
      ),
    );

    const basicTemplateName = "basic";
    eta.templates.define(
      basicTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/basics.eta"),
      ),
    );

    const profileTemplateName = "profile";
    eta.templates.define(
      profileTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/profiles.eta"),
      ),
    );

    const educationTemplateName = "education";
    eta.templates.define(
      educationTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/education.eta"),
      ),
    );

    const interestTemplateName = "interest";
    eta.templates.define(
      interestTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/interests.eta"),
      ),
    );

    const languageTemplateName = "language";
    eta.templates.define(
      languageTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/languages.eta"),
      ),
    );

    const publicationTemplateName = "publication";
    eta.templates.define(
      publicationTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/publications.eta"),
      ),
    );

    const referenceTemplateName = "reference";
    eta.templates.define(
      referenceTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/references.eta"),
      ),
    );

    const skillsTemplateName = "skills";
    eta.templates.define(
      skillsTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/skills.eta"),
      ),
    );

    const volunteerTemplateName = "volunteer";
    eta.templates.define(
      volunteerTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/volunteer.eta"),
      ),
    );

    const workTemplateName = "work";
    eta.templates.define(
      workTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/work.eta"),
      ),
    );

    const projectTemplateName = "project";
    eta.templates.define(
      projectTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/projects.eta"),
      ),
    );

    const certificateTemplateName = "certification";
    eta.templates.define(
      certificateTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/certifications.eta"),
      ),
    );

    const dateRangeTemplateName = "date-range";
    eta.templates.define(
      dateRangeTemplateName,
      eta.compile(
        await getFileContent("./templates/widgets/date-range.eta"),
      ),
    );

    const keyValueTemplateName = "key-value-item";
    eta.templates.define(
      keyValueTemplateName,
      eta.compile(
        await getFileContent("./templates/widgets/key-value-item.eta"),
      ),
    );

    const listTemplateName = "list";
    eta.templates.define(
      listTemplateName,
      eta.compile(
        await getFileContent("./templates/widgets/list.eta"),
      ),
    );

    const locationTemplateName = "location";
    eta.templates.define(
      locationTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/location.eta"),
      ),
    );

    const profilePictureTemplateName = "profile-picture";
    eta.templates.define(
      profilePictureTemplateName,
      eta.compile(
        await getFileContent("./templates/categories/profile-picture.eta"),
      ),
    );

    /** ! DO NOT REMOVE ! ------------ begin */
    const widgetCss = getWidgetCSSFilePath();

    const navTemplateName = "nav";
    eta.templates.define(
      navTemplateName,
      eta.compile(
        getNavTemplatePath(),
      ),
    );

    const addTemplateName = "add";
    eta.templates.define(
      addTemplateName,
      eta.compile(
        getAddItemTemplatePath(),
      ),
    );
    /** ! DO NOT REMOVE ! ------------ end */

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
    const result = await eta.render(layout, {
      css: css,
      widgetCss: widgetCss,
      formatDate: formatDate,
      resume: resume,
      type: type,
      templates: Array.from(orderedMap.values()).filter((item) => !!item),
    }) as string;
    return result;
  } catch (e) {
    console.log(`Error while compiling resume: ${e}`);
    throw new CompileException(e);
  }
};

export const getMeta = async (): Promise<ResumeriseMeta> => {
  return JSON.parse(
    await getFileContent("./meta.json"),
  ) as ResumeriseMeta;
};
