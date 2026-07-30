# ROMNI Design Components

Shared React components used by ROMNI Edge and ROMNI Region.

## Included

- `InputButton`, `DeleteRowButton`
- `InputCheckbox`, `InputPassword`
- `InputErrorMessage`, `InputSuccessMessage`
- `ToggleSwitch`
- `Pagination`
- `ListTable`
- `TableLoadingOverlay`
- `InfoTable`, `InfoTableBody`
- `MainLayout`
- `RoleBadge`

`ListTable` keeps the common Edge/Region API and adds `rowKey`, `emptyContent`, and explicit `clientPagination` options. Product API calls, routing, translations, layout, and domain assets stay in each application.

The next candidates are `MultiSelectFilter` and `ListCount`. `SingleSelectFilter`, date inputs, text inputs, modals, tabs, and page headers remain local until their differing behavior is reconciled.

## Install from Git

```bash
pnpm add 'git+ssh://git@github.com/KAON-Robotics/romni-design-components.git#v0.1.0'
```

## Use

```tsx
import { InputButton, ListTable } from "@romni/design-components";
```

## Verify

```bash
pnpm check
```
