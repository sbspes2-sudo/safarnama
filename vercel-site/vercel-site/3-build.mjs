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
   data=Buffer.from(s);
  }fs.writeFileSync(out,data);
 }
}
console.log('Current 38-destination private assets prepared');
