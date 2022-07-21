export abstract class UtilStr {
  public static slugify(content: string): string {
    let slug;
    slug = content.toLowerCase();
    slug = slug.replace(/[`~!@#|$%^&*()+=,.\/?><'":;_]/gi, '');
    slug = slug.replace(/ /gi, '-');
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
  }
}
