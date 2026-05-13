export type ContentBlockType = 'paragraph' | 'heading' | 'list' | 'tip' | 'quote';

export interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  title?: string;
  items?: string[];
  source?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: number;
  date: string;
  image: string;
  featured: boolean;
  content: ContentBlock[];
}

export const blogCategories = [
  { id: 'all', label: 'All Articles' },
  { id: 'Cake Decorating', label: 'Cake Decorating' },
  { id: 'Event Planning', label: 'Event Planning' },
  { id: 'Flavour Guide', label: 'Flavour Guide' },
  { id: 'Behind the Scenes', label: 'Behind the Scenes' },
  { id: 'Tips & Tricks', label: 'Tips & Tricks' },
];

export const categoryColors: Record<string, string> = {
  'Cake Decorating': 'bg-soft-pink/15 text-deep-pink',
  'Event Planning': 'bg-amber-100 text-amber-700',
  'Flavour Guide': 'bg-mint/20 text-emerald-700',
  'Behind the Scenes': 'bg-violet-100 text-violet-700',
  'Tips & Tricks': 'bg-sky-100 text-sky-700',
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'tips-for-ordering-perfect-birthday-cake',
    title: '5 Essential Tips for Ordering a Custom Birthday Cake in Chelmsford',
    excerpt: 'Planning a birthday celebration in Chelmsford or Essex? These five insider tips will help you order the perfect custom cake — and avoid the most common mistakes first-time buyers make.',
    category: 'Cake Decorating',
    categoryColor: 'bg-soft-pink/15 text-deep-pink',
    readTime: 5,
    date: 'April 15, 2026',
    image: 'https://readdy.ai/api/search-image?query=Beautiful%20custom%20birthday%20cake%20being%20decorated%20by%20baker%20hands%20applying%20pink%20buttercream%20roses%20elegant%20professional%20bakery%20setting%20warm%20natural%20lighting%20overhead%20shot%20artistic%20food%20photography&width=1200&height=700&seq=101&orientation=landscape',
    featured: true,
    content: [
      { type: 'paragraph', text: 'Ordering a custom birthday cake should be an exciting, stress-free experience. But for many customers, the process can feel overwhelming — what size do you need, which flavour is best, how early should you order? After creating hundreds of custom cakes right here in Chelmsford, we\'ve compiled the most important tips to help you get exactly what you dream of.' },
      { type: 'heading', text: '1. Order as Early as Possible' },
      { type: 'paragraph', text: 'The number one mistake we see is leaving the order too late. We recommend placing your order at least 5–7 days in advance for a standard birthday cake, and 2+ weeks for anything with intricate fondant work, multiple tiers, or edible photo prints. During peak seasons like December, Valentine\'s Day, and summer school holidays, slots fill up weeks in advance.' },
      { type: 'tip', title: 'Pro Tip', text: 'If you have a date in mind, book it in as a provisional order even if you haven\'t decided on the design yet. We can always refine the details later.' },
      { type: 'heading', text: '2. Gather Your Inspiration First' },
      { type: 'paragraph', text: 'Before reaching out, spend a few minutes gathering inspiration — whether from our gallery, Pinterest, or Instagram. Having reference images makes a huge difference in helping us understand your vision. Don\'t worry if you love elements from multiple designs; we\'re great at mixing and matching ideas into something unique.' },
      { type: 'heading', text: '3. Know Your Guest Count' },
      { type: 'paragraph', text: 'Choosing the right size is critical. Too small and guests go without; too large and you\'re eating cake for a week (not always a bad thing!). A 6-inch cake serves 8–10 people perfectly for a family gathering, while an 8-inch suits parties of 12–16. For larger celebrations of 25+, consider a two-tier cake or supplement with cupcakes.' },
      { type: 'list', title: 'Quick Size Guide:', items: ['6-inch round — serves 8–10 people', '8-inch round — serves 12–16 people', '10-inch round — serves 20–25 people', 'Two-tier — serves 30–40 people', 'Three-tier — serves 50–70 people'] },
      { type: 'heading', text: '4. Think About Dietary Needs' },
      { type: 'paragraph', text: 'Always let us know upfront if any of your guests have dietary requirements — whether that\'s a nut allergy, gluten intolerance, or a vegan diet. We can accommodate most needs with advance notice. Mentioning this early gives us time to source the right ingredients and ensure no cross-contamination concerns.' },
      { type: 'heading', text: '5. Trust the Process (and Your Baker!)' },
      { type: 'paragraph', text: 'Once you\'ve given us your brief, trust us to bring it to life. Our best creations come when clients give us a little creative freedom within the brief. That said, if you have a very specific vision, detailed reference photos are your best friend. We will always contact you before we start to confirm the design.' },
      { type: 'quote', text: 'The best birthday cakes are the ones made with specific details — the favourite colours, the little inside jokes, the personal touches. Those are what make people cry happy tears.', source: 'Hamzat Aminat Ayomide, Mide Cakes' },
    ],
  },
  {
    id: 2,
    slug: 'wedding-dessert-table-planning-guide',
    title: 'How to Plan a Stunning Wedding Dessert Table in Essex',
    excerpt: 'Dessert tables are one of the biggest wedding trends in Essex and beyond. Here\'s everything you need to know to create a show-stopping spread that complements your wedding cake perfectly.',
    category: 'Event Planning',
    categoryColor: 'bg-amber-100 text-amber-700',
    readTime: 7,
    date: 'April 8, 2026',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20wedding%20dessert%20table%20with%20tiered%20white%20wedding%20cake%20cupcakes%20macarons%20and%20fresh%20flowers%20on%20draped%20white%20linen%20elegant%20British%20wedding%20reception%20warm%20fairy%20lights%20professional%20event%20photography&width=1200&height=700&seq=102&orientation=landscape',
    featured: false,
    content: [
      { type: 'paragraph', text: 'Wedding dessert tables have exploded in popularity across Essex and the UK — and for good reason. They create a spectacular visual centrepiece, give guests more choice, and can be tailored to perfectly match your wedding theme and colour palette. Here\'s how to plan yours flawlessly.' },
      { type: 'heading', text: 'Why a Dessert Table Works So Well' },
      { type: 'paragraph', text: 'Beyond the visual impact, a dessert table offers practical benefits. It keeps guests occupied during the photographer\'s couple portraits, creates a natural social gathering point, and caters to different tastes and dietary needs simultaneously. For Essex weddings especially, where receptions can run into the late evening, a dessert table ensures sweet treats are available throughout the day.' },
      { type: 'heading', text: 'What to Include on Your Table' },
      { type: 'list', title: 'Recommended dessert table elements:', items: ['Your main wedding cake as the centrepiece', 'Mini cupcakes (3–4 flavours)', 'Macarons in your wedding colours', 'Decorated biscuits or shortbread', 'Chocolate truffles or bonbons', 'Personalised favour boxes or bags', 'Fresh flowers and greenery for styling'] },
      { type: 'heading', text: 'Quantities: How Much is Enough?' },
      { type: 'paragraph', text: 'A common rule of thumb is 3–5 sweet items per guest. If you\'re having a full dessert course, reduce this to 2–3 items. For a 100-person wedding, we typically recommend: a 3-tier wedding cake (serves 80–100), 48 mini cupcakes, 60 macarons, and a selection of treats. We can advise specifically for your guest count.' },
      { type: 'tip', title: 'Styling Tip', text: 'Use varying heights — cake stands, boxes, and risers covered in fabric — to create visual interest. Mix your packaging and cake colours within a cohesive palette for a curated, intentional look.' },
      { type: 'heading', text: 'Coordinate with Your Wedding Theme' },
      { type: 'paragraph', text: 'Every element of the table should feel intentional. Share your wedding colour palette, mood board, and any venue photos with us when ordering. We can match buttercream shades, ribbon colours, and sugar flower varieties to your existing décor, making the whole aesthetic feel seamless.' },
      { type: 'heading', text: 'Book with Plenty of Lead Time' },
      { type: 'paragraph', text: 'For wedding orders, we require a minimum of 2 weeks notice, though we recommend booking as soon as your date is confirmed — particularly for summer Saturdays which book up quickly. A consultation call or meeting is included with all wedding orders so we can discuss your vision in detail.' },
    ],
  },
  {
    id: 3,
    slug: 'complete-guide-cake-flavours',
    title: 'Our Complete Guide to Cake Flavours: Which One is Right for You?',
    excerpt: 'From classic vanilla to rich salted caramel, every cake flavour has its perfect occasion. We break down our full menu so you can make the best choice for your next celebration.',
    category: 'Flavour Guide',
    categoryColor: 'bg-mint/20 text-emerald-700',
    readTime: 4,
    date: 'March 28, 2026',
    image: 'https://readdy.ai/api/search-image?query=Variety%20of%20cake%20slices%20showing%20different%20flavours%20chocolate%20vanilla%20red%20velvet%20lemon%20arranged%20on%20white%20marble%20with%20decorative%20elements%20beautiful%20food%20photography%20soft%20studio%20lighting&width=1200&height=700&seq=103&orientation=landscape',
    featured: false,
    content: [
      { type: 'paragraph', text: 'Choosing a cake flavour feels simple until you\'re faced with too many delicious options. Each flavour has its own character, its own ideal occasion, and its own perfect pairing. Here\'s our honest guide to every flavour we offer, so you can choose with confidence.' },
      { type: 'heading', text: 'Classic Vanilla — The Crowd Pleaser' },
      { type: 'paragraph', text: 'Never underestimate vanilla. A well-made vanilla sponge with quality vanilla bean paste and silky buttercream is deeply satisfying and universally loved. It\'s the safe choice that somehow always delights. Perfect for: children\'s parties, office celebrations, baby showers, and anyone who says "I\'m not sure" about flavours.' },
      { type: 'heading', text: 'Rich Chocolate — The Showstopper' },
      { type: 'paragraph', text: 'Our chocolate cake uses proper dark cocoa and is layered with rich fudge frosting. It\'s indulgent, deeply flavoured, and pairs beautifully with gold or dark colour palettes. Perfect for: adult birthdays, celebrations where you want to impress, chocolate lovers (obviously), and anyone who thinks vanilla is boring.' },
      { type: 'heading', text: 'Red Velvet — The Drama Queen (in the Best Way)' },
      { type: 'paragraph', text: 'That iconic deep red colour with cream cheese frosting is genuinely stunning when you cut into it. The flavour is mildly chocolatey with a slight tang from the buttermilk. Red velvet photographs beautifully. Perfect for: Valentine\'s Day, romantic occasions, weddings, and surprise birthday cakes.' },
      { type: 'heading', text: 'Lemon — The Fresh Choice' },
      { type: 'paragraph', text: 'Our lemon sponge is zingy and light — a real palate cleanser after a big meal. Paired with lemon curd buttercream or a light drizzle glaze, it feels celebratory without being heavy. Perfect for: summer parties, garden celebrations, afternoon teas, and anyone who prefers something less rich.' },
      { type: 'heading', text: 'Salted Caramel — The Modern Classic' },
      { type: 'paragraph', text: 'Salted caramel has become one of our most-requested flavours over the past few years. The combination of sweet caramel and sea salt is genuinely addictive. Perfect for: foodie households, grown-up celebrations, autumn and winter events, and anyone who\'s adventurous but not too adventurous.' },
      { type: 'tip', title: 'Can\'t Decide?', text: 'For larger gatherings, consider a split-tier cake — for example, a vanilla bottom tier and chocolate top tier. Or supplement your main cake with an assortment of cupcake flavours so every guest finds their favourite.' },
    ],
  },
  {
    id: 4,
    slug: 'baby-shower-cake-ideas',
    title: 'Baby Shower Cake Ideas: From Classic Pastels to Modern Designs',
    excerpt: 'Choosing a baby shower cake is one of the most fun parts of planning! We\'ve pulled together our favourite ideas from years of baby shower orders, from timeless pastels to bold contemporary designs.',
    category: 'Event Planning',
    categoryColor: 'bg-amber-100 text-amber-700',
    readTime: 6,
    date: 'March 20, 2026',
    image: 'https://readdy.ai/api/search-image?query=Adorable%20baby%20shower%20cake%20with%20soft%20pastel%20pink%20and%20blue%20buttercream%20decorated%20with%20fondant%20teddy%20bears%20baby%20booties%20and%20gold%20star%20sprinkles%20on%20white%20table%20soft%20natural%20lighting%20professional%20food%20photography&width=1200&height=700&seq=104&orientation=landscape',
    featured: false,
    content: [
      { type: 'paragraph', text: 'Baby showers have transformed from modest gatherings into beautifully styled events — and the cake is almost always the centrepiece. After making hundreds of baby shower cakes in Chelmsford and across Essex, we\'ve seen every trend come and go. Here are the ideas that never fail to delight.' },
      { type: 'heading', text: 'The Timeless Pastel Palette' },
      { type: 'paragraph', text: 'Soft blush pink, sage green, baby blue, and lavender will always be in style for baby showers. They\'re calming, photogenic, and elegant. A simple three-tier cake in complementary pastel shades with gold lettering is a look that will be treasured in photographs for years to come.' },
      { type: 'heading', text: 'Gender Reveal Cakes' },
      { type: 'paragraph', text: 'One of our most exciting orders! The outside of the cake looks neutral — white or pastel — while inside the sponge is dyed pink or blue (or rainbow, for twins or the "we\'re not finding out!" option). When you cut into it, the reveal happens naturally. These are always an incredible moment.' },
      { type: 'tip', title: 'Important', text: 'For gender reveal cakes, we need to know the gender in advance (obviously!) and can arrange for the information to be passed to us directly from the midwife or parents if you want to keep it a surprise from yourself too.' },
      { type: 'heading', text: 'Themed Baby Shower Cakes' },
      { type: 'list', title: 'Our most popular baby shower themes:', items: ['Noah\'s Ark with fondant animals peeking over the edge', 'Jungle / Safari with tropical greenery and cartoon animals', 'Boho floral with dried flower-inspired sugar blooms', 'Stars and moon with midnight blue and gold palette', 'Classic teddy bear with gingham ribbon detail', 'Modern minimalist with a single botanical sugar stem'] },
      { type: 'heading', text: 'Dietary Considerations' },
      { type: 'paragraph', text: 'It\'s worth considering that some pregnant guests may have dietary preferences or restrictions — certain soft cheeses, raw eggs, or heavily caffeinated items. Our cakes use pasteurised eggs and dairy, making them safe for pregnant guests. If any guests are vegan or gluten-intolerant, let us know and we can prepare a separate portion or a fully vegan/GF option.' },
    ],
  },
  {
    id: 5,
    slug: 'art-of-buttercream-techniques',
    title: 'The Art of Buttercream: Our Favourite Techniques Explained',
    excerpt: 'Buttercream is the soul of a great cake. In this behind-the-scenes piece, we share the techniques we use every day at Mide Cakes — from smooth palette knife finishes to intricate rose piping.',
    category: 'Behind the Scenes',
    categoryColor: 'bg-violet-100 text-violet-700',
    readTime: 5,
    date: 'March 12, 2026',
    image: 'https://readdy.ai/api/search-image?query=Baker%20carefully%20piping%20intricate%20buttercream%20roses%20on%20a%20white%20cake%20close-up%20detail%20shot%20professional%20kitchen%20warm%20lighting%20artistic%20food%20photography%20showing%20technique%20and%20craft&width=1200&height=700&seq=105&orientation=landscape',
    featured: false,
    content: [
      { type: 'paragraph', text: 'Buttercream is where artistry meets technique. It\'s what gives a cake its texture, flavour, and personality. At Mide Cakes, we work almost exclusively with American buttercream for its stability and versatility, but we also make Swiss meringue buttercream for clients who prefer something silkier and less sweet. Here\'s a look at the techniques we use most.' },
      { type: 'heading', text: 'The Smooth Palette Knife Finish' },
      { type: 'paragraph', text: 'The clean, smooth finish you see on modern minimalist cakes is harder to achieve than it looks. After applying a crumb coat (a thin sealing layer) and chilling the cake, we apply the final layer and use a bench scraper rotating on a lazy Susan to achieve that glass-smooth edge. Getting the corners sharp takes practice — we\'re talking hundreds of cakes\' worth.' },
      { type: 'heading', text: 'Textured Finishes: Rustic, Raked & Palette Knife Swipes' },
      { type: 'paragraph', text: 'Not every cake should be perfectly smooth! Rustic "semi-naked" styles where the sponge peeks through are romantic and approachable. Palette knife swipe textures create movement and interest. A wide-toothed comb dragged around the sides creates a geometric stripe pattern. These textured finishes are often easier to achieve and can look incredibly artisan.' },
      { type: 'heading', text: 'Rose and Flower Piping' },
      { type: 'paragraph', text: 'Piped roses are our signature. Using a petal tip and a flower nail, we pipe each rose petal by petal, then chill the rosettes before placing them on the cake. A full floral arrangement can take 2–3 hours of piping alone — which is why these styles command a premium price. The result, though, is breathtaking.' },
      { type: 'quote', text: 'Every rose I pipe is a little different. That\'s the beauty of handmade — no two cakes are ever exactly the same.', source: 'Hamzat Aminat Ayomide' },
      { type: 'heading', text: 'Ombre and Colour Blending' },
      { type: 'paragraph', text: 'Ombre effects — where colour gradually fades from dark to light — require precise colour mixing and a confident hand. We mix each shade of buttercream separately, apply them in horizontal bands, then blend with a bench scraper. The key is getting the colour proportions right and working quickly before the buttercream crusts.' },
      { type: 'tip', title: 'Want a specific technique?', text: 'Just let us know in your order form or during our consultation. We\'re always happy to try new styles and will show you reference photos of our previous work in that technique.' },
    ],
  },
  {
    id: 6,
    slug: 'choosing-right-cake-size',
    title: 'How to Choose the Right Cake Size for Your Guest List',
    excerpt: 'Nothing is worse than running out of cake halfway through the party — or having a mountain of leftovers. Here\'s our definitive guide to matching cake size to your guest count every time.',
    category: 'Tips & Tricks',
    categoryColor: 'bg-sky-100 text-sky-700',
    readTime: 4,
    date: 'March 5, 2026',
    image: 'https://readdy.ai/api/search-image?query=Different%20sized%20celebration%20cakes%20arranged%20together%20from%20small%20to%20large%20on%20white%20marble%20surface%20elegant%20minimalist%20food%20photography%20professional%20studio%20lighting%20pastel%20colour%20accents&width=1200&height=700&seq=106&orientation=landscape',
    featured: false,
    content: [
      { type: 'paragraph', text: 'One of the most common questions we get asked at Mide Cakes is: "What size cake do I need?" It seems simple, but there are several factors that affect the answer beyond just guest numbers. Here\'s everything you need to know.' },
      { type: 'heading', text: 'The Basics: Servings by Size' },
      { type: 'list', title: 'Standard round cake servings:', items: ['6-inch — 8 to 10 dessert portions', '8-inch — 12 to 16 dessert portions', '10-inch — 20 to 25 dessert portions', 'Two-tier (6+8-inch) — 30 to 40 portions', 'Three-tier (6+8+10-inch) — 55 to 70 portions'] },
      { type: 'heading', text: 'Factor 1: Is Cake the Only Dessert?' },
      { type: 'paragraph', text: 'If your cake is the sole dessert, plan for one generous serving per person plus 10% extra. If you\'re also serving ice cream, cookies, or a dessert buffet, you can go smaller — about 70–75% of your guest count.' },
      { type: 'heading', text: 'Factor 2: Age of Your Guests' },
      { type: 'paragraph', text: 'Children\'s parties tend to see smaller cake portions (children are often too excited to eat much!), while adult celebrations — especially evening events where the cake is served after dinner — see more generous servings. For a mix of adults and children, we usually plan based on the adult count.' },
      { type: 'heading', text: 'Factor 3: Are You Sending Leftovers Home?' },
      { type: 'paragraph', text: 'Many of our clients like to box up extra slices for guests to take home. This is a lovely idea and means ordering slightly more than your exact guest count. A larger cake also photographs more impressively, which matters if you\'re planning lots of photos around the cake-cutting moment.' },
      { type: 'tip', title: 'The Cupcake Supplement Trick', text: 'If you\'re between sizes and don\'t want to jump up to the next tier (which adds cost), consider ordering a smaller cake for the ceremonial cutting and supplementing with cupcakes. Guests love the variety and it\'s often more cost-effective.' },
      { type: 'heading', text: 'When in Doubt, Ask Us' },
      { type: 'paragraph', text: 'We\'ve been doing this for years and we genuinely love helping clients find the right size. When you fill in our order form, just tell us your guest count, the occasion, and whether there will be other desserts — and we\'ll recommend the perfect option.' },
    ],
  },
];
