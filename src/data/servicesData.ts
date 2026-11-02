import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'exterior-detailing',
    name: 'Exterior Car Detailing',
    category: 'exterior',
    tagline: 'Paint decontamination, high-gloss shine, and environmental protection.',
    shortDescription:
      'A multi-stage exterior wash, decontamination, and sealant application designed to remove road grime, shield against Adelaide sun, and restore deep gloss.',
    fullDescription:
      'Our Exterior Car Detailing is engineered to treat your vehicle’s clear coat safely without causing fine swirl marks. Adelaide’s harsh summer UV rays, dust storms, and coastal sea breezes take a heavy toll on automotive finishes. We begin with a pH-balanced snow foam pre-wash to lift abrasive dirt, followed by a two-bucket contact wash, iron fallout decontamination, wheel face and barrel scrubbing, streak-free exterior glass cleaning, and a high-grade hydrophobic sealant layer that repels water and road contamination for up to 3 months.',
    benefits: [
      'Eliminates gritty road film, bug splatter, and brake dust buildup',
      'Shields vehicle clear coat from severe Adelaide UV radiation and oxidation',
      'Enhances paint depth, gloss, and hydrophobic water-beading performance',
      'Protects exterior plastics, rubber trims, and alloy wheels from premature fading',
    ],
    inclusions: [
      'Citrus pre-wash & high-density pH-neutral snow foam bath',
      'Two-bucket scratch-minimisation contact wash using plush microfibre mitts',
      'Deep alloy wheel face, inner barrel, and brake caliper face wash',
      'Wheel arches degreased and pressure-rinsed',
      'Iron chemical decontamination to dissolve embedded brake fallout',
      'Plush microfibre warm-air drying to prevent water spots',
      'Hydrophobic paint sealant application (up to 3 months durability)',
      'Satin non-sling tyre conditioning dressing applied',
      'Exterior glass and side mirrors cleaned to streak-free clarity',
    ],
    estimatedDuration: '1.5 – 2.5 hours',
    idealFor: 'Vehicles with dull paintwork, road film, or light oxidation needing exterior protection.',
  },
  {
    id: 'interior-detailing',
    name: 'Interior Car Detailing',
    category: 'interior',
    tagline: 'Deep sanitisation, allergen removal, and cabin rejuvenation.',
    shortDescription:
      'Thorough cabin sanitisation, deep upholstery extraction, leather conditioning, and UV-matte trim protection for a fresh, hygienic driving space.',
    fullDescription:
      'The average vehicle cabin accumulates dust, spills, food crumbs, and airborne allergens. Our Interior Car Detailing goes far beyond a surface wipe. We utilize commercial-grade high-filtration vacuuming, targeted fabric extraction for stained upholstery, gentle pH-neutral steam treatment for sensitive switchgear and air vents, and dedicated leather cleaners that condition without leaving greasy residue. All dashboard and console plastics receive a non-reflective matte UV protectant formulated to resist Australian dashboard cracking.',
    benefits: [
      'Removes trapped allergens, embedded dirt, and stubborn cabin odours',
      'Restores factory-matte, non-greasy appearance to trims and consoles',
      'Conditions leather and upholstery to prevent dryness and premature wear',
      'Creates a clean, hygienic interior environment for daily commutes and family trips',
    ],
    inclusions: [
      'Comprehensive high-filtration vacuum of seats, carpets, footwells, and boot',
      'Fabric upholstery spot-treatment and hot-water extraction / shampooing',
      'Deep cleaning and pH-balanced nourishment conditioning for leather surfaces',
      'Hygienic steam treatment on dashboard, centre console, and air vents',
      'Door cards, grab handles, and high-touch buttons thoroughly sanitised',
      'Foot pedals degreased and cleaned for safe grip',
      'Non-greasy, OEM-matte UV protectant applied to dashboard and plastic trims',
      'Interior glass, rearview mirror, and instrument cluster wiped streak-free',
      'Complimentary subtle air-freshening neutraliser treatment',
    ],
    estimatedDuration: '2.0 – 3.0 hours',
    idealFor: 'Daily commuter cars, family vehicles with spills or pet dust, or vehicles preparing for sale.',
  },
  {
    id: 'full-detailing',
    name: 'Full Car Detailing',
    category: 'full',
    popular: true,
    tagline: 'The complete inside-and-out transformation delivered to your location.',
    shortDescription:
      'Our signature comprehensive package combining full exterior decontamination and protection with thorough deep interior sanitisation.',
    fullDescription:
      'The Full Car Detailing package brings together our complete exterior decontamination system and our deep interior hygiene process for an all-encompassing vehicle refresh. Ideal for pre-sale preparation, post-trip rejuvenation, or regular seasonal care, this package leaves no area untouched—from engine bay cosmetic wipe-down and door jamb pressure rinsing to full upholstery extraction and durable exterior paint sealing.',
    benefits: [
      'Maximises vehicle resale value and showroom presentation',
      'All-in-one convenience completed at your home or workplace in one appointment',
      'Restores both aesthetic beauty and hygienic comfort across the entire vehicle',
      'Complete peace of mind with end-to-end professional attention to detail',
    ],
    inclusions: [
      'Everything included in the Exterior Detailing package',
      'Everything included in the Interior Detailing package',
      'Door and boot jambs degreased, pressure-cleaned, and sealed',
      'Engine bay cosmetic wipe-down and plastic trim nourishment',
      'Exhaust tip polishing and metal brightening',
      'Comprehensive paint and glass inspection report upon completion',
    ],
    estimatedDuration: '3.5 – 5.0 hours',
    idealFor: 'Car enthusiasts, pre-sale preparations, lease returns, or complete vehicle revitalisation.',
  },
  {
    id: 'addons-package',
    name: 'Premium Detailing Add-ons',
    category: 'addons',
    tagline: 'Targeted specialist treatments for specific automotive care needs.',
    shortDescription:
      'Custom add-on services that can be paired with any detailing package to address specific concerns like pet hair, light swirl marks, or foggy headlights.',
    fullDescription:
      'Every vehicle has distinct requirements based on how it is used. Whether your family dog leaves stubborn hair after trips to Henley Beach, or your headlights have developed a hazy yellow film from sun exposure, our modular add-on treatments allow you to customise your detailing booking to suit your vehicle’s exact condition.',
    benefits: [
      'Targeted treatments tailored to your vehicle’s specific condition',
      'Cost-effective solutions that solve specific cosmetic or visibility issues',
      'Can be bundled seamlessly with any exterior or interior service',
    ],
    inclusions: [
      'Single-Stage Machine Paint Enhancement: Gently minimises light swirl marks and increases paint gloss',
      'Heavy Pet Hair & Sand Extraction: Dedicated mechanical brushing and high-draw vacuuming for stubborn pet fur and beach sand',
      'Headlight Clarity Polish & UV Sealant: Removes oxidation and haze from polycarbonate lenses to improve night illumination',
      'Windscreen Hydrophobic Rain Repellent: Glass coating that sheets water at highway speeds for safer rainy commutes',
      'Leather Deep Nourishment & Barrier Guard: Advanced cream barrier to guard premium leather against dye transfer and premature creasing',
    ],
    estimatedDuration: '30 mins – 2.0 hours (varies by selection)',
    idealFor: 'Vehicles with specific pet fur, hazing headlights, or paint swirl imperfections.',
  },
];

export const VEHICLE_TYPES = [
  {
    id: 'sedan-hatch',
    label: 'Sedan / Hatchback',
    description: 'Compact & mid-size passenger cars (e.g., Corolla, Golf, Mazda 3, Camry)',
  },
  {
    id: 'suv-wagon',
    label: 'Compact & Mid-Size SUV / Wagon',
    description: 'Family SUVs and station wagons (e.g., RAV4, CX-5, Outback, X3)',
  },
  {
    id: '4wd-ute-van',
    label: 'Large 4WD / Dual-Cab Ute / Van',
    description: '7-seaters, dual-cabs, and light commercial vans (e.g., Ranger, Prado, HiLux, Carnival)',
  },
  {
    id: 'luxury-sports',
    label: 'Luxury / Performance / Sports Car',
    description: 'High-end prestige vehicles requiring delicate care and specialised products',
  },
];

export const ADELAIDE_REGIONS = [
  'Adelaide CBD & North Adelaide',
  'Eastern Suburbs (Norwood, Burnside, Campbelltown)',
  'Western Suburbs (Henley, Glenelg, West Lakes)',
  'Southern Suburbs (Marion, Mitcham, Hallett Cove)',
  'Northern Suburbs (Tea Tree Gully, Salisbury, Mawson Lakes)',
  'Adelaide Hills (Stirling, Mount Barker - by appointment)',
];
