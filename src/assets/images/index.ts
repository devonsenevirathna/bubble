import heroImage from './hero_car_detailing_1793612426368.jpg';
import interiorImage from './interior_detailing_1793612446179.jpg';
import exteriorWashImage from './exterior_wash_1793613905781.jpg';
import wheelDetailingImage from './wheel_detailing_1793613919650.jpg';
import paintSealantImage from './paint_sealant_buffing_1794822146488.jpg';
import mobileSuvImage from './mobile_suv_adelaide_1794822146944.jpg';

export const ASSET_IMAGES = {
  hero: heroImage,
  interior: interiorImage,
  exteriorWash: exteriorWashImage,
  wheelDetailing: wheelDetailingImage,
  paintSealant: paintSealantImage,
  mobileSuv: mobileSuvImage,
};

export type AssetImageKey = keyof typeof ASSET_IMAGES;
