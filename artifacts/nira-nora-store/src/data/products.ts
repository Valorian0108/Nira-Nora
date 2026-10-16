import campaignImage from '../assets/campaign.jpg';
import trousersImage from '@assets/generated_images/nira-nora-trousers.jpg';
import jacketImage from '@assets/generated_images/nira-nora-jacket.jpg';
import knitImage from '@assets/generated_images/nira-nora-knit.jpg';
import dressImage from '@assets/generated_images/nira-nora-dress.jpg';
import carryallImage from '@assets/generated_images/nira-nora-carryall.jpg';

export type Fulfilment = 'Ready to order' | 'Sourced on request' | 'Special request';
export type Product = {
  id: string; name: string; category: string; description: string; price?: number;
  fulfilment: Fulfilment; sizes: string[]; colour: string; image: string; imageTone: string; note: string;
};

// Demonstration catalogue only. Availability and fulfilment are deliberately explicit.
export const products: Product[] = [
  { id:'field-shirt', name:'The Field Shirt', category:'Shirts', description:'A relaxed cotton poplin shirt with a generous sleeve and a clean, easy line. A considered layer for weekday-to-weekend dressing.', price:38500, fulfilment:'Ready to order', sizes:['S','M','L','XL'], colour:'Chalk', image:campaignImage, imageTone:'sand', note:'Demo product · Demo price' },
  { id:'column-trouser', name:'Column Trouser', category:'Trousers', description:'A high-rise, straight-leg trouser with a little room through the hip. Designed to sit neatly with a tucked shirt or soft knit.', price:52000, fulfilment:'Sourced on request', sizes:['S','M','L'], colour:'Ink', image:trousersImage, imageTone:'clay', note:'Demo product · Demo price' },
  { id:'soft-structure-jacket', name:'Soft Structure Jacket', category:'Outerwear', description:'An unlined, easy-shouldered jacket with a quiet sculptural shape. Selected as a versatile top layer, subject to supplier availability.', fulfilment:'Special request', sizes:['S','M','L','XL'], colour:'Oat', image:jacketImage, imageTone:'olive', note:'Demo product · No price supplied' },
  { id:'weekend-knit', name:'Weekend Knit', category:'Knitwear', description:'A gently oversized knit with an open, relaxed texture and a softly dropped shoulder. A sourcing reference, not a live stock promise.', price:46800, fulfilment:'Sourced on request', sizes:['S','M','L'], colour:'Persimmon', image:knitImage, imageTone:'rust', note:'Demo product · Demo price' },
  { id:'everyday-dress', name:'Everyday Dress', category:'Dresses', description:'A fluid midi silhouette with an uncomplicated shape and room to move. Availability and final details are confirmed only after an enquiry.', price:61000, fulfilment:'Ready to order', sizes:['S','M','L','XL'], colour:'Deep blue', image:dressImage, imageTone:'blue', note:'Demo product · Demo price' },
  { id:'weekender-tote', name:'Soft Carryall', category:'Accessories', description:'A roomy everyday carryall chosen for its understated shape. Ask us to look for a similar piece if this reference is unavailable.', fulfilment:'Special request', sizes:['One size'], colour:'Natural', image:carryallImage, imageTone:'ochre', note:'Demo product · No price supplied' },
];
export const formatNgn = (price: number) => `₦${price.toLocaleString('en-NG')}`;
export const categories = ['All pieces', ...Array.from(new Set(products.map(p => p.category)))];
