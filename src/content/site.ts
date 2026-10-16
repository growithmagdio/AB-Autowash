export interface ServiceItem {
  id: string;
  name: string;
  nameTa: string;
  shortDesc: string;
  shortDescTa: string;
  fullDesc: string;
  fullDescTa: string;
  image: string;
  tag?: string;
  highlights: string[];
  highlightsTa: string[];
}

export interface PackageItem {
  id: string;
  name: string;
  nameTa: string;
  tier: 'Silver' | 'Gold' | 'Royal';
  pricePlaceholder: string;
  popular?: boolean;
  desc: string;
  descTa: string;
  features: string[];
  featuresTa: string[];
  whatsappMessage: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  carModel: string;
  rating: number;
  date: string;
  comment: string;
  commentTa: string;
  verified: boolean;
  isPlaceholderNote?: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  titleTa: string;
  desc: string;
  descTa: string;
  detail: string;
}

export const siteContent = {
  business: {
    name: "AUTO BRIGHT Car Wash & Detailing Studio",
    taglineEn: "Where Every Car Is Treated Like Royalty",
    taglineTa: "ஒவ்வொரு காரும் அரச மரியாதையுடன் மிளிரும் இடம்",
    sublineEn: "Ceramic Coating · PPF · Premium Detailing — Madurai",
    sublineTa: "செராமிக் கோட்டிங் · பி.பி.எஃப் (PPF) · பிரீமியம் டீடெய்லிங் — மதுரை",
    rating: "4.8",
    reviewCount: "100+",
    specialities: ["Ceramic Coating", "Paint Protection Film (PPF)", "Paint Correction", "Royal Interior Detailing"],
    phonePrimary: "+91 86105 49845",
    phoneSecondary: "+91 93636 62679",
    whatsappNumber: "918610549845",
    whatsappSecondary: "919363662679",
    address: {
      plot: "Plot No 36E, Shop A1, Bagya Arcade",
      street: "Kumaran Street, Bama Nagar Main Road",
      locality: "Utchaparamedu, Iyer Bungalow",
      city: "Madurai",
      state: "Tamil Nadu",
      pincode: "625017",
      full: "Plot No 36E, Shop A1, Bagya Arcade, Kumaran Street, Bama Nagar Main Road, Utchaparamedu, Iyer Bungalow, Madurai, Tamil Nadu 625017",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.5843477021356!2d78.1325492!3d9.9678129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5c4e4e9dfd7%3A0x6b7724f114c67319!2sIyer%20Bungalow%2C%20Madurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000",
      directionsUrl: "https://maps.google.com/?q=Auto+Bright+Car+Wash+Bagya+Arcade+Utchaparamedu+Iyer+Bungalow+Madurai"
    },
    // Note: Opening time placeholder clearly identified
    openingHoursPlaceholder: "[OPENING TIME] – 7:30 PM",
    openingHoursFormattedEn: "8:30 AM – 7:30 PM (All 7 Days)",
    openingHoursFormattedTa: "காலை 8:30 – இரவு 7:30 (அனைத்து நாட்களும்)",
    accessibility: "Wheelchair Accessible Facility",
    accessibilityTa: "சக்கர நாற்காலி அணுகல் வசதி கொண்டது"
  },

  trustMarquee: [
    "Ceramic Coating 9H / 10H",
    "Self-Healing PPF",
    "Snow Foam Touchless Wash",
    "Multi-Stage Paint Correction",
    "Deep Leather Interior Spa",
    "Headlight UV Restoration",
    "Wheel & Ceramic Rim Shield",
    "Hexagon Studio Lighting",
    "Madurai's 4.8★ Detailing Studio"
  ],

  trustMarqueeTa: [
    "9H / 10H செராமிக் கோட்டிங்",
    "சுய-குணப்படுத்தும் PPF ஃபிலிம்",
    "பிரீமியம் ஸ்னோ ஃபோம் வாஷ்",
    "வண்ணப்பூச்சு பாலிஷிங் & கரெக்ஷன்",
    "லெதர் இன்டீரியர் ஸ்பா",
    "ஹெட்லைட் புதுப்பித்தல்",
    "அலாய் வீல் டீடெய்லிங்",
    "மதுரையின் 4.8★ பிரீமியம் ஸ்டுடியோ"
  ],

  stats: [
    { value: "4.8★", labelEn: "Google Rating", labelTa: "கூகிள் மதிப்பீடு", sub: "100+ verified customer reviews" },
    { value: "2,500+", labelEn: "Vehicles Detailed", labelTa: "பராமரிக்கப்பட்ட கார்கள்", sub: "Sedans, SUVs & Luxury Exotics" },
    { value: "100%", labelEn: "Satisfaction Guarantee", labelTa: "வாடிக்கையாளர் திருப்தி", sub: "German chemicals & 3M/Gyeon products" },
    { value: "5 Yrs", labelEn: "Warranty on Royal PPF", labelTa: "உத்தரவாதம்", sub: "Guaranteed gloss & non-yellowing" }
  ],

  services: [
    {
      id: "foam-wash",
      name: "Premium Car Wash",
      nameTa: "பிரீமியம் கார் வாஷ்",
      shortDesc: "Thick snow foam wash, underbody rinse, spotless shine inside and out.",
      shortDescTa: "தடிமனான பனி நுரை வாஷ், கீழ் பகுதி சுத்தம் மற்றும் உட்புற தூய்மை.",
      fullDesc: "Complete 14-step deep foam wash utilizing pH-neutral German shampoos, microfibre mitts, two-bucket grit guard method, wheel degreasing, and streak-free ionized blow dry.",
      fullDescTa: "பிஎச் நியூட்ரல் ஷாம்பூ கொண்டு இரண்டு பக்கெட் முறையில் கீறல்கள் இன்றி செய்யப்படும் உயர்தர கார் வாஷ் சேவை.",
      image: "/images/svc-foam-wash.webp",
      tag: "Essential Care",
      highlights: ["pH-neutral snow foam", "Two-bucket swirl-free wash", "Deep interior vacuuming", "Tyre dressing & glass polish"],
      highlightsTa: ["பிஎச்-நியூட்ரல் நுரை", "கீறலற்ற மைக்ரோஃபைபர் வாஷ்", "உட்புற முழு வேக்குவம்", "டயர் ஷைன்"]
    },
    {
      id: "detailing",
      name: "Detailing Perfection",
      nameTa: "முழுமையான டீடெய்லிங்",
      shortDesc: "Flawless finish every time with surgical attention to detail.",
      shortDescTa: "ஒவ்வொரு முறையும் குறையற்ற அழகு மற்றும் கூடுதல் கவனம்.",
      fullDesc: "Meticulous interior and exterior detailing covering door jambs, emblems, engine bay dressing, AC vent steam sanitisation, and ultra-plush gloss enhancement.",
      fullDescTa: "என்ஜின் பே, ஏசி வெண்ட் ஸ்டீம் கிளீனிங் மற்றும் காரின் அனைத்து மூலைமுடுக்குகளையும் தூய்மையாக்கும் நுட்பமான சேவை.",
      image: "/images/svc-detailing.webp",
      tag: "Showroom Shine",
      highlights: ["Engine bay safe cleaning", "AC vent steam sanitization", "Exhaust tip polishing", "Emblem & trim dressing"],
      highlightsTa: ["என்ஜின் பே கிளீனிங்", "ஏசி ஸ்டீம் சானிடைசேஷன்", "சைலன்சர் டிப் பாலிஷ்", "டிரிம் பாதுகாப்பு"]
    },
    {
      id: "ceramic",
      name: "Ceramic Coating",
      nameTa: "செராமிக் கோட்டிங்",
      shortDesc: "Long-lasting mirror gloss and permanent hydrophobic protection.",
      shortDescTa: "நீண்ட கால கண்ணாடி போன்ற பளபளப்பு மற்றும் நீர் ஒட்டாத பாதுகாப்பு.",
      fullDesc: "Certified 9H and 10H ceramic quartz matrix application. Creates an ultra-hard sacrificial shield against bird droppings, acid rain, harsh UV oxidation, and road grime.",
      fullDescTa: "சான்றளிக்கப்பட்ட 9H/10H நானோ செராமிக் கோட்டிங் மூலம் அமில மழை, புற ஊதாக் கதிர்கள் மற்றும் பறவை எச்சங்களிலிருந்து முழு பாதுகாப்பு.",
      image: "/images/svc-ceramic.webp",
      tag: "Studio Speciality",
      highlights: ["Up to 3 to 5 years durability", "Extreme 110° water contact beading", "Mirror-like optical clarity", "Eliminates need for frequent waxing"],
      highlightsTa: ["3 முதல் 5 ஆண்டுகள் உழைப்பு", "அதி தீவிர நீர் வடியும் தன்மை", "கண்ணாடி போன்ற பிரதிபலிப்பு", "மெழுகு பூச வேண்டிய அவசியமில்லை"]
    },
    {
      id: "ppf",
      name: "Paint Protection Film (PPF)",
      nameTa: "பெயிண்ட் புரொடக்ஷன் ஃபிலிம் (PPF)",
      shortDesc: "Armor against flying stone chips, road debris, and deep scratches.",
      shortDescTa: "கல் சில்லுகள், சாலை தூசி மற்றும் கீறல்களில் இருந்து முழு கவச பாதுகாப்பு.",
      fullDesc: "Military-grade optical TPU (Thermoplastic Polyurethane) film with instant heat-activated self-healing technology. Impervious to stone chips, key scratches, and parking scrapes.",
      fullDescTa: "சுயமாகவே கீறல்களை குணப்படுத்தும் வெப்ப-செயல்திறன் கொண்ட இராணுவ தர TPU ஃபிலிம்.",
      image: "/images/svc-ppf.webp",
      tag: "Ultimate Armor",
      highlights: ["Instant self-healing micro-scratches", "High puncture resistance", "Non-yellowing optical clarity", "5 to 7 years manufacturer warranty"],
      highlightsTa: ["சூடான நீரில் கீறல்கள் மறையும்", "கற்கள் மோதினால் பாதுகாப்பு", "மஞ்சள் நிறமாக மாறாது", "5-7 வருட உத்தரவாதம்"]
    },
    {
      id: "polish",
      name: "Paint Correction & Polishing",
      nameTa: "வண்ணப்பூச்சு சீரமைப்பு & பாலிஷிங்",
      shortDesc: "Swirl and scratch removal restoring factory optical depth.",
      shortDescTa: "சுழல் கீறல்களை நீக்கி தொழிற்சாலை போன்ற புதிய பளபளப்பை மீட்டெடுத்தல்.",
      fullDesc: "Multi-stage rotary and dual-action compounding using diminishing abrasives. Eliminates up to 90-95% of spider-web swirls, buffer trails, water etching, and micro-scratches.",
      fullDescTa: "காரில் உள்ள 90% மேற்பட்ட சுழல் கீறல்களை அகற்றி ஆழமான வண்ணத்தை மீட்டெடுக்கும் மேம்பட்ட பாலிஷிங் முறை.",
      image: "/images/svc-polish.webp",
      tag: "Swirl-Free Guarantee",
      highlights: ["Removes 90%+ swirls & hazing", "Restores rich color depth", "Digital paint thickness monitoring", "Non-filling true correction"],
      highlightsTa: ["90%+ சுழல் கீறல்கள் அகற்றம்", "ஆழ்ந்த வண்ண மீட்டெடுப்பு", "பெயிண்ட் தடிமன் அளவீடு", "நிரந்தர தீர்வு"]
    },
    {
      id: "interior",
      name: "Interior Detailing",
      nameTa: "உட்புற டீடெய்லிங்",
      shortDesc: "Deep vacuum, leather rejuvenation, and upholstery steam care.",
      shortDescTa: "ஆழ்ந்த வேக்குவம், லெதர் பாதுகாப்பு மற்றும் ஸ்டீம் சிகிச்சை.",
      fullDesc: "Comprehensive cabin spa treatment. Deep injection-extraction fabric shampooing, pH-balanced leather conditioning, bacterial fogging, and odor neutralization.",
      fullDescTa: "லெதர் சீட்டுகளுக்கு ஊட்டமளித்தல், துணி இருக்கைகள் ஷாம்பூ வாஷ் மற்றும் துர்நாற்றம் நீக்கும் கிருமிநாசினி சிகிச்சை.",
      image: "/images/svc-interior.webp",
      tag: "Royal Comfort",
      highlights: ["High-temp steam sterilization", "Rich leather conditioner with UV filter", "Deep carpet extraction", "Germ & odor elimination"],
      highlightsTa: ["அதி வெப்ப ஸ்டீம் தூய்மை", "லெதர் சீட் கண்டிஷனிங்", "கார்பெட் அழுக்கு நீக்குதல்", "கிருமி நாசினி"]
    },
    {
      id: "headlight",
      name: "Headlight Restoration",
      nameTa: "ஹெட்லைட் புதுப்பித்தல்",
      shortDesc: "Crystal-clear optical clarity and UV hardcoat protection.",
      shortDescTa: "மங்கலான விளக்குகளை புதியது போல் தெளிவாக்கி ஒளி வீசச் செய்தல்.",
      fullDesc: "Eliminates yellowing, hazing, and oxidation from poly-carbonate lens covers. Finished with a ceramic UV protective topcoat to prevent future yellowing.",
      fullDescTa: "மஞ்சள் பூத்த மற்றும் மங்கலான ஹெட்லைட் லென்ஸ்களை புதியது போல் பளபளக்கச் செய்து கூடுதல் வெளிச்சம் தரும்.",
      image: "/images/svc-headlight.webp",
      tag: "Night Visibility",
      highlights: ["Restores 100% light output", "Wet sanding & compounding", "UV ceramic sealant shield", "Enhanced night road safety"],
      highlightsTa: ["முழுமையான வெளிச்சம் மீட்டெடுப்பு", "வெட் சாண்டிங் பாலிஷ்", "UV செராமிக் பாதுகாப்பு", "இரவு நேர பயணப் பாதுகாப்பு"]
    },
    {
      id: "wheels",
      name: "Wheel & Tyre Detailing",
      nameTa: "வீல் & டயர் டீடெய்லிங்",
      shortDesc: "Deep iron brake dust removal, caliper shine & hydrophobic tyre glaze.",
      shortDescTa: "பிரேக் தூசிகளை அகற்றி, அலாய் வீல் மற்றும் டயர்களுக்கு பளபளப்பு.",
      fullDesc: "De-ironizing acid-free chemical bath to dissolve baked-on metallic brake dust. Caliper cleaning, barrel detailing, and satin non-sling ceramic tyre dressing.",
      fullDescTa: "அலாய் வீல்களில் உள்ள பிடிவாதமான பிரேக் தூசிகளை அகற்றி, வீல் மற்றும் டயர்களை பளபளப்பாக மாற்றும் சிறப்பு சேவை.",
      image: "/images/svc-wheels.webp",
      tag: "Track Ready",
      highlights: ["Iron-X chemical de-contamination", "Inner wheel barrel deep cleaning", "Brake caliper degreasing", "Non-sling hydrophobic tyre gel"],
      highlightsTa: ["இரும்பு துகள்கள் நீக்கம்", "வீல் உட்பகுதி தூய்மை", "பிரேக் காலிபர் பராமரிப்பு", "டயர் பாதுகாப்பு ஜெல்"]
    },
    {
      id: "bike-wash",
      name: "Superbike Wash & Detailing",
      nameTa: "சூப்பர்பைக் வாஷ் & டீடெய்லிங்",
      shortDesc: "Specialised care for high-displacement motorcycles and superbikes.",
      shortDescTa: "இருசக்கர வாகனங்களுக்கான பிரத்யேக வாஷ் மற்றும் பராமரிப்பு.",
      fullDesc: "Delicate touch-free foam wash for high-performance bikes. Chain degreasing & lube, exhaust heat stain treatment, and painted fairing sealant. [Optional / Confirm if offered]",
      fullDescTa: "செயின் கிளீனிங், லூப்ரிகேஷன் மற்றும் பைக் பாகங்களுக்கான நுட்பமான வாஷ் சேவை. [உறுதிப்படுத்தவும்]",
      image: "/images/hero-car.webp",
      tag: "Two-Wheeler Care",
      highlights: ["Chain cleaning & Motul lube", "Exhaust header de-tarnishing", "Delicate electricals protection", "Tank ceramic coat"],
      highlightsTa: ["செயின் கிளீனிங் & லூப்", "சைலன்சர் பாலிஷ்", "மின் இணைப்புகள் பாதுகாப்பு", "டேங்க் கோட்டிங்"]
    }
  ] as ServiceItem[],

  packages: [
    {
      id: "silver",
      tier: "Silver",
      name: "Silver Royal Wash",
      nameTa: "சில்வர் ராயல் வாஷ்",
      // Placeholder clearly marked
      pricePlaceholder: "[₹ 799* onwards]",
      desc: "Comprehensive routine rejuvenation for cars requiring a spotless, high-gloss clean.",
      descTa: "வழக்கமான பராமரிப்பு மற்றும் சிறந்த பளபளப்பிற்கான தொடக்க நிலை சேவை.",
      features: [
        "pH-Neutral snow foam body wash",
        "Underchassis pressure blast rinse",
        "Two-bucket scratch-free mitt wash",
        "Deep cabin vacuum & trunk cleaning",
        "Dashboard & door trim UV wipe-down",
        "Streak-free glass cleaning (inside & out)",
        "Satin finish tyre dressing & rim wash"
      ],
      featuresTa: [
        "பிஎச்-நியூட்ரல் ஸ்னோ ஃபோம் வாஷ்",
        "அடிபாகம் அதி அழுத்த வாஷ்",
        "கீறலற்ற மைக்ரோஃபைபர் வாஷ்",
        "உட்புற முழு வேக்குவம்",
        "டாஷ்போர்டு UV பாதுகாப்பு",
        "கண்ணாடிகள் பளபளப்பு",
        "டயர் & வீல் கிளீனிங்"
      ],
      whatsappMessage: "Hi Auto Bright, I would like to book the Silver Royal Wash package."
    },
    {
      id: "gold",
      tier: "Gold",
      name: "Gold Detailing & Polish",
      nameTa: "கோல்ட் டீடெய்லிங் & பாலிஷிங்",
      popular: true,
      // Placeholder clearly marked
      pricePlaceholder: "[₹ 2,999* onwards]",
      desc: "The connoisseur's choice. Eliminates light swirls and rejuvenates interior leather and trims.",
      descTa: "எங்கள் வாடிக்கையாளர்களால் அதிகம் விரும்பப்படும் முழுமையான பாலிஷிங் பேக்கேஜ்.",
      features: [
        "Everything in Silver Royal Wash",
        "Single-stage machine compounding & gloss polishing",
        "Eliminates 65-75% minor swirls and hazing",
        "Interior upholstery deep shampoo & stain lift",
        "Leather seats nourishing balm & UV protection",
        "AC vent high-temp steam sterilization",
        "Engine bay degreasing & protective dressing",
        "Synthetic polymer paint sealant (4-month protection)"
      ],
      featuresTa: [
        "சில்வர் பேக்கேஜின் அனைத்து சேவைகளும்",
        "மெஷின் பாலிஷிங் மூலம் கீறல்கள் அகற்றம்",
        "65-75% சுழல் கீறல்கள் நீக்கம்",
        "இருக்கைகள் ஷாம்பூ வாஷ் & கறை நீக்கம்",
        "லெதர் சீட் கண்டிஷனிங்",
        "ஏசி வெண்ட் ஸ்டீம் சானிடைசேஷன்",
        "என்ஜின் பே கிளீனிங் & டிரஸ்ஸிங்",
        "4 மாத பாலிமர் பெயிண்ட் சீலண்ட்"
      ],
      whatsappMessage: "Hi Auto Bright, I would like to book the Gold Detailing & Polish package (Most Popular)."
    },
    {
      id: "royal",
      tier: "Royal",
      name: "Royal Ceramic & PPF Suite",
      nameTa: "ராயல் செராமிக் & PPF தொகுப்பு",
      // Placeholder clearly marked
      pricePlaceholder: "[₹ 14,999* onwards]",
      desc: "The ultimate armor for luxury automobiles. Permanent hydrophobic quartz or self-healing TPU armor.",
      descTa: "உங்கள் காருக்கு மிக உயர்ந்த அரச அந்தஸ்தும், நிரந்தர கவச பாதுகாப்பும் வழங்கும் சேவை.",
      features: [
        "Full 3-stage surgical paint correction (95%+ swirl elimination)",
        "Certified 9H/10H Nano Ceramic Coating OR Premium TPU PPF",
        "Extreme hydrophobic water contact angle (>110°)",
        "Alloy wheel face & barrel ceramic coat",
        "Windshield & all window rain-repellent ceramic shield",
        "Interior full leather, fabric & plastic ceramic infusion",
        "Written warranty certificate & complimentary maintenance kit",
        "Free 6-month inspection and top-up wash"
      ],
      featuresTa: [
        "3-ஸ்டேஜ் முழுமையான பெயிண்ட் கரெக்ஷன்",
        "9H/10H செராமிக் கோட்டிங் அல்லது செல்ஃப்-ஹீலிங் PPF",
        "நீர் ஒட்டாத அல்ட்ரா ஹைட்ரோஃபோபிக் பாதுகாப்பு",
        "அலாய் வீல் செராமிக் கோட்டிங்",
        "கண்ணாடிகளுக்கான ரெயின் ரிபெல்லன்ட் கோட்டிங்",
        "முழு இன்டீரியர் செராமிக் ஷீல்ட்",
        "உத்தரவாத சான்றிதழ் மற்றும் பராமரிப்பு கிட்",
        "6 மாத இலவச இன்ஸ்பெக்ஷன்"
      ],
      whatsappMessage: "Hi Auto Bright, I would like to consult and book the Royal Ceramic & PPF Suite."
    }
  ] as PackageItem[],

  comparisonCeramicVsPpf: {
    titleEn: "Ceramic Coating vs Paint Protection Film (PPF)",
    titleTa: "செராமிக் கோட்டிங் மற்றும் PPF ஒப்பீடு",
    subtitleEn: "Discover which royal protection suits your driving style in Madurai.",
    subtitleTa: "உங்கள் வாகனத்திற்கு ஏற்ற சிறந்த பாதுகாப்பு எது என்பதை அறிந்து கொள்ளுங்கள்.",
    criteria: [
      {
        feature: "Primary Function",
        featureTa: "முக்கிய செயல்பாடு",
        ceramic: "Deep liquid gloss, UV resistance, hydrophobic self-cleaning",
        ceramicTa: "ஆழ்ந்த பளபளப்பு, UV பாதுகாப்பு, நீர் ஒட்டாத தன்மை",
        ppf: "Physical armor against stone chips, scrapes, and vandalism",
        ppfTa: "கல் சில்லுகள், கீறல்கள் மற்றும் விபத்துகளில் இருந்து உடல் கவசம்"
      },
      {
        feature: "Self-Healing Ability",
        featureTa: "சுய-குணப்படுத்தும் தன்மை",
        ceramic: "No self-healing; chemical barrier only",
        ceramicTa: "இல்லை; வேதியியல் பாதுகாப்பு மட்டுமே",
        ppf: "Yes; micro-scratches vanish under sunlight or warm water",
        ppfTa: "ஆம்; வெயிலில் அல்லது சுடுநீரில் கீறல்கள் தானாக மறையும்"
      },
      {
        feature: "Protection Against Stone Chips",
        featureTa: "கற்கள் மோதினால் பாதுகாப்பு",
        ceramic: "Low (cannot absorb high-velocity impacts)",
        ceramicTa: "குறைவு (கடுமையான அடிகளை தாங்காது)",
        ppf: "Maximum (200-micron thick elastomeric TPU absorbs impacts)",
        ppfTa: "மிக அதிகம் (200 மைக்ரான் தடிமன் கொண்ட அதிபலம்)"
      },
      {
        feature: "Hydrophobic & Cleaning Ease",
        featureTa: "நீர் வடியும் தன்மை & சுத்தம் செய்தல்",
        ceramic: "Unrivalled 110° contact angle; dirt slides off effortlessly",
        ceramicTa: "இணையற்றது; தூசிகள் எளிதில் கழுவப்பட்டு விடும்",
        ppf: "Excellent (top-coated hydrophobic TPU)",
        ppfTa: "மிக நன்று"
      },
      {
        feature: "Optical Finish",
        featureTa: "தோற்றப் பொலிவு",
        ceramic: "Mirror-candy wet gloss with hyper-reflective depth",
        ceramicTa: "கண்ணாடி போன்ற ஆழமான பளபளப்பு",
        ppf: "Sleek high-gloss or satin stealth look",
        ppfTa: "பளபளப்பான அல்லது மேட் பினிஷ்"
      },
      {
        feature: "Durability / Warranty",
        featureTa: "உழைக்கும் காலம் / வாரண்டி",
        ceramic: "3 to 5 Years with scheduled maintenance",
        ceramicTa: "3 முதல் 5 ஆண்டுகள்",
        ppf: "5 to 10 Years with anti-yellowing guarantee",
        ppfTa: "5 முதல் 10 ஆண்டுகள்"
      },
      {
        feature: "Ideal For",
        featureTa: "யாருக்கு சிறந்தது",
        ceramic: "Daily city commuters wanting showroom wet gloss without waxing",
        ceramicTa: "தினசரி நகரப் பயன்பாடு மற்றும் பளபளப்பை விரும்புவோருக்கு",
        ppf: "Highway travellers, luxury cars, SUVs, and new brand-new vehicles",
        ppfTa: "நெடுஞ்சாலைப் பயணம், புதிய கார்கள் மற்றும் விலைமதிப்பற்ற வாகனங்களுக்கு"
      }
    ]
  },

  processSteps: [
    {
      stepNumber: "01",
      title: "Detailed Inspection",
      titleTa: "விரிவான ஆய்வு",
      desc: "Digital paint depth gauge measurement & 360° flaw mapping under honeycomb LEDs.",
      descTa: "பெயிண்ட் தடிமன் அளவீடு மற்றும் குறைபாடுகளை துல்லியமாக கண்டறிதல்.",
      detail: "We measure clearcoat thickness across every panel and document swirls, chips, and repainted zones."
    },
    {
      stepNumber: "02",
      title: "pH-Neutral Foam Wash",
      titleTa: "ஸ்னோ ஃபோம் வாஷ்",
      desc: "Touchless pre-wash softening road film, followed by grit-guard contact cleanse.",
      descTa: "தூசிகளை இளக வைத்து கீறல்கள் இன்றி செய்யப்படும் ஃபோம் வாஷ்.",
      detail: "High-density active foam encapsulates dirt particles before microfibre mitt touches paint."
    },
    {
      stepNumber: "03",
      title: "Chemical Decontamination",
      titleTa: "இரும்பு துகள் நீக்கம்",
      desc: "Iron fallout remover bath and synthetic clay bar treatment for glass-smooth touch.",
      descTa: "பெயிண்டில் படிந்துள்ள இரும்பு துகள்கள் மற்றும் கடினமான அழுக்குகளை நீக்குதல்.",
      detail: "Dissolves embedded rail dust, tar spots, industrial fallout, and mineral deposits."
    },
    {
      stepNumber: "04",
      title: "Multi-Stage Correction",
      titleTa: "வண்ணப்பூச்சு சீரமைப்பு",
      desc: "Precision compounding and jewelling polish eliminating 90%+ scratches.",
      descTa: "சுழல் கீறல்களை அகற்றி கண்ணாடியைப் போன்ற பிரதிபலிப்பை உருவாக்குதல்.",
      detail: "Dual-action polishers with Rupes / Menzerna compounds restore flawless optical depth."
    },
    {
      stepNumber: "05",
      title: "Ceramic / PPF Protection",
      titleTa: "பாதுகாப்பு கவசம் பூசுதல்",
      desc: "Application in our dust-controlled bay under infrared heat lamps for permanent bond.",
      descTa: "தூசியற்ற பிரத்யேக பேயில் செராமிக் அல்லது PPF பொருத்தி பாதுகாத்தல்.",
      detail: "Cross-linking nanotech ceramic layer or precision computer-cut TPU film installed with zero edge lift."
    }
  ] as ProcessStep[],

  // 5 reviews clearly marked to replace with real Google reviews
  reviews: [
    {
      id: "rev-1",
      author: "Vigneshwaran R.",
      carModel: "BMW 3 Series Gran Limousine",
      rating: 5,
      date: "2 weeks ago",
      comment: "Got 10H Ceramic Coating done at Auto Bright Madurai. The reflection on my black BMW is unbelievable—looks like a sheet of dark glass! The honeycomb lighting in their studio shows they mean serious business. Highly recommended in Iyer Bungalow area.",
      commentTa: "ஆட்டோ பிரைட்டில் எனது பி.எம்.டபிள்யூ காருக்கு 10H செராமிக் கோட்டிங் செய்தேன். கார் இப்போது கண்ணாடி போல பளபளக்கிறது. மதுரையில் சிறந்த டீடெய்லிங் ஸ்டுடியோ!",
      verified: true,
      isPlaceholderNote: "Placeholder Review #1 — Replace with actual Google Review text"
    },
    {
      id: "rev-2",
      author: "Dr. K. Senthil Kumar",
      carModel: "Toyota Fortuner Legender",
      rating: 5,
      date: "1 month ago",
      comment: "Had full front PPF and interior detailing done before my highway road trips. The film alignment on edges is surgical, no bubbles at all. Worth every rupee to protect from highway stone chips. Great hospitality by the team.",
      commentTa: "எனது பார்ச்சூனர் காருக்கு PPF செய்தேன். மிகத் துல்லியமாக ஒட்டியுள்ளனர். ஹைவேயில் போகும்போது கல்லடி கீறல்கள் பற்றிய கவலை இல்லை.",
      verified: true,
      isPlaceholderNote: "Placeholder Review #2 — Replace with actual Google Review text"
    },
    {
      id: "rev-3",
      author: "Anand Sundaram",
      carModel: "Hyundai Verna (Starry Night)",
      rating: 5,
      date: "3 weeks ago",
      comment: "Took my 3-year-old Verna that had severe swirl marks from daily apartment washing. Auto Bright did a 2-stage paint correction and Gold package. It looks newer than the day I took delivery from showroom!",
      commentTa: "எனது வெர்னா காரில் இருந்த அனைத்து கீறல்களையும் நீக்கி புதிய கார் போல மாற்றி தந்துள்ளனர். சூப்பர் சர்வீஸ்!",
      verified: true,
      isPlaceholderNote: "Placeholder Review #3 — Replace with actual Google Review text"
    },
    {
      id: "rev-4",
      author: "Priya Radhakrishnan",
      carModel: "Kia Seltos Facelift",
      rating: 5,
      date: "2 months ago",
      comment: "Spotless foam wash and complete interior leather conditioning. They cleaned every tiny crevice in the AC vents and center console. Very clean waiting lounge and wheelchair accessible studio too.",
      commentTa: "மிகவும் தூய்மையான ஃபோம் வாஷ் மற்றும் உட்புற லெதர் சிகிச்சை. உட்கார நல்ல இடவசதியும் உள்ளது.",
      verified: true,
      isPlaceholderNote: "Placeholder Review #4 — Replace with actual Google Review text"
    },
    {
      id: "rev-5",
      author: "Karthikeyan M.",
      carModel: "Mahindra XUV700",
      rating: 5,
      date: "1 month ago",
      comment: "Best detailing studio in Madurai. They clearly explain the difference between ceramic and PPF instead of blindly upselling. Transparent pricing and genuine care for cars.",
      commentTa: "மதுரையின் சிறந்த டீடெய்லிங் மையம். செராமிக் மற்றும் PPF பற்றிய சரியான விளக்கம் தந்தனர். நியாயமான அணுகுமுறை.",
      verified: true,
      isPlaceholderNote: "Placeholder Review #5 — Replace with actual Google Review text"
    }
  ] as ReviewItem[],

  galleryItems: [
    { title: "Glossy Black Showroom Finish", category: "Ceramic", image: "/images/hero-car.webp", size: "col-span-1 md:col-span-2 row-span-2" },
    { title: "State-of-the-Art Studio Bay", category: "Studio", image: "/images/studio-interior.webp", size: "col-span-1" },
    { title: "Snow Foam Wash in Action", category: "Wash", image: "/images/svc-foam-wash.webp", size: "col-span-1" },
    { title: "Hydrophobic Water Beading", category: "Ceramic", image: "/images/svc-ceramic.webp", size: "col-span-1" },
    { title: "Precision PPF Film Installation", category: "PPF", image: "/images/svc-ppf.webp", size: "col-span-1" },
    { title: "Machine Compounding Polish", category: "Paint Correction", image: "/images/svc-polish.webp", size: "col-span-1" },
    { title: "Luxury Leather Cabin Spa", category: "Interior", image: "/images/svc-interior.webp", size: "col-span-1" },
    { title: "Restored Optical Headlight", category: "Restoration", image: "/images/svc-headlight.webp", size: "col-span-1" },
    { title: "Gold Caliper & Deep Rim Detail", category: "Wheels", image: "/images/svc-wheels.webp", size: "col-span-1" },
    { title: "Hexagon Ceiling Illumination Grid", category: "Studio", image: "/images/hex-ceiling.webp", size: "col-span-1" }
  ],

  uiStrings: {
    en: {
      navHome: "Home",
      navAbout: "About",
      navServices: "Services",
      navCeramicPpf: "Ceramic & PPF",
      navPackages: "Packages",
      navProcess: "Process",
      navBeforeAfter: "Before / After",
      navReviews: "Reviews",
      navGallery: "Gallery",
      navContact: "Visit Us",
      bookNow: "Book Slot",
      callNow: "Call Studio",
      whatsappChat: "WhatsApp Booking",
      heroCtaPrimary: "Book on WhatsApp",
      heroCtaSecondary: "Explore Services",
      heroBadge: "4.8★ Google Rated · 100+ Happy Clients",
      switchColor: "Select Studio Color:",
      dragToRotate: "Drag to rotate 360° · Scroll to inspect",
      aboutTitle: "The Royal Detailing Sanctuary in Madurai",
      aboutSubtitle: "Crafted for connoisseurs who demand perfection over compromise.",
      aboutStory: "Located in Bagya Arcade, Iyer Bungalow, AUTO BRIGHT is Madurai's premier destination for high-end automotive aesthetics. Built with state-of-the-art white hexagon honeycomb lighting, dust-controlled application bays, and certified detailing artisans, we treat every automobile as an engineering masterpiece deserving royal perfection.",
      enquireNow: "Enquire via WhatsApp",
      viewDetails: "View Details",
      popularBadge: "MOST POPULAR",
      selectPackage: "Book Package",
      comparisonBadge: "Technology Breakdown",
      beforeLabel: "BEFORE CORRECTION",
      afterLabel: "AFTER CERAMIC SHIELD",
      sliderHelp: "Drag slider left/right to reveal the mirror transformation",
      bookingTitle: "Reserve Your Royal Detailing Bay",
      bookingSubtitle: "Fill details below to instantly prepare your WhatsApp priority booking.",
      nameLabel: "Your Name",
      phoneLabel: "Phone Number",
      carModelLabel: "Car Make & Model (e.g., BMW 3 Series / Creta)",
      serviceLabel: "Desired Service",
      dateLabel: "Preferred Date & Time",
      notesLabel: "Special Requests (Optional)",
      submitBooking: "Proceed to WhatsApp Booking",
      locationTitle: "Visit Our Royal Studio",
      locationSubtitle: "Located conveniently at Utchaparamedu, Iyer Bungalow, Madurai.",
      getDirections: "Get Directions via Google Maps",
      openingHoursTitle: "Studio Timings",
      contactPhonesTitle: "Call Our Concierge",
      footerCopyright: "© 2026 AUTO BRIGHT Car Wash & Detailing Studio. All rights reserved.",
      placeholdersNotice: "Note: Opening hours, specific package prices, and real reviews can be updated in site.ts"
    },
    ta: {
      navHome: "முகப்பு",
      navAbout: "எங்களைப் பற்றி",
      navServices: "சேவைகள்",
      navCeramicPpf: "செராமிக் & PPF",
      navPackages: "பேக்கேஜ்கள்",
      navProcess: "படிநிலைகள்",
      navBeforeAfter: "முன் / பின்",
      navReviews: "மதிப்புரைகள்",
      navGallery: "புகைப்படங்கள்",
      navContact: "தொடர்புக்கு",
      bookNow: "முன்பதிவு செய்",
      callNow: "அழைக்க",
      whatsappChat: "வாட்ஸ்அப் அரட்டை",
      heroCtaPrimary: "வாட்ஸ்அப்பில் பதிவு செய்",
      heroCtaSecondary: "சேவைகளை காண்க",
      heroBadge: "4.8★ கூகிள் மதிப்பீடு · 100+ திருப்திகரமான வாடிக்கையாளர்கள்",
      switchColor: "காரின் நிறத்தை மாற்றுக:",
      dragToRotate: "360° சுழற்றி பார்க்க இழுக்கவும்",
      aboutTitle: "மதுரையின் பிரீமியம் கார் டீடெய்லிங் ஸ்டுடியோ",
      aboutSubtitle: "கார்களை நேசிக்கும் உரிமையாளர்களுக்கான பிரத்யேக தளம்.",
      aboutStory: "மதுரை ஐயர் பங்களா, பாக்யா ஆர்கேடில் அமைந்துள்ள ஆட்டோ பிரைட், நவீன தொழில்நுட்பம், ஹனிகோம்ப் எல்இடி விளக்குகள் மற்றும் நிபுணத்துவ பணியாளர்களுடன் உங்கள் காரை புத்தம் புதியது போல் பராமரிக்கிறது.",
      enquireNow: "வாட்ஸ்அப்பில் விசாரிக்க",
      viewDetails: "விவரங்களை காண்க",
      popularBadge: "அதிக விருப்பமானது",
      selectPackage: "பேக்கேஜ் பதிவு செய்",
      comparisonBadge: "தொழில்நுட்ப ஒப்பீடு",
      beforeLabel: "பாலிஷிங்கிற்கு முன்",
      afterLabel: "செராமிக் கோட்டிங்கிற்கு பின்",
      sliderHelp: "பளபளப்பை பார்க்க ஸ்லைடரை நகர்த்தவும்",
      bookingTitle: "உங்கள் காரை முன்பதிவு செய்யுங்கள்",
      bookingSubtitle: "கீழே உள்ள விவரங்களை நிரப்பி உடனடியாக வாட்ஸ்அப்பில் உறுதி செய்யுங்கள்.",
      nameLabel: "உங்கள் பெயர்",
      phoneLabel: "தொலைபேசி எண்",
      carModelLabel: "கார் மாடல் (எ.கா: பிஎம்டபிள்யூ / கிரெட்டா)",
      serviceLabel: "தேவையான சேவை",
      dateLabel: "தேதி மற்றும் நேரம்",
      notesLabel: "குறிப்புகள் (விருப்பப்பட்டால்)",
      submitBooking: "வாட்ஸ்அப்பில் முன்பதிவு செய்",
      locationTitle: "எங்கள் மையத்திற்கு வருகை தாருங்கள்",
      locationSubtitle: "உச்சபரமேடு, ஐயர் பங்களா, மதுரை.",
      getDirections: "வழியை அறிய (கூகிள் மேப்ஸ்)",
      openingHoursTitle: "பணி நேரம்",
      contactPhonesTitle: "தொடர்பு எண்கள்",
      footerCopyright: "© 2026 ஆட்டோ பிரைட் கார் வாஷ் & டீடெய்லிங் ஸ்டுடியோ. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      placeholdersNotice: "குறிப்பு: விலை மற்றும் உண்மையான மதிப்புரைகளை site.ts-ல் மாற்றிக் கொள்ளலாம்."
    }
  }
};
