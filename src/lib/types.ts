export type ProductAttribute = {
  name: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  categories: string[];
  tags: string[];
  price: string;
  regularPrice: string;
  salePrice: string;
  shortDescription: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  attributes: ProductAttribute[];
  stockStatus: string;
  dateCreated: string;
  relatedProductIds: string[];
  originalWooCommerceUrl: string;
};

export type SortKey = "default" | "popularity" | "latest" | "price-asc" | "price-desc";

export type EnquiryItem = {
  slug: string;
  quantity: number;
};
