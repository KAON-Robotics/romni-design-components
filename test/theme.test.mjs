import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RomniThemeProvider, InputPassword, romniDarkTokens } from "../dist/index.js";

test("theme tokens are document-wide and light rendering removes dark values", () => {
  const render = mode => renderToStaticMarkup(React.createElement(RomniThemeProvider, { mode }, React.createElement(InputPassword, { value: "", onChange() {} })));
  assert.match(render("dark"), /:root\{--romni-page:#121212/);
  assert.match(render("dark"), /color-scheme:dark/);
  assert.doesNotMatch(render("light"), /--romni-page:#121212/);
  assert.match(render("light"), /color-scheme:light/);
});

test("dark text and control contrast", () => {
  for (const role of ["page", "surface", "surface-subtle", "surface-raised", "text", "text-muted", "text-subtle", "icon", "border", "control-border"]) {
    assert.equal(new Set(romniDarkTokens[`--romni-${role}`].slice(1).match(/../g)).size, 1, `${role} is neutral`);
  }
  const luminance = hex => hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4).reduce((sum, x, i) => sum + x * [.2126, .7152, .0722][i], 0);
  const contrast = (a, b) => { const x = luminance(romniDarkTokens[`--romni-${a}`]), y = luminance(romniDarkTokens[`--romni-${b}`]); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  for (const bg of ["page", "surface", "surface-subtle", "surface-raised"]) {
    for (const text of ["text", "text-muted", "text-subtle", "icon"]) assert.ok(contrast(text, bg) >= 4.5, `${text}/${bg}`);
    assert.ok(contrast("control-border", bg) >= 3, `control/${bg}`);
  }
});
