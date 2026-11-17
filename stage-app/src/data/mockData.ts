import { Business, DropEvent, LookPin, Product } from '@/types';

export const BUSINESSES: Business[] = [
  {
    id: 'bc',
    name: "Bella's Closet",
    initials: 'BC',
    category: 'Fashion',
    bio: 'Handcrafted contemporary silhouettes & everyday couture.',
    openingNote: "I started Bella's Closet to make women feel magnetic without paying high-fashion markups. Every piece is cut and finished right here in our Lagos studio.",
    openingNotePrompt: "Why I started this",
    verified: true,
    followers: 1420,
    productsCount: 24,
    themeColor: '#40214B',
    orderChannel: 'whatsapp',
    contactHandle: '+2348012345678',
    shout: {
      title: 'Midnight Collection Live',
      message: 'New drop is 80% sold out! Grab your size now.',
      timeAgo: '12m ago'
    },
    bubbleSize: 130,
    position: { x: 28, y: 35 },
    curatedThumbs: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 'gm',
    name: 'Gifted by Mimi',
    initials: 'GM',
    category: 'Gifts',
    bio: 'Bespoke scents, artisanal hampers & engraved memory tokens.',
    openingNote: "Gift-giving is a love language. When you unbox one of our amber candles, the handwritten message inside is meant to bring quiet tears of joy.",
    openingNotePrompt: "What I want people to feel",
    verified: true,
    followers: 890,
    productsCount: 16,
    themeColor: '#EE9A22',
    orderChannel: 'whatsapp',
    contactHandle: '+2348098765432',
    shout: {
      title: 'Back in stock!',
      message: 'Amber Glow candles restocked after 200 orders.',
      timeAgo: '45m ago'
    },
    bubbleSize: 110,
    position: { x: 70, y: 25 },
    curatedThumbs: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 'kj',
    name: 'Kicks by Jay',
    initials: 'KJ',
    category: 'Fashion',
    bio: 'Verified streetwear footwear, vintage grails & custom restoration.',
    openingNote: "We hunt rare footwear and preserve sneaker culture so you don't have to risk counterfeit sellers.",
    openingNotePrompt: "Why I started this",
    verified: true,
    followers: 3410,
    productsCount: 42,
    themeColor: '#2B2220',
    orderChannel: 'telegram',
    contactHandle: 'kicksbyjay',
    shout: {
      title: 'Grail Alert!',
      message: 'Just restocked 18 authentic pairs from Japan.',
      timeAgo: '2h ago'
    },
    bubbleSize: 125,
    position: { x: 18, y: 72 },
    curatedThumbs: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 'wp',
    name: 'The Wardrobe Plug',
    initials: 'WP',
    category: 'Bags',
    bio: 'Structural leather bags, everyday canvas totes & weekenders.',
    openingNote: "Clean geometry and durable stitches. A bag should outlive the seasons.",
    openingNotePrompt: "What I want people to feel",
    verified: true,
    followers: 670,
    productsCount: 19,
    themeColor: '#34302F',
    orderChannel: 'whatsapp',
    contactHandle: '+2348077665544',
    shout: {
      title: 'Vegetable-tanned leather',
      message: 'New caramel mini shoulder totes are ready.',
      timeAgo: '3h ago'
    },
    bubbleSize: 95,
    position: { x: 80, y: 68 },
    curatedThumbs: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60'
    ]
  },
  {
    id: 'cl',
    name: 'Chic Looks',
    initials: 'CL',
    category: 'Decor',
    bio: 'Earthy ceramics, handwoven throws & botanical planters.',
    openingNote: "Home is your sanctuary. We bring warmth back into modern living rooms with tactile pottery.",
    openingNotePrompt: "Our guiding light",
    verified: false,
    followers: 430,
    productsCount: 12,
    themeColor: '#B9C6A6',
    orderChannel: 'whatsapp',
    contactHandle: '+2348055443322',
    shout: {
      title: 'Earth Kiln Batch',
      message: 'New matcha glazed cups fresh from the kiln!',
      timeAgo: '5h ago'
    },
    bubbleSize: 90,
    position: { x: 50, y: 82 },
    curatedThumbs: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=500&auto=format&fit=crop&q=60'
    ]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Black Two-Piece Drape',
    price: 25000,
    sellerId: 'bc',
    sellerName: "Bella's Closet",
    sellerAvatar: 'BC',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=70',
    aspectRatio: 0.78,
    isCustomizable: true,
    customType: 'options',
    description: 'Bespoke tailoring in breathable crepe blend with adjustable waist sash.'
  },
  {
    id: 'p2',
    name: 'White Peplum Linen Top',
    price: 12000,
    sellerId: 'bc',
    sellerName: "Bella's Closet",
    sellerAvatar: 'BC',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=70',
    aspectRatio: 0.95,
    description: 'Crisp handwoven pure linen top with delicate puff sleeves.'
  },
  {
    id: 'p3',
    name: 'Amber Glow Soy Candle',
    price: 8500,
    sellerId: 'gm',
    sellerName: 'Gifted by Mimi',
    sellerAvatar: 'GM',
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=70',
    aspectRatio: 0.84,
    isCustomizable: true,
    customType: 'open',
    description: 'Hand-poured 200g soy candle with notes of sandalwood, amber & vanilla bean.'
  },
  {
    id: 'p4',
    name: 'Velvet Blush Gift Hamper',
    price: 18000,
    sellerId: 'gm',
    sellerName: 'Gifted by Mimi',
    sellerAvatar: 'GM',
    category: 'Gifts',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=70',
    aspectRatio: 0.96,
    description: 'Includes room mist, organic tea blend, gold wick trimmer and a personal card.'
  },
  {
    id: 'p5',
    name: 'Air Jordan 1 Retro High OG',
    price: 95000,
    sellerId: 'kj',
    sellerName: 'Kicks by Jay',
    sellerAvatar: 'KJ',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=70',
    aspectRatio: 0.88,
    badge: 'Only 2 Left',
    description: 'Verified deadstock with authenticated provenance and double box shipping.'
  },
  {
    id: 'p6',
    name: 'Structured Box Handbag',
    price: 42000,
    sellerId: 'wp',
    sellerName: 'The Wardrobe Plug',
    sellerAvatar: 'WP',
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=70',
    aspectRatio: 0.92,
    description: 'Architectural silhouette crafted from full-grain vegetable tanned bridle leather.'
  },
  {
    id: 'p7',
    name: 'Mini Everyday Canvas Tote',
    price: 22000,
    sellerId: 'wp',
    sellerName: 'The Wardrobe Plug',
    sellerAvatar: 'WP',
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=70',
    aspectRatio: 0.75,
    description: 'Water-resistant waxed duck canvas with reinforced saddle-stitched straps.'
  },
  {
    id: 'p8',
    name: 'Terracotta Fluted Vase',
    price: 16500,
    sellerId: 'cl',
    sellerName: 'Chic Looks',
    sellerAvatar: 'CL',
    category: 'Decor',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=70',
    aspectRatio: 1.05,
    description: 'Wheel-thrown red earthenware clay with raw textured exterior and glazed interior.'
  }
];

export const LOOK_PINS: LookPin[] = [
  {
    id: 'lp1',
    name: 'Draped Linen Blazer',
    biz: "Bella's Closet",
    bizId: 'bc',
    price: 32000,
    top: '32%',
    left: '48%',
    bgPos: 'center 20%',
    desc: 'Oversized tailored cut in raw desert taupe linen.'
  },
  {
    id: 'lp2',
    name: 'Minimalist Saddle Bag',
    biz: 'The Wardrobe Plug',
    bizId: 'wp',
    price: 28000,
    top: '58%',
    left: '26%',
    bgPos: 'center 50%',
    desc: 'Full grain leather with brass pin buckle.'
  },
  {
    id: 'lp3',
    name: 'Chunky Court Sneakers',
    biz: 'Kicks by Jay',
    bizId: 'kj',
    price: 45000,
    top: '84%',
    left: '60%',
    bgPos: 'center 80%',
    desc: 'Pebbled ivory leather with gum rubber sole.'
  }
];

export const DROP_DATA: DropEvent = {
  id: 'd1',
  title: 'The Midnight Set',
  businessName: "Bella's Closet",
  businessInitials: 'BC',
  description: 'Six signature tailored pieces in ultra-limited small batches. Only 30 items will be released across Nigeria.',
  timeRemainingSeconds: 2 * 3600 + 14 * 60 + 37,
  piecesCount: 6,
  revealTime: 'Tonight at 7:00 PM',
  teaserImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80',
  upcoming: [
    {
      id: 'up1',
      business: 'Kicks by Jay',
      initials: 'KJ',
      tagline: 'Sneaker restock · Vintage Air Max',
      date: 'Sun, 10:00 am',
      color: '#2a1e2f'
    },
    {
      id: 'up2',
      business: 'Gifted by Mimi',
      initials: 'GM',
      tagline: 'Weekend Luxury Gift Boxes',
      date: 'Wed, 6:00 pm',
      color: '#EE9A22'
    },
    {
      id: 'up3',
      business: 'Chic Looks',
      initials: 'CL',
      tagline: 'Ceramic Tableware Collection',
      date: 'Fri, 4:00 pm',
      color: '#8FA07A'
    }
  ]
};

export const TESTIMONIALS = [
  {
    id: 't1',
    quote: "Stage gave my small tailoring brand a stage where customers connect with my story before looking at price. My orders doubled without running paid ads.",
    name: 'Bella Adeleke',
    role: "Founder, Bella's Closet",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=70',
    tag: 'Performer'
  },
  {
    id: 't2',
    quote: "Browsing Stage feels like wandering through an intimate artisan market. You read why the creator built the piece, customize it, and order directly on WhatsApp.",
    name: 'Chidi Okonkwo',
    role: 'Stage Audience & Collector',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=70',
    tag: 'Audience'
  },
  {
    id: 't3',
    quote: "The 'Drop Night' feature built real hype for my candle restocks. The curtain countdown sold out our 50-candle batch in under 4 minutes.",
    name: 'Mimi Danjuma',
    role: 'Artisan, Gifted by Mimi',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=70',
    tag: 'Performer'
  }
];

export const CAROUSEL_PEOPLE = [
  {
    id: 'cp1',
    name: 'Amara Vance',
    handle: '@amaraceramics',
    niche: 'Artisanal Ceramicist',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=70',
    note: "Crafting stoneware that turns morning coffee into a mindful ritual."
  },
  {
    id: 'cp2',
    name: 'Jayden Brooks',
    handle: '@jaykicks',
    niche: 'Footwear Archivist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=70',
    note: "Connecting real sneakerheads with deadstock grails they thought were gone."
  },
  {
    id: 'cp3',
    name: 'Zainab & Halima',
    handle: '@noiredit',
    niche: 'Slow Fashion Tailoring',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=70',
    note: "Zero waste silhouettes built to flatter every body effortlessly."
  },
  {
    id: 'cp4',
    name: 'Marcus Chen',
    handle: '@chenscents',
    niche: 'Natural Perfumer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=70',
    note: "Capturing childhood nostalgia in small-batch botanical mists."
  },
  {
    id: 'cp5',
    name: 'Omotola Davies',
    handle: '@tolaweaving',
    niche: 'Loom Textile Weaver',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=70',
    note: "Bringing ancient indigo dyeing and loom techniques to modern cushions."
  }
];
