import type {NextConfig} from 'next';

const securityHeaders=[
 {key:'X-Content-Type-Options',value:'nosniff'},
 {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
 {key:'X-Frame-Options',value:'SAMEORIGIN'},
 {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
 {key:'X-DNS-Prefetch-Control',value:'on'},
];

const legacyHosts=['bindconstructions.com','www.bindconstructions.com'];
const legacyRedirects=[
 {source:'/',destination:'https://www.bindbuilds.com/'},
 {source:'/about',destination:'https://www.bindbuilds.com/about'},
 {source:'/packages',destination:'https://www.bindbuilds.com/packages'},
 {source:'/contact',destination:'https://www.bindbuilds.com/contact'},
 {source:'/portfolio',destination:'https://www.bindbuilds.com/project-evidence'},
 {source:'/projects',destination:'https://www.bindbuilds.com/project-evidence'},
 {source:'/design-packages',destination:'https://www.bindarchitects.com/'},
];

const nextConfig:NextConfig={
 poweredByHeader:false,
 async headers(){
  return [{source:'/:path*',headers:securityHeaders}];
 },
 async redirects(){
  return legacyHosts.flatMap(host=>legacyRedirects.map(rule=>({
   ...rule,
   permanent:true,
   has:[{type:'host' as const,value:host}],
  })));
 },
};

export default nextConfig;
