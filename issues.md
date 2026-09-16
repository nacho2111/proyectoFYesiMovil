# Issues del MVP — QuickFix

Sacadas del documento `yesiProyectF.docx`. Son solo las funcionalidades **imprescindibles**
(el MVP que define el doc).

Historial, estadísticas, perfil, roles, formato liga y reutilizar formatos quedan afuera
por ahora — se agregan cuando el MVP ande.

El reparto es por tipo de trabajo: Mateo se lleva todo lo de pantallas y Nacho la lógica,
los datos y el setup.

Están en orden de ejecución: cargalas al tablón de arriba para abajo y la columna queda
ordenada sola. Antes conviene crear dos labels en el repo: `mateo` y `nacho`.

---

## 1. Limpiar el proyecto base de Expo — Nacho

El proyecto todavía tiene las pantallas de ejemplo que trae create-expo-app (explore, hello-wave, parallax y esas). Hay que sacar todo eso y dejarlo limpio para empezar a laburar.

Ojo de no romper el layout de expo-router al borrar.

Va primera porque hasta que no esté, el resto pisa archivos que después borramos.

## 2. Armar la navegación con las pantallas vacías — Mateo

Crear las rutas de expo-router de todas las pantallas del MVP: inicio, crear torneo, participantes, cuadro y resultado.

Por ahora vacías, solo para poder navegar entre todas y ver que el recorrido cierra.

## 3. Estilos y componentes base — Mateo

Definir los colores y los tamaños de texto, y armar los componentes que se repiten en todas las pantallas: botón, input y título.

Así no terminamos copiando y pegando estilos en cada archivo. Cuanto antes esté, menos hay que rehacer después.

## 4. Generar el fixture de eliminación directa — Nacho

Es la función que arma los cruces a partir de la lista de participantes y el tamaño del cuadro. Tiene que devolver todas las rondas ya armadas y resolver los lugares que quedan libres.

Es la parte más importante del MVP. Como es lógica sola y no depende de ninguna pantalla, se puede hacer en paralelo con la navegación y los estilos.

## 5. Pantalla de inicio — Mateo

Es la primera pantalla que ve el usuario. Va un botón grande de "Crear torneo" y abajo la lista de los torneos que ya tiene.

Si todavía no hay ninguno, mostrar un mensaje en lugar de la lista vacía.

Necesita la navegación y los componentes base ya hechos.

## 6. Pantalla para crear un torneo — Mateo

Formulario simple con el nombre del torneo. Al confirmar arranca un torneo nuevo y pasa a cargar los participantes.

El formato por ahora es siempre eliminación directa, así que no hace falta pedirlo.

## 7. Cargar los participantes — Mateo

Pantalla para ir agregando los nombres de los que juegan. Se tiene que poder borrar uno y editar el nombre si te equivocaste.

Mostrar el contador de cuántos van cargados.

## 8. Elegir el tamaño del cuadro — Mateo

El usuario elige si el cuadro es de 8, 16 o 32 lugares.

Si hay menos jugadores que lugares, los que sobran quedan libres y pasan directo a la ronda siguiente.

Va después de participantes porque comparte pantalla con esa lista.

## 9. Reordenar los participantes antes de generar el cuadro — Mateo

Antes de armar el fixture el usuario tiene que poder cambiar el orden de la lista, para decidir quién juega contra quién.

Con poder subir y bajar un nombre alcanza.

## 10. Validaciones al crear el torneo — Nacho

Que no deje seguir si el torneo no tiene nombre, si hay menos de 2 participantes o si hay dos nombres repetidos.

Las reglas van en funciones aparte y devuelven el mensaje de error; las pantallas de las issues 6 y 7 después lo muestran donde corresponda, sin alerts.

## 11. Pantalla del cuadro — Mateo

Mostrar el fixture completo: las rondas, quién juega contra quién y el resultado si ya está cargado.

Se tiene que poder scrollear para el costado porque no entra todo en la pantalla del celular.

Necesita la issue 4 terminada, que es la que devuelve las rondas.

## 12. Cargar el resultado de un partido — Mateo

Al tocar un partido se abre para poner el resultado y marcar el ganador.

Cuando se guarda, el ganador tiene que aparecer solo en el cruce de la ronda que sigue. Esa parte la resuelve la función de la issue 4, acá va la pantalla y el guardado del resultado.

## 13. Finalizar el torneo — Nacho

Cuando se carga el resultado de la final, el torneo pasa a terminado y se muestra el campeón.

Un torneo terminado no se puede seguir editando.

Es lo último del recorrido, así que va después de que anden los resultados.

## 14. Guardar los torneos en el celular — Nacho

Ahora si cerrás la app se pierde todo. Guardar los torneos con AsyncStorage y volver a leerlos cuando abre, así la lista del inicio muestra los de antes.

Va al final a propósito: recién acá sabemos bien qué datos tiene un torneo y no hay que rehacer el guardado tres veces.

---

## Cómo queda el reparto

| # | Issue | Quién |
|---|---|---|
| 1 | Limpiar el proyecto base de Expo | Nacho |
| 2 | Armar la navegación con las pantallas vacías | Mateo |
| 3 | Estilos y componentes base | Mateo |
| 4 | Generar el fixture de eliminación directa | Nacho |
| 5 | Pantalla de inicio | Mateo |
| 6 | Pantalla para crear un torneo | Mateo |
| 7 | Cargar los participantes | Mateo |
| 8 | Elegir el tamaño del cuadro | Mateo |
| 9 | Reordenar los participantes antes de generar el cuadro | Mateo |
| 10 | Validaciones al crear el torneo | Nacho |
| 11 | Pantalla del cuadro | Mateo |
| 12 | Cargar el resultado de un partido | Mateo |
| 13 | Finalizar el torneo | Nacho |
| 14 | Guardar los torneos en el celular | Nacho |

Mateo: las 9 de pantallas. Nacho: setup, la lógica del fixture, las validaciones,
el estado del torneo y el guardado.

## Cómo se cruza el trabajo

Nacho arranca con la 1, que es corta y desbloquea todo. Apenas está, Mateo se mete con la 2
y la 3 mientras Nacho hace la 4, que es lógica pura y no toca ninguna pantalla.

De ahí Mateo sigue derecho por las pantallas: 5, 6, 7, 8, 9. Nacho en paralelo hace la 10 y
después la 13 y la 14.

El único punto donde se tienen que esperar es la 11: la pantalla del cuadro no puede arrancar
hasta que la 4 esté andando y devuelva las rondas.
