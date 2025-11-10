const products = [
  { 
    id: 1, 
    name: "Dark Brown Jeans", 
    category: "Men", 
    price: 1000, 
    image: "/3.jpg", 
    description: "Our Dark Brown Jeans for men are a wardrobe essential for those who appreciate rugged sophistication and timeless style. Crafted from premium-grade denim with a hint of stretch, these jeans provide a comfortable fit that moves with you all day long. The rich, earthy brown color complements almost any shirt or jacket, making it a versatile piece for both casual and semi-formal occasions. Designed with classic five-pocket styling, durable stitching, and a mid-rise cut, these jeans ensure both practicality and fashion-forward appeal. Pair them with a crisp white shirt for a clean look or a graphic tee for a laid-back weekend vibe."
  },
  { 
    id: 2, 
    name: "Blue Denim Jeans", 
    category: "Women", 
    price: 1200, 
    image: "/15.jpg", 
    description: "These Blue Denim Jeans are tailored to perfection for the modern woman who values comfort without compromising on style. Made from a soft, stretchable denim blend, they offer a flattering silhouette that accentuates your curves while ensuring maximum mobility. The classic blue wash gives these jeans a vintage yet contemporary vibe, making them a go-to for both everyday wear and night outings. With subtle fading on the thighs and reinforced seams for longevity, these jeans are as durable as they are stylish. Team them up with a tucked-in blouse and heels for a chic look, or sneakers and a tank top for an effortless casual day out."
  },
  { 
    id: 3, 
    name: "Blue Hoodie", 
    category: "Men", 
    price: 1400, 
    image: "/16.jpg", 
    description: "Stay cozy, warm, and stylish with our Blue Hoodie designed for the modern man who loves comfort with minimal effort. Made from ultra-soft cotton fleece, this hoodie provides just the right amount of warmth during cool evenings or early morning workouts. It features a spacious kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The bold blue hue adds vibrancy to your look, while the breathable material ensures you stay comfortable throughout the day. Whether you’re heading to the gym, lounging at home, or meeting friends, this hoodie is the perfect blend of function and fashion."
  },
  { 
    id: 4, 
    name: "Bright Gold Purse With Chain", 
    category: "Accessories", 
    price: 1600, 
    image: "/17.jpg", 
    description: "Elevate your evening style with this stunning Bright Gold Purse With Chain — a perfect companion for parties, weddings, or any occasion that calls for a touch of glamour. Designed with a metallic gold exterior that catches the light beautifully, it features a sleek rectangular body and a chic gold-toned chain strap that can be worn over the shoulder or carried as a clutch. Inside, the purse offers enough space to hold your essentials like your phone, cards, and makeup touch-ups. The secure clasp closure ensures your belongings stay safe while you shine through the night. Pair it with a cocktail dress or ethnic attire for a truly dazzling look."
  },
  { 
    id: 5, 
    name: "Anchore Bracelet", 
    category: "Accessories", 
    price: 1800, 
    image: "/7.jpg", 
    description: "Inspired by the ocean and adventure, the Anchore Bracelet brings a bold and confident touch to your everyday look. Handcrafted with premium braided leather and a sleek metallic anchor clasp, this bracelet symbolizes strength, stability, and exploration. Its rustic yet refined design makes it perfect for pairing with both casual and semi-formal outfits. Whether you’re dressing for a night out or a beach getaway, this bracelet adds a statement of individuality and character. The durable material ensures longevity, while its adjustable design guarantees a comfortable fit for any wrist size."
  },
  { 
    id: 6, 
    name: "BOHO Bangle Bracelet", 
    category: "Accessories", 
    price: 2000, 
    image: "/8.jpg", 
    description: "Embrace your free spirit with our BOHO Bangle Bracelet — a unique blend of bohemian artistry and modern craftsmanship. This intricately designed bangle features detailed metalwork, colorful accents, and a polished finish that reflects light beautifully. It’s lightweight yet sturdy, making it suitable for daily wear as well as festive occasions. Perfect for layering with other bangles or wearing solo as a statement piece, it adds a touch of ethnic charm to both western and traditional outfits. Whether you’re dressing up for a music festival or a casual brunch, this bracelet completes your boho-chic vibe effortlessly."
  },
  { 
    id: 7, 
    name: "Light Brown Purse", 
    category: "Women", 
    price: 2000, 
    image: "/9.jpg", 
    description: "Our Light Brown Purse blends elegance and functionality in perfect harmony. Made from high-quality faux leather, it features a soft matte finish with gold-tone hardware that adds a touch of sophistication. The spacious interior comes with multiple compartments to organize your essentials — from makeup and keys to your phone and wallet. The sturdy handles and smooth zip closure ensure practicality and security. Its versatile design makes it suitable for both work and casual outings. The neutral brown shade complements all outfits, making this purse a timeless addition to your collection."
  },
  { 
    id: 8, 
    name: "Bright Red Bag", 
    category: "Women", 
    price: 2000, 
    image: "/10.jpg", 
    description: "Make a bold fashion statement with our Bright Red Bag — the perfect pop of color to elevate any outfit. Crafted with premium synthetic leather, it features a smooth texture and structured silhouette that exudes confidence. The bag is spacious enough to carry all your essentials while maintaining a sleek and elegant look. Gold-toned zippers and fine stitching add luxurious detail, while the comfortable handles make it easy to carry throughout the day. Whether paired with casual jeans or a formal dress, this bag adds a fiery edge to your personal style."
  },
  { 
    id: 9, 
    name: "Blue T-Shirt", 
    category: "Men", 
    price: 2000, 
    image: "/11.jpg", 
    description: "The Blue T-Shirt is a modern classic every man needs in his wardrobe. Made from breathable, 100% cotton fabric, it offers unbeatable softness and comfort for everyday wear. Its minimal design, ribbed crew neck, and perfect fit make it ideal for layering or wearing solo. The vibrant blue shade adds freshness to your look, making it suitable for both casual outings and relaxed office days. Pair it with jeans or shorts and sneakers for a laid-back yet polished appearance that never goes out of style."
  },
  { 
    id: 10, 
    name: "BUDHHA Bracelet", 
    category: "Accessories", 
    price: 2000, 
    image: "/12.jpg", 
    description: "Channel peace, positivity, and mindfulness with the BUDHHA Bracelet. Crafted with premium beads and a finely detailed Buddha charm, this bracelet represents tranquility and balance. The beads are smooth to the touch and durable for daily wear, while the elastic stretch design ensures a perfect fit for any wrist. Ideal for meditation, yoga, or simply as a meaningful fashion accessory, this bracelet adds a spiritual and calming presence to your outfit. Pair it with casuals or ethnic attire to bring harmony to your personal style."
  },
  { 
    id: 11, 
    name: "Black Hoodie", 
    category: "Men", 
    price: 2000, 
    image: "/13.jpg", 
    description: "The Black Hoodie is the ultimate fusion of comfort and street style. Crafted from premium cotton-blend fleece, it provides exceptional warmth without feeling bulky. The adjustable hood, ribbed cuffs, and spacious kangaroo pocket make it both practical and stylish. Its versatile black color complements any outfit — from joggers to jeans — making it your go-to layering piece. Whether you’re lounging at home, hitting the gym, or running errands, this hoodie ensures effortless style and all-day comfort."
  },
  { 
    id: 12, 
    name: "Black Over The Shoulder HandBag", 
    category: "Women", 
    price: 2000, 
    image: "/14.jpg", 
    description: "Sleek, elegant, and designed for modern women — this Black Over The Shoulder HandBag offers a blend of class and convenience. Made from high-quality faux leather with a smooth matte finish, it features a structured silhouette that holds its shape beautifully. The roomy interior includes multiple pockets to keep your essentials organized, while the adjustable shoulder strap provides flexible carrying options. Ideal for both work and casual outings, its minimalist design ensures it complements any outfit effortlessly. A timeless black handbag that adds sophistication to your everyday ensemble."
  },
  { 
    id: 13, 
    name: "Shoes", 
    category: "Men", 
    price: 1700, 
    image: "/shoe.jpg", 
    description: "Step out in confidence with these stylish Men’s Shoes that blend contemporary design with unmatched comfort. Crafted from premium synthetic leather, they feature a cushioned insole and flexible outsole for maximum comfort throughout the day. The lace-up design offers a secure fit, while the sleek finish adds a touch of modern sophistication. Perfect for casual outings, office wear, or semi-formal occasions, these shoes elevate your everyday style with effortless grace. Durable, lightweight, and designed to last — they’re a must-have in every man’s wardrobe."
  },
  { 
    id: 14, 
    name: "Stylish Red Footwear", 
    category: "Women", 
    price: 2200, 
    image: "/footwear.jpg", 
    description: "Turn heads wherever you go with our Stylish Red Footwear for women — a perfect combination of elegance, comfort, and bold style. Designed with a sleek silhouette and soft cushioned sole, these shoes keep your feet comfortable even during long hours of wear. The striking red tone adds a vibrant edge to your outfit, making it perfect for parties, brunches, or evening strolls. With its anti-slip sole and refined detailing, this footwear offers both functionality and fashion. Pair it with a flowy dress or fitted jeans for a look that radiates confidence."
  },
  { 
    id: 15, 
    name: "Shoes 1", 
    category: "Men", 
    price: 1500, 
    image: "/shoe2.jpg", 
    description: "These Men’s Shoes redefine everyday footwear with their blend of comfort, durability, and minimalistic design. Crafted with a breathable upper and cushioned sole, they ensure comfort with every step. The neutral tone makes them easy to pair with any outfit — whether you’re heading to the office, college, or a casual day out. The flexible rubber outsole provides excellent grip, while the slip-on design ensures ease and convenience. Simple yet stylish, these shoes are made for men who value effortless fashion and all-day comfort."
  },
];

export default products;
