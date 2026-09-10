# QuickFix

App para armar fixtures de torneos rápido. Cargás los participantes, elegís el tamaño del
cuadro y te arma los cruces, después vas cargando los resultados y los ganadores avanzan solos.

Hecha con Expo (SDK 54) y expo-router.

## Levantar el proyecto

```bash
npm install
npx expo start
```

Después abrís la app con Expo Go escaneando el QR, o con `a` / `i` si tenés emulador.

## Estructura

```
app/          pantallas (expo-router, routing por archivos)
components/   componentes que se reusan
constants/    colores y tipografía
hooks/        hooks propios
```

## Estado

Arrancando el MVP. Las tareas están en `issues.md` en la raíz del repo.
