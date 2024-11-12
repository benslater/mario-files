- Using vanilla CSS as the task description mentions that you're interested in seeing how I would write it. I have not accounted for the possibility of classnames colliding in a larger app, but I'm aware of the issue and would mitigate it using either CSS modules (classname hashing) or a CSS-in-JS library.

- The component is intended to be reusable, and therefore does not bound its own height and width. I would expect the parent component to wrap it in another element to control the size, as opposed to taking height/width props.

- Given the small size of the task, the structure of the repo is fairly flat. I have not created a separate folder for components, but I would if the app were larger. Several of the components are related - something like this might make sense:

```
components/
  FileTable/
    FileTable.tsx
    FileTable.test.tsx
    FileTable.css
    types.ts
    FileTableRow/
      FileTableRow.tsx
      FileTableRow.test.tsx
      FileTableRow.css
      StatusIndicator/
        StatusIndicator.tsx
        StatusIndicator.test.tsx
        StatusIndicator.css
  CustomCheckbox/
    CustomCheckbox.tsx
    CustomCheckbox.test.tsx
    CustomCheckbox.css
```

- The padding for the table cells is defined as a CSS variable. This has drawbacks (e.g. slight indirection), but has the advantage of allowing the components' individual CSS files to be defined more cleanly.
