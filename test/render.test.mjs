import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  InfoTable,
  InputButton,
  InputErrorMessage,
  InputPassword,
  ListTable,
  MainLayout,
  Pagination,
  RoleBadge,
  ToggleSwitch,
} from "../dist/index.js";

test("public components render", () => {
  const button = renderToStaticMarkup(React.createElement(InputButton, { label: "Save" }));
  const pagination = renderToStaticMarkup(React.createElement(Pagination, {
    page: 2,
    pageSize: 10,
    total: 25,
    onPageChange() {},
  }));
  const table = renderToStaticMarkup(React.createElement(ListTable, {
    data: [{ idx: 1, name: "ROMNI" }],
    columns: [{ key: "name", label: "Name" }],
  }));
  const additions = renderToStaticMarkup(React.createElement(MainLayout, null,
    React.createElement(InfoTable, null,
      React.createElement(InputPassword, { value: "secret" }),
      React.createElement(InputErrorMessage, { msg: "Required" }),
      React.createElement(ToggleSwitch, { checked: true, onChange() {} }),
      React.createElement(RoleBadge, { role: "manager" }),
    ),
  ));

  assert.match(button, />Save</);
  assert.match(pagination, /11 - 20 of 25/);
  assert.match(table, /ROMNI/);
  assert.match(additions, /관리자/);
  assert.match(additions, /Required/);
});
