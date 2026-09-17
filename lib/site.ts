export const site = {
  name: 'Bind Builds',
  url: 'https://bind-builds-website.vercel.app',
  phone: '+91 80727 01454',
  telephone: '+918072701454',
  whatsapp: '918072701454',
  email: 'bindarchitects@gmail.com',
  studio: 'https://www.bindarchitects.com/studio',
};
// Public business contact published at https://www.bindarchitects.com/studio.
export function whatsappUrl(message = 'Hello Bind Builds, I am planning a construction project in Chennai. I would like to discuss my site, requirements and budget.') {
  return 'https://wa.me/' + site.whatsapp + '?text=' + encodeURIComponent(message);
}
export const packages = [
  { key: 'essential', name: 'Essential', rate: 2399, description: 'Thoughtful essentials. A clear starting point.' },
  { key: 'elevate', name: 'Elevate', rate: 2649, description: 'More material choice. More refined details.' },
  { key: 'signature', name: 'Signature', rate: 3199, description: 'A higher specification for a personal home.' },
] as const;
