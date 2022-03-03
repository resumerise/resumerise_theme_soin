import * as eta from "https://deno.land/x/eta@v1.6.0/mod.ts";
import {
  getAddItemTemplatePath,
  getNavTemplatePath,
  getProfileItem,
  getWidgetCSSFilePath,
  getWidgetDateRangeFilePath,
  getWidgetKeyMailPairFilePath,
  getWidgetKeyUrlPairFilePath,
  getWidgetKeyValuePairFilePath,
  getWidgetListFilePath,
  getWidgetSkillListFilePath,
} from "./theme-library.ts";

import { CompileException, getFileContent, Resume } from "./core-library.ts";

export const render = async (
  resume: Resume,
  type: string,
): Promise<string> => {
  try {
    const layout = await getFileContent(
      "./templates/layout.eta",
      import.meta.url,
    );
    const css = await getFileContent("./css/style.css", import.meta.url);

    const awardTemplateName = "awards";
    eta.templates.define(
      awardTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/awards.eta",
          import.meta.url,
        ),
      ),
    );

    const basicTemplateName = "basic";
    eta.templates.define(
      basicTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/basics.eta",
          import.meta.url,
        ),
      ),
    );

    const profileTemplateName = "profile";
    eta.templates.define(
      profileTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/profiles.eta",
          import.meta.url,
        ),
      ),
    );

    const educationTemplateName = "education";
    eta.templates.define(
      educationTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/education.eta",
          import.meta.url,
        ),
      ),
    );

    const interestTemplateName = "interest";
    eta.templates.define(
      interestTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/interests.eta",
          import.meta.url,
        ),
      ),
    );

    const languageTemplateName = "language";
    eta.templates.define(
      languageTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/languages.eta",
          import.meta.url,
        ),
      ),
    );

    const publicationTemplateName = "publication";
    eta.templates.define(
      publicationTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/publications.eta",
          import.meta.url,
        ),
      ),
    );

    const referenceTemplateName = "reference";
    eta.templates.define(
      referenceTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/references.eta",
          import.meta.url,
        ),
      ),
    );

    const skillsTemplateName = "skills";
    eta.templates.define(
      skillsTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/skills.eta",
          import.meta.url,
        ),
      ),
    );

    const volunteerTemplateName = "volunteer";
    eta.templates.define(
      volunteerTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/volunteer.eta",
          import.meta.url,
        ),
      ),
    );

    const workTemplateName = "work";
    eta.templates.define(
      workTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/work.eta",
          import.meta.url,
        ),
      ),
    );

    const projectTemplateName = "project";
    eta.templates.define(
      projectTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/projects.eta",
          import.meta.url,
        ),
      ),
    );

    const certificateTemplateName = "certification";
    eta.templates.define(
      certificateTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/certifications.eta",
          import.meta.url,
        ),
      ),
    );

    const dateRangeTemplateName = "date-range";
    eta.templates.define(
      dateRangeTemplateName,
      eta.compile(
        await getWidgetDateRangeFilePath(),
      ),
    );

    const keyValueTemplateName = "key-value-item";
    eta.templates.define(
      keyValueTemplateName,
      eta.compile(
        await getWidgetKeyValuePairFilePath(),
      ),
    );

    const listTemplateName = "list";
    eta.templates.define(
      listTemplateName,
      eta.compile(
        await getWidgetListFilePath(),
      ),
    );

    const locationTemplateName = "location";
    eta.templates.define(
      locationTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/location.eta",
          import.meta.url,
        ),
      ),
    );

    const profilePictureTemplateName = "profile-picture";
    eta.templates.define(
      profilePictureTemplateName,
      eta.compile(
        await getFileContent(
          "./templates/categories/profile-picture.eta",
          import.meta.url,
        ),
      ),
    );

    /** ! DO NOT REMOVE ! ------------ begin */
    const widgetCss = await getWidgetCSSFilePath();

    const navTemplateName = "nav";
    eta.templates.define(
      navTemplateName,
      eta.compile(
        await getNavTemplatePath(),
      ),
    );

    const addTemplateName = "add";
    eta.templates.define(
      addTemplateName,
      eta.compile(
        await getAddItemTemplatePath(),
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
    resume.settings?.visibleCategories?.forEach((resumeCategory: string) => {
      orderedMap.set(resumeCategory, map.get(resumeCategory)!);
    });
    const result = await eta.render(layout, {
      css: css,
      widgetCss: widgetCss,
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
