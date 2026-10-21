---
name: QuickFix
description: Fixtures de torneos en minutos, leídos como un marcador de píxeles.
colors:
  paper: "#FFFFFF"
  ink: "#111111"
  process-magenta: "#E6007E"
  ink-muted: "#5A5A5A"
  gray-surface: "#F2F2F2"
  gray-raised: "#E6E6E6"
  gray-border: "#BDBDBD"
  gray-hairline: "#DDDDDD"
  night-paper: "#0E0E0E"
  night-ink: "#F2F2F2"
  night-magenta: "#FF3EA5"
  night-muted: "#A6A6A6"
  night-border: "#474747"
  night-hairline: "#2B2B2B"
typography:
  display:
    fontFamily: "Jersey10_400Regular"
    fontSize: "88px"
    lineHeight: 0.86
  headline:
    fontFamily: "Jersey10_400Regular"
    fontSize: "64px"
    lineHeight: 0.85
  title:
    fontFamily: "Jersey10_400Regular"
    fontSize: "40px"
    lineHeight: 0.95
  subtitle:
    fontFamily: "Jersey10_400Regular"
    fontSize: "30px"
    lineHeight: 1
  figures:
    fontFamily: "Jersey10_400Regular"
    fontSize: "22px"
  body:
    fontFamily: "SchibstedGrotesk_400Regular"
    fontSize: "16px"
    lineHeight: 1.44
  label:
    fontFamily: "SchibstedGrotesk_700Bold"
    fontSize: "14px"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "20px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "52px"
    padding: "0 20px"
  button-next:
    backgroundColor: "{colors.process-magenta}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "52px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "52px"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.process-magenta}"
    rounded: "{rounded.none}"
    height: "52px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "50px"
    padding: "0 12px"
  stage-box:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  match-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    width: "200px"
    height: "104px"
---

# Design System: QuickFix

## Overview

**Creative North Star: "Letra de píxeles"**

QuickFix is set like an Emigre bitmap type specimen applied to a scoreboard. Tournament names, scores, counts and table figures are pixel letters at poster scale, the same face repeated at five steps (88, 64, 40, 30, 22), while everything you read runs in a fine grotesk. Thick ink rules divide the page, corners are square, and a halftone dot band is the one texture. It reads like a stadium dot-matrix board printed on paper.

Color is almost absent on purpose. Paper and ink carry the interface; a single synthetic accent, process magenta, marks only what matters right now: the stage in play, the next match and its button, the leader's points, the matches still to play in a bracket, and errors. Result marks stay black and white and are told apart by shape. This direction came after three rejected rounds (neon yellow, graphite, photo campaign) that all read as AI-made; the pixel type, square ink geometry and near-total absence of color are what set it apart.

**Key Characteristics:**
- Jersey 10 pixel letters for names, titles and every number; Schibsted Grotesk for reading.
- Paper and ink, 2px rules, square corners, one halftone dot band per screen header.
- Process magenta only for what matters now.
- Black-and-white result marks: G filled, E outlined, P gray, WO struck.
- No icons, no photos, no rounded cards.

## Colors

Paper and ink, with one printing-process accent.

### Primary
- **Ink** (#111111 / night #F2F2F2): text, 2px rules, primary buttons, filled stages and G marks, the selected option.
- **Paper** (#FFFFFF / night #0E0E0E): the ground and the text on ink.

### Secondary
- **Process Magenta** (#E6007E / night #FF3EA5): the stage in play ("Fecha 3 en juego" and its box), the next-match label and its "Cargar resultado" button, the leader's points and qualifying positions, pending match borders in the bracket, the selected tab underline, errors and destructive buttons.

### Neutral
- **Ink Muted** (#5A5A5A / #A6A6A6): secondary text, table figures other than points.
- **Gray Border** (#BDBDBD / #474747) and **Hairline** (#DDDDDD / #2B2B2B): unselected boxes and row dividers.
- **Gray Surface / Raised** (#F2F2F2 / #E6E6E6): stepper buttons only.

### Named Rules
**The One Ink, One Magenta Rule.** Everything is paper and ink. Magenta appears only on what matters now; if a magenta element is not the next action, the stage in play, the leader or an error, it is a defect.

**The Shape Not Color Rule.** Result states are told apart by shape (filled, outlined, gray, struck), never by colored chips.

## Typography

**Display and figures:** Jersey 10 (pixel), loaded with `@expo-google-fonts/jersey-10`.
**Text:** Schibsted Grotesk (Regular 400, Medium 500, Bold 700), loaded with `@expo-google-fonts/schibsted-grotesk`.

**Character:** a chunky bitmap face at poster scale against a sharp newspaper grotesk, like a specimen sheet.

### Hierarchy (the specimen steps)
- **88px pixel:** the QuickFix name on the home screen.
- **64px pixel:** the tournament name; the champion's name; the progress count in statistics.
- **40px pixel:** screen titles; the two names in the next match.
- **30px pixel:** section headings, the stage in play, names in statistics.
- **22px pixel:** every table figure, stage count, score and bracket footer; points at 28px.
- **Body** (Schibsted Grotesk 400/500, 15–17px): names in lists and tables, options, descriptions.
- **Label** (Schibsted Grotesk Bold, 13–14px): field labels, question titles, table headers, panel labels.

### Named Rules
**The Specimen Rule.** The pixel face only appears at the five steps above; never at in-between sizes, and never for running text.

**The Words Not Icons Rule.** Actions are written out ("Editar", "Borrar", "Subir"); there are no icons, emoji or pictograms.

## Layout

Phone-first, 16px gutter, content capped at 720px and centered on wider screens. The home screen stacks the 88px name, a one-line pitch, a three-row halftone band, the "Crear torneo" button, a wrap of square sport boxes ("Empezá por el deporte") and the tournament list. A tournament opens on its name in 64px pixels, the stage in play in magenta, the meta line, a halftone band, the stage strip, tabs above a 2px rule, then the next match and the content. From 960px wide the next match moves to a fixed 320px column on the right. Brackets scroll sideways in 200px columns.

## Elevation & Depth

Flat. No shadows. Depth comes from ink weight: 2px rules on top of every panel and table, hairlines between rows, filled ink for done or selected things. Pressing a button nudges it 2px right and down, like a stamp.

**The Ink Rule.** Group with a 2px ink rule on top and hairlines between rows; never with shadows, rounded boxes or gray fills.

## Shapes

Everything is square (0 radius). Buttons, inputs, stage boxes, sport boxes, match cards, radios and marks are rectangles with 2px borders. The halftone band is a grid of 6px cells with dots shrinking from left to right.

## Components

### Buttons
- **Primary:** ink fill, paper label, 2px ink border, 52px tall.
- **Next:** magenta fill, used only for "Cargar resultado" on the next match.
- **Secondary:** 2px ink outline.
- **Danger:** 2px magenta outline and label; asks for a second tap.
- **Pressed / disabled:** shifted 2px down-right / 0.35 opacity.

### Stage strip (signature component)
Square boxes per fecha, ronda or phase with the name in bold grotesk and the played count in 22px pixels. Finished stages are filled with ink, the stage in play has a magenta border and count, the rest a gray border.

### Next match
A 2px ink box: "Próximo partido" in magenta with where it is played, the two names in 40px pixels separated by "vs", and the magenta button. The champion uses the same box filled with ink and the name at 64px.

### Tables and lists
A 2px ink rule on top, hairlines between rows, no outer box. Standings show position and figures in 22px pixels, points at 28px; the leader's points and qualifying positions in magenta.

### Marks
Pixel letters at 18px in a 22px-tall box with a 2px border: G filled with ink, E outlined, P gray, WO outlined and struck through.

### Inputs / Fields
Paper fill, 2px gray border that turns ink on focus and magenta on error; bold labels above.

### Selectors
Sport: a 4-column grid of square boxes with the name; the chosen one filled with ink. Format: square radios with a filled square when chosen. Numeric options and points: pixel numbers.

### Navigation
Native stack with a plain header and an "Editar" word button on the tournament screen. Tabs are words with a 4px magenta underline under the selected one, above a 2px ink rule.

## Do's and Don'ts

### Do:
- **Do** set names, titles and every number in Jersey 10 at the specimen steps.
- **Do** keep everything paper and ink with 2px rules and square corners.
- **Do** reserve magenta for the stage in play, the next match, the leader and errors.
- **Do** distinguish results by mark shape, not color.
- **Do** use the halftone band once per screen header.

### Don't:
- **Don't** add icons, emoji, photos or rounded cards.
- **Don't** use magenta for decoration, counts or selection.
- **Don't** set running text in the pixel face or use it at in-between sizes.
- **Don't** add shadows or gray filled boxes.
- **Don't** place a small label above a heading.
