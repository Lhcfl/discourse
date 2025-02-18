import HashtagTypeBase from "./base";
import { inject as service } from "@ember/service";

export default class CategoryHashtagType extends HashtagTypeBase {
  @service site;

  get type() {
    return "category";
  }

  get preloadedData() {
    return this.site.categories || [];
  }

  generateColorCssClasses(category) {
    const generatedCssClasses = [];
    const backgroundGradient = [`var(--category-${category.id}-color) 50%`];
    if (category.parentCategory) {
      backgroundGradient.push(
        `var(--category-${category.parentCategory.id}-color) 50%`
      );
    } else {
      backgroundGradient.push(`var(--category-${category.id}-color) 50%`);
    }

    generatedCssClasses.push(`.hashtag-color--category-${category.id} {
  background: linear-gradient(90deg, ${backgroundGradient.join(", ")});
}`);

    return generatedCssClasses;
  }

  generateIconHTML(hashtag) {
    return `<span class="hashtag-category-badge hashtag-color--${this.type}-${hashtag.id}"></span>`;
  }
}
