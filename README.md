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
# 다크모드 미리보기

`pnpm storybook` 실행 후 상단 툴바에서 **라이트 / 다크**를 선택한다. 앱에서는 루트에 `<RomniThemeProvider mode="dark">...</RomniThemeProvider>`를 적용한다. `mode="light"`는 기존 컴포넌트의 라이트 색상으로 복원한다.

Provider는 문서 전체 CSS 토큰과 MUI 테마를 제공해 포털 메뉴에도 적용된다. 저장·OS 테마 선택은 사용하는 앱에서 관리한다. 배경은 Edge와 같은 중성 회색 계열(`#121212` → `#1C1C1C` → `#262626` → `#323232`)이고 파랑은 강조 요소에 사용한다.

## 앱에서 버전 사용

컴포넌트 변경은 이 저장소의 `src`와 테스트에 반영하고 `pnpm check`로 생성한 `dist`를 함께 커밋한다. `main` 병합 후 릴리스 워크플로가 현재 `package.json` 버전의 Git 태그를 생성한다.

Edge·Region은 `github:KAON-Robotics/romni-design-components#v<버전>`을 참조하고 `pnpm install`로 잠금 파일을 갱신한다. 병합 전 통합 검증에는 PR의 전체 커밋 SHA를 고정한다. 앱별 패치나 로컬 패키지 압축파일은 사용하지 않는다.
