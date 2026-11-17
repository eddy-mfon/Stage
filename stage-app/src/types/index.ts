export interface Product {
  id: string;
  name: string;
  price: number;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  category: string;
  image: string;
  aspectRatio: number;
  isCustomizable?: boolean;
  customType?: 'fixed' | 'options' | 'open';
  description?: string;
  badge?: string;
}

export interface Business {
  id: string;
  name: string;
  initials: string;
  category: string;
  bio: string;
  openingNote: string;
  openingNotePrompt?: string;
  verified: boolean;
  followers: number;
  productsCount: number;
  themeColor: string;
  orderChannel: 'whatsapp' | 'telegram';
  contactHandle: string;
  shout?: {
    title: string;
    message: string;
    timeAgo: string;
  };
  bubbleSize: number; // 90 to 140
  position: { x: number; y: number }; // percentages for explore canvas
  curatedThumbs: string[];
}

export interface LookPin {
  id: string;
  name: string;
  biz: string;
  bizId: string;
  price: number;
  top: string;
  left: string;
  bgPos: string;
  desc: string;
}

export interface DropEvent {
  id: string;
  title: string;
  businessName: string;
  businessInitials: string;
  description: string;
  timeRemainingSeconds: number;
  piecesCount: number;
  revealTime: string;
  teaserImage: string;
  upcoming: Array<{
    id: string;
    business: string;
    initials: string;
    tagline: string;
    date: string;
    color: string;
  }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: {
    engravedName?: string;
    font?: string;
    colorName?: string;
    notes?: string;
  };
}

export interface OrderGroup {
  sellerId: string;
  sellerName: string;
  contactHandle: string;
  orderChannel: 'whatsapp' | 'telegram';
  items: CartItem[];
  subtotal: number;
}
