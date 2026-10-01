# UI conventions

- All date inputs and date selectors must use the shared `app-date-picker` Angular Material component. Do not add native HTML `<input type="date">` controls.
- Dates displayed or entered by users use Argentine format `dd/MM/aaaa`. Convert to the ISO format `YYYY-MM-DD` only at the application/data boundary.
