import AdmZip from 'adm-zip';
import fs from 'node:fs';
import path from 'node:path';
const archive=path.join(process.cwd(),'../../3-Safarnama-current-38.zip');
const z=new AdmZip(archive);
fs.mkdirSync('private-assets',{recursive:true});
for(const e of z.getEntries()){
 const prefix='safarnama-current/public/';
 if(e.entryName.startsWith(prefix)&&!e.isDirectory){
  const rel=e.entryName.slice(prefix.length);if(rel.includes('..'))throw Error('bad entry');
  const out=path.join('private-assets',rel);fs.mkdirSync(path.dirname(out),{recursive:true});
  let data=e.getData();
  if(rel==='app.js'){
   let s=data.toString();s=s.replace("https://safarnama-backend-3a61.onrender.com/auth/callback","https://safarnama-mauve-zeta.vercel.app/auth/callback");
   s=s.replaceAll('https://safarnama-backend-3a61.onrender.com','https://safarnama-mauve-zeta.vercel.app');
   s=s.replaceAll("location.hostname === 'safarnama-backend-3a61.onrender.com'","location.hostname === 'safarnama-mauve-zeta.vercel.app'");
   s=s.replace("headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({ image: base64","headers: { 'Content-Type': 'application/json', 'Authorization': authSession && authSession.token ? 'Bearer ' + authSession.token : '' },\n          body: JSON.stringify({ image: base64");
   s=s.replace("if (data && data.error === 'rate_limited')","if (data && data.error === 'login_required') photoSay('Log in with Google or your account to use photo discovery.'); else if (data && data.error === 'rate_limited')");
   s=s.replace("photoInput.addEventListener('change', function () {","photoInput.addEventListener('change', function () { if (!authSession || !authSession.token) { photoSay('Log in with Google or your account to use photo discovery.'); photoInput.value=''; return; }");
   data=Buffer.from(s);
  }fs.writeFileSync(out,data);
 }
}
console.log('Current 38-destination private assets prepared');

const ds=JSON.parse(z.readAsText('safarnama-current/data/destinations.json'));
const out=Object.fromEntries(['destinations','destination_getting','destination_places','dishes','eateries','stays','shops'].map(k=>[k,[]]));
for(const d of ds){const r={};for(const k of ['id','name','state','region','vibes','blurb','photo','alt','best','months','ideal'])r[k]=d[k];r.photo_credit=d.credit;for(const k of ['name','when','note'])r['festival_'+k]=(d.festival||{})[k];out.destinations.push(r);
for(const [key,field] of [['getting','destination_getting'],['places','destination_places'],['food','dishes'],['eats','eateries'],['stays','stays'],['shops','shops']])for(const [i,x] of (d[key]||[]).entries()){const v=typeof x==='string'?{name:x}:Object.fromEntries(Object.entries(x).map(([k,v])=>[k==='n'?'name':k==='r'?'rating':k==='ta'?'tripadvisor':k,v]));out[field].push({...v,destination_id:d.id,position:i});}}
fs.writeFileSync('private-assets/content.json',JSON.stringify(out));
