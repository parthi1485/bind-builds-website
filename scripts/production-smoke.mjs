import assert from 'node:assert/strict';

const base=(process.env.BASE_URL||'https://www.bindbuilds.com').replace(/\/$/,'');
const expected=(process.env.EXPECTED_SHA||'').trim();
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function request(path, options={}) {
  const response=await fetch(base+path,{redirect:'follow',...options});
  return response;
}

async function waitForDeployment(){
  if(!expected) return;
  const attempts=36;
  for(let i=1;i<=attempts;i++){
    try{
      const response=await request('/api/health',{headers:{'cache-control':'no-cache'}});
      if(response.ok){
        const body=await response.json();
        if(body.commit===expected){
          console.log('✓ Current production deployment detected:',expected.slice(0,12));
          return;
        }
        console.log(`Waiting for production deploy (${i}/${attempts}) — live ${String(body.commit).slice(0,12)}, expected ${expected.slice(0,12)}`);
      }
    }catch(error){
      console.log(`Waiting for production deploy (${i}/${attempts}) — health check unavailable`);
    }
    await sleep(10000);
  }
  throw new Error('Production did not reach the expected commit within 6 minutes.');
}

await waitForDeployment();

const pages=[
  ['/',/Your home\.|Bind Builds/i],
  ['/about',/Designed with purpose|Bind Builds/i],
  ['/packages',/Packages|Essential|Elevate/i],
  ['/cost-calculator',/construction cost|calculator|estimate/i],
  ['/construction-cost-chennai',/construction cost in Chennai/i],
  ['/house-construction-chennai',/house construction in Chennai/i],
  ['/turnkey-house-construction-chennai',/turnkey house construction/i],
  ['/building-plan-approval-chennai',/building.*approval|approval.*Chennai/i],
  ['/service-areas-chennai',/service areas|construction across Chennai/i],
  ['/house-construction-west-chennai',/West Chennai|house construction/i],
  ['/house-construction-ramapuram-chennai',/Ramapuram|house construction/i],
  ['/house-construction-porur-chennai',/Porur|house construction/i],
  ['/house-construction-valasaravakkam-chennai',/Valasaravakkam|house construction/i],
  ['/house-construction-poonamallee-chennai',/Poonamallee|house construction/i],
  ['/house-construction-virugambakkam-vadapalani-saligramam',/Virugambakkam|Vadapalani|Saligramam/i],
  ['/house-construction-mangadu-kundrathur-chennai',/Mangadu|Kundrathur/i],
  ['/house-construction-maduravoyal-vanagaram-kattupakkam',/Maduravoyal|Vanagaram|Kattupakkam/i],
  ['/house-construction-gerugambakkam-kolapakkam-chennai',/Gerugambakkam|Kolapakkam/i],
  ['/house-construction-anna-nagar-chennai',/Anna Nagar|Padi|Koyambedu/i],
  ['/house-construction-omr-ecr-chennai',/OMR|ECR/i],
  ['/house-construction-coimbatore',/Coimbatore|house construction/i],
  ['/demolition-rebuild-house-chennai',/demolition|rebuild/i],
  ['/process',/process|construction/i],
  ['/faq',/questions|FAQ/i],
  ['/contact',/talk about your project|contact/i],
  ['/start-a-project',/conversation|project brief|planning/i],
  ['/privacy',/privacy|your details/i],
];

for(const [path,marker] of pages){
  const response=await request(path);
  assert.equal(response.status,200,`${path} returned ${response.status}`);
  const html=await response.text();
  assert.match(html,marker,`${path} is missing expected page content`);
  assert.doesNotMatch(html,/noindex/i,`${path} unexpectedly contains noindex`);
  console.log('✓',path);
}

const robots=await request('/robots.txt');
assert.equal(robots.status,200);
const robotsText=await robots.text();
assert.match(robotsText,/Allow:\s*\//i);
assert.match(robotsText,/https:\/\/www\.bindbuilds\.com\/sitemap\.xml/i);
console.log('✓ robots.txt');

const sitemap=await request('/sitemap.xml');
assert.equal(sitemap.status,200);
const sitemapText=await sitemap.text();
for(const [path] of pages) {
  const canonical=path==='/'?base:base+path;
  assert.ok(sitemapText.includes('<loc>'+canonical+'</loc>')||sitemapText.includes('<loc>'+canonical+'/</loc>'),`Sitemap missing ${path}`);
}
console.log('✓ sitemap.xml includes all',pages.length,'public pages');

const og=await request('/opengraph-image');
assert.equal(og.status,200);
assert.match(og.headers.get('content-type')||'',/^image\//i);
console.log('✓ Open Graph image');

const missing=await request('/this-page-should-not-exist');
assert.equal(missing.status,404,`Missing route returned ${missing.status}, expected 404`);
console.log('✓ 404 route');

const apiGet=await request('/api/website-lead');
assert.equal(apiGet.status,405,`Lead API GET returned ${apiGet.status}, expected 405`);
console.log('✓ Lead API rejects GET');

const home=await request('/');
for(const header of ['x-content-type-options','referrer-policy','x-frame-options','permissions-policy']){
  assert.ok(home.headers.get(header),`Missing security header: ${header}`);
}
console.log('✓ Production security headers');

console.log('\nProduction smoke test passed.');
