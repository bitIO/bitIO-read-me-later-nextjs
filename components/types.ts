export interface Category {
  images: { dark: string; light: string };
  name: string;
  slug: string;
}

export interface CategoriesGroup {
  categories: Category[];
  name: string;
}

export interface CanvasAttributes {
  author: string;
  canvas: { center: boolean; maxWidth?: number };
  category: string;
  dependencies: string[];
  dimmed?: boolean;
  props?: Record<string, any>;
  responsive?: boolean;
  title: string;
  withColor?: boolean;
}

export interface UiComponent {
  attributes: CanvasAttributes;
  code: string;
  component: string;
  slug: string;
}
