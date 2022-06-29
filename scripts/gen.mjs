import fs from 'fs';
import path from 'path';
import JSZip from 'node-zip';

const projectPath = path.resolve('./');

// TODO: load settings
const widgets = ['layers'];
const pluginId = 'reearth-plugin-api-demo';
const version = '0.0.1';

const zip = new JSZip();

try {
  // widgets
  widgets.forEach((widget)=>{

    // load iframe page
    const css = fs.readFileSync(`${projectPath}/src/common/style.css`, 'utf8');
    const js = fs.readFileSync(`${projectPath}/src/${widget}/index.js`, 'utf8');
    const body = fs.readFileSync(`${projectPath}/src/${widget}/index.html`, 'utf8').split('<body>')[1].split('</body>')[0];
    const combined = `<style>
    ${css}
    </style>
    ${body}
    <script>
    ${js}
    </script>`;

    // load widght
    const wjs = fs.readFileSync(`${projectPath}/src/${widget}/${widget}.js`, 'utf8');

    // output widget
    const w = wjs.replace('[HTML]', combined)
    fs.writeFileSync(`${projectPath}/dist/${widget}.js`, w);
    zip.file(`${widget}.js`, w);
  })
  
  // load yml
  const yml = fs.readFileSync(`${projectPath}/src/plugin/reearth.yml`, 'utf8');
  // output yml
  fs.writeFileSync(`${projectPath}/dist/reearth.yml`, yml);
  zip.file('reearth.yml', yml);

  // zip 
  const data = zip.generate({
    base64: false,
    compression: 'DEFLATE'
  });
  fs.writeFileSync(`${projectPath}/packages/${pluginId}-${version}.zip`, data, 'binary');
} catch (err) {
  console.error(err)
}