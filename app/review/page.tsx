import { permanentRedirect } from 'next/navigation';
import { site } from '@/lib/site';

export const metadata={robots:{index:false,follow:false}};

export default function ReviewRedirect(){
  permanentRedirect(site.googleReview);
}
