export const site = {
  name: 'Bind Builds',
  url: 'https://www.bindbuilds.com',
  phone: '+91 80727 01454',
  telephone: '+918072701454',
  whatsapp: '918072701454',
  email: 'bindbuilds@gmail.com',
  address: {
    streetAddress: 'No. B/28, 2nd Cross Street, Kurinji Nagar, Ramapuram',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600089',
    addressCountry: 'IN',
  },
  maps: 'https://www.google.com/maps/search/?api=1&query=No.%20B%2F28%2C%202nd%20Cross%20Street%2C%20Ramapuram%2C%20Chennai%20600089',
  googleReview: 'https://g.page/r/CSwfjwSfCckhEBI/review',
  instagram: 'https://www.instagram.com/bindbuilds/',
  portfolio: 'https://www.bindarchitects.com/',
  studio: 'https://www.bindarchitects.com/studio',
};
// Public Bind Builds contact details used across the website.
export function whatsappUrl(message = 'Hello Bind Builds, I am planning a construction project in Chennai. I would like to discuss my site, requirements and budget.') {
  return 'https://wa.me/' + site.whatsapp + '?text=' + encodeURIComponent(message);
}
export const packages = [
  { key: 'essential', name: 'Essential', rate: 2399, description: 'Thoughtful essentials. A clear starting point.' },
  { key: 'elevate', name: 'Elevate', rate: 2649, description: 'More material choice. More refined details.' },
  { key: 'signature', name: 'Signature', rate: 3199, description: 'A higher specification for a personal home.' },
] as const;
