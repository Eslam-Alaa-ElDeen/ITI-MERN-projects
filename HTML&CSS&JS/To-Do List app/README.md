# Todoify — Simple To-Do List App

A clean, lightweight to-do list web app built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no dependencies, no build step. Add tasks, mark them as done, and remove them with a single click.

## Live Preview

Open `index.html` in any browser — it works completely offline.

## Features

- **Add tasks** — type a task and click **Add** (or the button click triggers task creation)
- **Mark as complete** — click any task to toggle a checkmark and strikethrough style
- **Delete tasks** — click the `×` on a task to remove it from the list
- **Input validation** — shows an alert if you try to add an empty task
- **Pre-seeded example tasks** — the list ships with a few sample to-dos so you can see the styling immediately
- **Clean, minimal UI** — blue header, teal accent button, and card-style list items with hover effects

## Tech Stack

| Layer      | Details                                  |
|------------|--------------------------------------------|
| Markup     | HTML5                                       |
| Styling    | CSS3 (`style.css`)                          |
| Scripting  | Vanilla JavaScript (`script.js`), no libraries |

## Project Structure

```
todoify/
├── index.html      # Page markup and starter task list
├── style.css       # All styling (header, input, list items, checked/close states)
├── script.js       # Add / complete / delete task logic
└── README.md
```

## How It Works

- Every `<li>` in the list automatically gets a `×` "close" button appended via `addCloseButton()`.
- Clicking a task toggles the `checked` CSS class, which adds a strikethrough and a ✔ before the text.
- Clicking **Add** reads the input value, creates a new `<li>`, appends it to the list, attaches its own close button, and clears the input.
- Clicking `×` on any task hides that list item (`display: none`) rather than removing it from the DOM.

## Getting Started

1. Download or clone this folder.
2. Open `index.html` directly in your browser — that's it, no installation needed.

## Suggested Improvements

- **Persist tasks** — currently tasks reset on page reload; add `localStorage` so the list survives refreshes.
- **Remove from DOM instead of hiding** — swap `div.style.display = "none"` for `li.remove()` to fully delete completed items rather than just hiding them.
- **Keyboard support** — allow pressing **Enter** in the input field to add a task, not just clicking the button.
- **Edit existing tasks** — add double-click-to-edit functionality on list items.
- **Task counter / empty state** — show how many tasks remain, and a friendly message when the list is empty.
- **Replace `alert()`** — use an inline error message instead of a browser alert for a smoother UX.

## Credits

Built as a JavaScript practice project (DOM manipulation, event listeners, and dynamic element creation).
