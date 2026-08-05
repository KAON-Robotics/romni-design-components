import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Button,
  DashboardCount,
  HelpTooltip,
  InfoTable,
  InfoTableRow,
  InputButton,
  InputErrorMessage,
  InputPassword,
  ListTable,
  MainLayout,
  MultiSelectFilter,
  NavTooltip,
  Pagination,
  RoleBadge,
  SelectBox,
  SingleSelectFilter,
  ToggleSwitch,
} from "../dist/index.js";

test("public components render", () => {
  const primaryButton = renderToStaticMarkup(React.createElement(Button, null, "Save"));
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
      React.createElement(InfoTableRow, { label: "Name", required: true }, "ROMNI"),
      React.createElement(InputPassword, { value: "secret" }),
      React.createElement(InputErrorMessage, { msg: "Required" }),
      React.createElement(ToggleSwitch, { checked: true, onChange() {} }),
      React.createElement(RoleBadge, { role: "manager" }),
    ),
  ));
  const migrated = renderToStaticMarkup(React.createElement(React.Fragment, null,
    React.createElement(DashboardCount, { value: "12", unit: "대" }),
    React.createElement(MultiSelectFilter, {
      filter: { label: "Status", options: [{ label: "Idle", value: "idle" }] },
      initialSelected: ["idle"],
      onChange() {},
    }),
    React.createElement(NavTooltip, null, "Navigation"),
    React.createElement(HelpTooltip, { help: { title: "Help", contents: [] } }),
    React.createElement(SingleSelectFilter, {
      selected: "All",
      options: [{ label: "All", value: "all" }],
      onSelect() {},
    }),
    React.createElement(SelectBox, {
      placeholder: "Choose",
      options: [{ label: "KARINA", value: "karina" }],
    }),
  ));

  assert.match(primaryButton, />Save</);
  assert.match(button, />Save</);
  assert.match(pagination, /11 - 20 of 25/);
  assert.match(table, /ROMNI/);
  assert.match(additions, /관리자/);
  assert.match(additions, /Name/);
  assert.match(additions, /Required/);
  assert.match(migrated, /Status/);
  assert.match(migrated, /12/);
  assert.match(migrated, /Navigation/);
  assert.match(migrated, /도움말/);
  assert.match(migrated, /All/);
  assert.match(migrated, /Choose/);
});
