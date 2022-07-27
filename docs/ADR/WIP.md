# Architectural Decision Records

- Los `usecases` debe tener una sola responsabilidad.
- Los `usecases` no deben tener dependencia de otros `usecases`.
- Los `usecases` deben depender de `services` a través de `interfaces`.
- Los `usecases` deben depender de `repositories` a través de `interfaces`.
- El nombre de las carpetas debe usar la convención `kebab-case`.
- El nombre de las archivos debe usar la convención `kebab-case` con algunas execpciones.
- El nombre de los archivos que contienen una `class` debe usar la convención `CamelCase`.
- El nombre de los archivos que contienen una `interface` debe usar la convención `CamelCase`.
- Un archivo no puede tener más de una `class` declarada.
- Un archivo no puede tener más de un `export`
- No usar `export default`
