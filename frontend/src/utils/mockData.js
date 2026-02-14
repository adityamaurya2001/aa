// src/utils/mockData.js

export const indianTestimonials = [
  {
    name: "Priya Sharma",
    comment: "बहुत खूबसूरत फूल! मेरी सालगिरह पर समय पर डिलीवरी हुई और फ्रेशनेस कमाल की थी। (The flowers were beautiful! Delivered on time for my anniversary and the freshness was amazing.)",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Mumbai"
  },
  {
    name: "Rahul Verma",
    comment: "मेरी माँ के जन्मदिन के लिए परफेक्ट गुलदस्ता। गुणवत्ता शानदार थी और कीमत भी उचित। (Perfect bouquet for my mother's birthday. Quality was excellent and price was reasonable.)",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Delhi"
  },
  {
    name: "Anjali Deshpande",
    comment: "बहुत ही प्रोफेशनल सर्विस और लाजवाब गुलदस्ते। हर मौके के लिए मेरी पहली पसंद! (Very professional service and amazing bouquets. My first choice for every occasion!)",
    rating: 4,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Pune"
  },
  {
    name: "Arjun Singh",
    comment: "शानदार चयन और बेहतरीन कस्टमर सर्विस। उन्होंने सही गुलदस्ता चुनने में मदद की। मेरी पत्नी बहुत खुश हुईं! (Amazing selection and excellent customer service. They helped me choose the right bouquet. My wife was very happy!)",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Jaipur"
  },
  {
    name: "Kavita Reddy",
    comment: "फूल इतने ताज़े थे जैसे अभी तोड़े हों। पैकेजिंग भी बहुत अच्छी थी। जरूर दोबारा ऑर्डर करूंगी। (The flowers were so fresh, like just picked. Packaging was also very good. Will definitely order again.)",
    rating: 5,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Bangalore"
  },
  {
    name: "Vikram Mehta",
    comment: "ऑनलाइन फूल ऑर्डर करने का बेहतरीन अनुभव। वादे के मुताबिक डिलीवरी और बहुत प्यारा गुलदस्ता। (Great experience ordering flowers online. Delivery as promised and very lovely bouquet.)",
    rating: 4,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    location: "Ahmedabad"
  }
];

export const indianOccasions = [
  { 
    name: "Birthday", 
    icon: "🎂", 
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=736&auto=format&fit=crop",
    color: "from-pink-400 to-rose-400" 
  },
  { 
    name: "Anniversary", 
    icon: "💝", 
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1170&auto=format&fit=crop",
    color: "from-red-400 to-pink-400" 
  },
  { 
    name: "Wedding", 
    icon: "💒", 
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1170&auto=format&fit=crop",
    color: "from-purple-400 to-pink-400" 
  },
   { 
      name: "Sympathy", 
      icon: "🕊️", 
      image: "https://plus.unsplash.com/premium_photo-1681996943777-584bc52eece1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-blue-400 to-indigo-400" 
    },
  { 
    name: "Congratulations", 
    icon: "🎉", 
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1170&auto=format&fit=crop",
    color: "from-green-400 to-emerald-400" 
  },
  {
   name: "Just Because", 
      icon: "🎁", 
      image: "https://plus.unsplash.com/premium_photo-1674068280156-138373e16bbd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "from-yellow-400 to-orange-400" 
    }
];







export const indianCategories  = [
  { 
 _id: '1',
    name: "गुलाब (Roses)", 
    count: 42, 
    icon: "🌹", 
    color: "bg-red-100", 
    slug: "roses", 
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
  },
  { 
    _id: '2',
    name: "गेंदा (Marigold)", 
    count: 35, 
    icon: "🏵️", 
    color: "bg-orange-100", 
    slug: "marigold", 
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
  },
  { 
    _id: '3',
    name: "चमेली (Jasmine)", 
    count: 28, 
    icon: "🌸", 
    color: "bg-yellow-100", 
    slug: "jasmine", 
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
  },
  { 
    _id: '4',
    name: "लिली (Lilies)", 
    count: 35, 
    icon: "🌸", 
    color: "bg-pink-100", 
    slug: "lilies", 
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
  },
  { 
    _id: '5',
    name: "ऑर्किड (Orchids)", 
    count: 24, 
    icon: "🦋", 
    color: "bg-purple-100", 
    slug: "orchids", 
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
  },
  { 
    _id: '6',
    name: "मौसमी (Seasonal)", 
    count: 56, 
    icon: "🍂", 
    color: "bg-green-100", 
    slug: "seasonal", 
    image: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
  }
  ,
  {
    _id: '7',
    name: 'Bouquets',
    count: 25,
    // slug: 'bouquets',
    description: 'Handcrafted flower bouquets',
    image: 'https://images.unsplash.com/photo-1523693916903-027d144a2b7d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    
  },
  {
    _id: '8',
    name: 'Exotic Flowers',
    slug: 'exotic',
    description: 'Rare and exotic flower varieties',
    image: 'https://plus.unsplash.com/premium_photo-1674343963928-d67007d2ae74?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count: 5
  }

];
