# ValidationList / ValidationItem

Rule-based validation feedback list. Each item shows a green check (pass) or red X (fail) with colored text.

## Minimal example

```tsx
import { ValidationList, ValidationItem } from "fg-design";

<ValidationList>
  <ValidationItem valid={password.length >= 8}>
    At least 8 characters
  </ValidationItem>
  <ValidationItem valid={/[A-Z]/.test(password)}>
    One uppercase letter
  </ValidationItem>
  <ValidationItem valid={/[0-9]/.test(password)}>One number</ValidationItem>
</ValidationList>;
```

## Props — ValidationItem

| Prop       | Type        | Default  | Notes                                  |
| ---------- | ----------- | -------- | -------------------------------------- |
| `valid`    | `boolean`   | required | Controls icon (Check/X) and text color |
| `children` | `ReactNode` | required | Rule description                       |

## Props — ValidationList

| Prop       | Type        | Default  | Notes                                 |
| ---------- | ----------- | -------- | ------------------------------------- |
| `children` | `ReactNode` | required | One or more `ValidationItem` elements |
