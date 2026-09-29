import { execFileSync } from 'node:child_process';

const base=(process.env.VERCEL_GIT_PREVIOUS_SHA||'').trim();
const head=(process.env.VERCEL_GIT_COMMIT_SHA||'HEAD').trim();

function forceBuild(reason){
  console.log('[vercel-ignore] Build required:',reason);
  process.exit(1);
}

if(!base || /^0+$/.test(base)) forceBuild('no previous Git SHA available');

let changed=[];
try{
  changed=execFileSync('git',['diff','--name-only',base,head],{encoding:'utf8'})
    .split(/\r?\n/)
    .map(file=>file.trim())
    .filter(Boolean);
}catch(error){
  forceBuild('unable to determine changed files safely');
}

const nonDeployOnly=file=>
  file.startsWith('tests/') ||
  file.startsWith('.github/') ||
  file==='scripts/production-smoke.mjs' ||
  file==='README.md';

const runtimeChanges=changed.filter(file=>!nonDeployOnly(file));

if(changed.length===0){
  console.log('[vercel-ignore] No changed files detected. Skipping deployment.');
  process.exit(0);
}

if(runtimeChanges.length===0){
  console.log('[vercel-ignore] Non-production-only commit. Skipping deployment:',changed.join(', '));
  process.exit(0);
}

console.log('[vercel-ignore] Production-affecting changes detected:',runtimeChanges.join(', '));
process.exit(1);
