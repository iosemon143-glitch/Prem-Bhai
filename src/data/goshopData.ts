export interface GoShopProduct {
  id: string;
  title: string;
  category: string;
  snippet: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  date: string;
  imageUrl: string;
  badge?: string;
  specs: string[];
  inStock: boolean;
}

export const GOSHOP_PRODUCTS: GoShopProduct[] = [
  {
    id: 'goshop_1',
    title: 'Titanium Glass Watch Ultra',
    category: 'Wearables',
    snippet: 'Precision-milled aerospace titanium frame with curved sapphire crystal display, cellular 5G telemetry and 72-hour battery life.',
    description: 'Designed for extreme durability and absolute elegance. The Titanium Glass Watch Ultra features edge-to-edge sapphire glass, continuous heart-rate & ECG monitoring, water resistance up to 100m, and dual-frequency GPS navigation.',
    price: 399,
    originalPrice: 479,
    rating: 4.9,
    reviewCount: 184,
    date: 'Oct 04, 2026',
    imageUrl: '/src/assets/images/goshop_glass_watch_1791112511774.jpg',
    badge: 'Trending Drop',
    specs: ['Aerospace Grade 5 Titanium', 'Sapphire Crystal Glass', '72-Hour Continuous Battery', 'Waterproof 100m ATM'],
    inStock: true,
  },
  {
    id: 'goshop_2',
    title: 'Spatial Studio Acoustic Pro',
    category: 'Audio',
    snippet: 'Next-generation high-fidelity spatial audio headphones with frosted glass acoustic chambers and active transparency mode.',
    description: 'Immerse yourself in dynamic head tracking sound. Engineered with custom 40mm neodymium drivers, active noise cancellation with 8 precision microphones, and breathable memory foam ear cushions.',
    price: 289,
    originalPrice: 349,
    rating: 4.8,
    reviewCount: 92,
    date: 'Oct 02, 2026',
    imageUrl: '/src/assets/images/goshop_spatial_audio_1791112525423.jpg',
    badge: 'Audiophile Choice',
    specs: ['Lossless 24-bit 96kHz Audio', 'Active Noise Cancellation', '38-Hour Battery with Quick Charge', 'Frosted Aluminum Band'],
    inStock: true,
  },
  {
    id: 'goshop_3',
    title: 'Nova Titanium Flagship 16',
    category: 'Mobile & Flagships',
    snippet: 'Ultra-thin bezel design with fluid 144Hz Liquid OLED display, cinematic triple-lens telephoto array and neural processor.',
    description: 'The pinnacle of mobile engineering. Built with aerospace-grade titanium borders, ceramic shield front glass, 50MP periscope zoom lens, and all-day intelligent battery optimization.',
    price: 899,
    originalPrice: 999,
    rating: 5.0,
    reviewCount: 310,
    date: 'Sep 29, 2026',
    imageUrl: '/src/assets/images/goshop_sleek_phone_1791112538452.jpg',
    badge: 'Bestseller',
    specs: ['6.7" Liquid OLED 144Hz', 'Neural Silicon Gen 4', '50MP Triple Lens Pro Camera', 'IP68 Dust & Water Resistant'],
    inStock: true,
  },
  {
    id: 'goshop_4',
    title: 'Artisan Bridle Leather Carryall & Mug',
    category: 'Artisan Gear',
    snippet: 'Handcrafted vegetable-tanned Italian leather essentials paired with bespoke ceramic tableware for the modern connoisseur.',
    description: 'Saddle-stitched by hand with waxed linen thread. Includes heavy-gauge brass hardware and protective felt lining for laptops up to 16 inches.',
    price: 145,
    originalPrice: 180,
    rating: 4.9,
    reviewCount: 76,
    date: 'Sep 26, 2026',
    imageUrl: '/src/assets/images/store_product_showcase_1791109979183.jpg',
    badge: 'Limited Handcraft',
    specs: ['Full-Grain Vegetable Tanned Leather', 'Handmade Ceramic Mug Included', 'Lifetime Stitch Guarantee', 'Solid Brass Rivets'],
    inStock: true,
  },
  {
    id: 'goshop_5',
    title: 'Designer Slate Studio Tablet Pro',
    category: 'Wearables',
    snippet: 'Ultra-responsive digital canvas with 4K HDR color accuracy, haptic stylus integration, and multi-angle magnetic stand.',
    description: 'Turn imagination into reality. Features 100% DCI-P3 color gamut, zero parallax optical bonding, and 12-hour continuous battery for digital creators and architects.',
    price: 649,
    originalPrice: 720,
    rating: 4.8,
    reviewCount: 64,
    date: 'Sep 22, 2026',
    imageUrl: '/src/assets/images/portfolio_project_mockup_1791109968821.jpg',
    badge: 'Creator Special',
    specs: ['4K True HDR Display', '4096 Levels Pressure Stylus', 'Thunderbolt 4 Connectivity', 'Featherweight 490g'],
    inStock: true,
  },
  {
    id: 'goshop_6',
    title: 'Minimalist Oak & Glass Workspace Deck',
    category: 'Artisan Gear',
    snippet: 'Sleek architectural workstation stand with integrated wireless charging matrix and clean cable management channel.',
    description: 'Milled from sustainable European white oak with polished frosted acrylic accents. Elevates monitors to ergonomic eye level while hiding hubs and cords.',
    price: 120,
    originalPrice: 150,
    rating: 4.7,
    reviewCount: 48,
    date: 'Sep 18, 2026',
    imageUrl: '/src/assets/images/hero_agency_workspace_1791109954795.jpg',
    badge: 'Ergonomic Choice',
    specs: ['Sustainable Solid White Oak', '15W Fast Qi Wireless Pad', 'Heavy-Duty 30kg Load Capacity', 'Anodized Aluminum Feet'],
    inStock: true,
  },
];

export const GOSHOP_BLOGGER_XML_TEMPLATE = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title><data:blog.pageTitle/></title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

    <b:skin><![CDATA[
        /* 
        --------------------------------------------------
        GoShop Ultra-Premium Liquid Glass Real Store Theme
        -------------------------------------------------- 
        */

        :root {
            --bg-base: #f1f5f9;
            --glass-bg: rgba(255, 255, 255, 0.75);
            --glass-border: rgba(255, 255, 255, 0.95);
            --glass-shadow: 0 30px 60px rgba(0, 113, 227, 0.08), 0 4px 12px rgba(0,0,0,0.03);
            --glass-card: rgba(255, 255, 255, 0.85);
            --text-main: #0f172a;
            --text-muted: #64748b;
            --primary: #0071e3;
            --primary-gradient: linear-gradient(135deg, #0071e3, #5e5ce6);
            --radius-lg: 32px;
            --radius-md: 24px;
            --radius-sm: 16px;
            --transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        * {
            box-sizing: border-box !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            -webkit-font-smoothing: antialiased;
        }

        body {
            background-color: var(--bg-base) !important;
            color: var(--text-main) !important;
            min-height: 100vh;
            overflow-x: hidden;
            background-image: 
                radial-gradient(circle at 10% 15%, rgba(0, 113, 227, 0.12) 0%, transparent 45%),
                radial-gradient(circle at 90% 85%, rgba(94, 92, 230, 0.12) 0%, transparent 45%);
            background-attachment: fixed;
            padding-bottom: 80px;
        }

        /* Hide unwanted default elements */
        .status-msg-wrap, .blog-pager, .feed-links {
            display: none !important;
        }

        .liquid-glass {
            background: var(--glass-bg) !important;
            backdrop-filter: blur(35px) saturate(200%) !important;
            -webkit-backdrop-filter: blur(35px) saturate(200%) !important;
            border: 1px solid var(--glass-border) !important;
            box-shadow: var(--glass-shadow) !important;
        }

        .liquid-glass-card {
            background: var(--glass-card) !important;
            backdrop-filter: blur(25px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(25px) saturate(180%) !important;
            border: 1px solid rgba(255, 255, 255, 1) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05) !important;
            transition: var(--transition) !important;
        }

        .liquid-glass-card:hover {
            transform: translateY(-10px) scale(1.01) !important;
            box-shadow: 0 35px 70px rgba(0, 113, 227, 0.15) !important;
            border-color: var(--primary) !important;
        }

        /* Header Styling */
        header {
            position: sticky;
            top: 0;
            z-index: 1000;
            width: 100%;
            padding: 20px 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        }

        .brand-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            font-weight: 800;
            font-size: 28px;
            color: var(--text-main);
        }

        .brand-logo span {
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .brand-logo i {
            color: var(--primary);
            font-size: 24px;
            animation: pulseIcon 2s infinite ease-in-out;
        }

        @keyframes pulseIcon {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,113,227,0)); }
            50% { transform: scale(1.2); filter: drop-shadow(0 0 12px rgba(0,113,227,0.7)); }
        }

        .header-search {
            flex: 0 1 540px;
            position: relative;
        }

        .header-search input {
            width: 100%;
            padding: 16px 24px 16px 54px;
            border-radius: 99px;
            border: 1px solid rgba(255, 255, 255, 0.9);
            background: rgba(255, 255, 255, 0.85);
            font-size: 15px;
            font-weight: 600;
            color: var(--text-main);
            outline: none;
            transition: var(--transition);
            box-shadow: inset 0 2px 6px rgba(0,0,0,0.02);
        }

        .header-search input:focus {
            background: #fff;
            border-color: var(--primary);
            box-shadow: 0 0 0 6px rgba(0, 113, 227, 0.15), inset 0 2px 4px rgba(0,0,0,0.02);
        }

        .header-search i {
            position: absolute;
            left: 24px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--primary);
            font-size: 18px;
        }

        .header-badge {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 20px;
            border-radius: 99px;
            background: rgba(0, 113, 227, 0.08);
            border: 1px solid rgba(0, 113, 227, 0.15);
            font-weight: 700;
            font-size: 14px;
            color: var(--primary);
        }

        .main-container {
            max-width: 1440px;
            margin: 0 auto;
            padding: 40px 48px;
        }

        /* Hero Section */
        .hero-section {
            border-radius: var(--radius-lg);
            padding: 60px 70px;
            position: relative;
            overflow: hidden;
            margin-bottom: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .hero-title {
            font-size: 56px;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 18px;
            letter-spacing: -2px;
        }

        .hero-title span {
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-desc {
            font-size: 18px;
            color: var(--text-muted);
            font-weight: 500;
            max-width: 650px;
            line-height: 1.6;
        }

        /* Product Grid */
        .product-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
        }

        .product-card {
            border-radius: var(--radius-md);
            padding: 24px;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            color: inherit;
        }

        .product-image-container {
            width: 100%;
            height: 270px;
            border-radius: var(--radius-sm);
            overflow: hidden;
            background: #e2e8f0;
            position: relative;
        }

        .product-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .product-image-container img {
            transform: scale(1.08);
        }

        .product-info {
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .product-name {
            font-size: 20px;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 12px;
            line-height: 1.35;
        }

        .product-snippet {
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 20px;
            flex: 1;
        }

        .product-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 16px;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .post-date {
            font-size: 13px;
            font-weight: 700;
            color: var(--text-muted);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .read-more-btn {
            background: var(--text-main);
            color: #fff;
            padding: 12px 24px;
            border-radius: 99px;
            font-size: 14px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: var(--transition);
        }

        .product-card:hover .read-more-btn {
            background: var(--primary);
            box-shadow: 0 8px 25px rgba(0, 113, 227, 0.35);
        }

        @media (max-width: 1100px) {
            .product-grid { grid-template-columns: repeat(2, 1fr); }
            .hero-section { padding: 45px; text-align: center; }
            .hero-desc { margin: 0 auto; }
        }

        @media (max-width: 768px) {
            header { padding: 16px 20px; }
            .header-search { display: none; }
            .product-grid { grid-template-columns: 1fr; }
            .main-container { padding: 20px; }
            .hero-title { font-size: 38px; }
        }
    ]]></b:skin>
</head>
<body>

    <header class="liquid-glass">
        <a expr:href='data:blog.homepageUrl' class="brand-logo">
            <i class="fa-solid fa-bolt-lightning"></i>
            <span>GoShop</span>
        </a>
        <div class="header-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="liveSearchInput" placeholder="Search elite products, posts..." onkeyup="filterBlogPosts()" />
        </div>
        <div class="header-badge">
            <i class="fa-solid fa-fire-flame-curved" style="color: #ff3b30;"></i> 
            <span>Live Store</span>
        </div>
    </header>

    <div class="main-container">
        <section class="hero-section liquid-glass">
            <div>
                <h1 class="hero-title">Exclusive Collection. <span>Pure Liquid Glass.</span></h1>
                <p class="hero-desc">Explore our latest authentic posts, drops, and elite performance gear designed with unmatched Apple-grade aesthetics and absolute smoothness.</p>
            </div>
        </section>

        <!-- Blogger Main Widget Wrapper -->
        <b:section id='main-wrapper' showaddelement='no'>
            <b:widget id='Blog1' locked='true' type='Blog' title='Blog Posts'>
                <b:includable id='main'>
                    <div class="product-grid" id="realPostsGrid">
                        <b:loop values='data:posts' var='post'>
                            <div class="product-card liquid-glass-card searchable-item">
                                <div class="product-image-container">
                                    <b:if cond='data:post.firstImageUrl'>
                                        <img expr:src='data:post.firstImageUrl' expr:alt='data:post.title'/>
                                    <b:else/>
                                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Default"/>
                                    </b:if>
                                </div>
                                <div class="product-info">
                                    <h3 class="product-name post-title-text"><data:post.title/></h3>
                                    <p class="product-snippet">
                                        <b:if cond='data:post.snippet'><data:post.snippet/></b:if>
                                    </p>
                                    <div class="product-footer">
                                        <span class="post-date"><i class="fa-regular fa-calendar-days"></i> <data:post.date/></span>
                                        <a expr:href='data:post.url' class="read-more-btn">
                                            View Details <i class="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </b:loop>
                    </div>
                </b:includable>
            </b:widget>
        </b:section>
    </div>

    <script type="text/javascript">
    /* <![CDATA[ */
        function filterBlogPosts() {
            var input = document.getElementById('liveSearchInput').value.toLowerCase();
            var cards = document.getElementsByClassName('searchable-item');

            for (var i = 0; i < cards.length; i++) {
                var titleElement = cards[i].querySelector('.post-title-text');
                var title = titleElement ? titleElement.textContent.toLowerCase() : '';
                if (title.indexOf(input) > -1) {
                    cards[i].style.display = "flex";
                } else {
                    cards[i].style.display = "none";
                }
            }
        }
    /* ]]> */
    </script>
</body>
</html>`;
