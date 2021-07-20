import {render} from "./mod.ts";
import {
    compilePNG,
    getDefaultResume,
    ThemeAction,
    validateMeta,
} from "../resumerise-theme-library/mod.ts";
console.log(await render(getDefaultResume(), "PDF"));
