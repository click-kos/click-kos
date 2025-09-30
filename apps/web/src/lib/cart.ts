import type { cartItem } from '@/context/CartContext';

const createFallbackId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const toCartItem = (item: any): cartItem => ({
  id: String(item?.item_id ?? item?.id ?? createFallbackId()),
  name: item?.name ?? 'Unknown Item',
  description: item?.description ?? '',
  price: item?.price ?? 0,
  rating: item?.rating ?? 0,
  cookTime: item?.cookTime ?? item?.cook_time ?? '',
  category: item?.category ?? '',
  isPopular: item?.isPopular ?? item?.is_popular ?? false,
  image: item?.image ?? item?.item_image?.[0]?.url ?? '',
});
