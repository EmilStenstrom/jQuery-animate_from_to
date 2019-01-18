/// <reference path="node_modules/@types/jquery/index.d.ts" /> from @types/jquery@2 for JQuery & JQueryCssProperties
interface JQueryAnimateFromToOptions {
	callback?: () => void;
	initial_css?: JQueryCssProperties;
	pixels_per_second?: number;
	square?: ""|"height"|"width";
}

declare interface JQuery {
	animate_from_to: (targetElm: HTMLElement|string, options?: JQueryAnimateFromToOptions) => JQuery;
}
