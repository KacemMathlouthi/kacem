// Generates public/__og.html, a 1200x630 card rendered to public/og.png by
// Playwright, then deleted. Run indirectly via the OG build steps.
import { readFileSync, writeFileSync } from "fs"

const font = readFileSync(
  "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"
).toString("base64")

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: "Geist";
    font-weight: 100 900;
    font-display: block;
    src: url(data:font/woff2;base64,${font}) format("woff2-variations");
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: "Geist", sans-serif;
    background: #000;
    color: #fafafa;
    position: relative;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Intersection-rail grid outline (matches the site) */
  .frame { position: absolute; inset: 54px; }
  .rail {
    position: absolute; top: 0; bottom: 0; width: 13px;
    background-image: repeating-linear-gradient(315deg,
      rgba(255,255,255,0.13) 0, rgba(255,255,255,0.13) 1px,
      transparent 1px, transparent 50%);
    background-size: 10px 10px;
    border-left: 1px solid rgba(255,255,255,0.10);
    border-right: 1px solid rgba(255,255,255,0.10);
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 38%, #000 62%, transparent);
  }
  .rail.left { left: 0; } .rail.right { right: 0; }
  .hline {
    position: absolute; left: 0; right: 0; height: 0;
    border-top: 1px dashed rgba(255,255,255,0.18);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 38%, #000 62%, transparent);
  }
  .hline.top { top: 0; } .hline.bottom { bottom: 0; }

  .content {
    position: absolute; inset: 54px;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 104px; gap: 34px;
  }
  .row { display: flex; align-items: center; gap: 44px; }
  .avatar {
    width: 152px; height: 152px; border-radius: 30px; flex-shrink: 0;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 20px 50px rgba(0,0,0,0.6);
  }
  .name {
    font-size: 68px; font-weight: 600; letter-spacing: -0.025em; line-height: 1;
  }
  .desc {
    font-size: 33px; line-height: 1.42; color: #a6a6a6; max-width: 900px;
    font-weight: 400;
  }
  .desc b { color: #fafafa; font-weight: 500; }
  .callab { color: #f472b6; font-weight: 500; white-space: nowrap; }
  .callab img {
    height: 0.92em; width: auto; vertical-align: -0.14em; margin-right: 0.28em;
  }
  .insat { color: #d16a6a; font-weight: 500; }
  .domain {
    position: absolute; left: 158px; bottom: 96px;
    font-size: 27px; color: #7d7d7d; letter-spacing: 0.01em;
    display: flex; align-items: center; gap: 12px;
  }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: #f472b6; }
</style>
</head>
<body>
  <div class="frame">
    <div class="hline top"></div>
    <div class="hline bottom"></div>
    <div class="rail left"></div>
    <div class="rail right"></div>
  </div>

  <div class="content">
    <div class="row">
      <img class="avatar" src="/avatar.jpg" />
      <div class="name">Kacem&nbsp;Mathlouthi</div>
    </div>
    <div class="desc">
      Building at
      <span class="callab"><img src="/logos/callab.png" />Callab&nbsp;AI (YC&nbsp;P26)</span>
      and a <b>software engineering student</b> at <span class="insat">INSAT</span>.
    </div>
  </div>
</body>
</html>`

writeFileSync("public/__og.html", html)
console.log("wrote public/__og.html")
