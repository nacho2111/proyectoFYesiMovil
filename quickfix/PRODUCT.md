# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

One Expo / React Native codebase that ships to Android, iOS and the web (computer browser). It must work on any phone and on a desktop browser; native affordances per OS (back gesture, safe areas, keyboard behavior) stay native.

## Users

Tournament organizers, 12 to 60 years old, who use their phone constantly. Example persona from the project plan: Fran, 25, a tennis teacher who occasionally runs junior and friendly tournaments for club members and today tracks the draw on paper, where mistakes are easy and redoing the draw or results is painful. Also athletes and gamers running informal tournaments.

## Product Purpose

QuickFix lets someone set up a tournament fixture fast and keep it up to date while it is being played. Success: a fixture built in under 5 minutes, results entered quickly, the next matchups visible right away, and the tournament finished without redoing anything by hand.

## Positioning

No sign-up, everything stays on the device, and it adapts to the tournament's sport and format instead of forcing one kind of draw.

## Operating Context

Used on the spot at a club, court, field or table while matches are being played: create the tournament, load participants and the number of places, choose play order, enter results, see the next matchups, finish the tournament.

## Capabilities and Constraints

- Sports: tenis, truco, fútbol, básquet, pádel, futsal, vóley, or "otro" (the user names it and it uses a normal scoring system).
- Formats: eliminación directa, liga (round robin, todos contra todos), grupos + eliminación, doble eliminación.
- Match outcomes: ganó, empató, perdió, walkover (W.O.).
- Tournaments can be edited after creation.
- Statistics: e.g. team with most wins, team with most points.
- Data persists locally with AsyncStorage; there are no accounts.
- Code constraint: keep the existing Expo Router structure, file layout (`app/`, `components/`, `hooks/`, `styles/`, `utils/`) and conventions; change code incrementally, not abruptly. Visual styles may be replaced entirely.
- Interface copy is in Rioplatense Spanish (voseo: "Cargá", "Elegí").

## Brand Commitments

Name: QuickFix. Spanish (Argentina) voice, direct and informal.

## Evidence on Hand

No real tournaments, customers, testimonials or metrics. Do not fabricate them. The app ships no photos or illustrations.

## Product Principles

- Speed over ceremony: every step should shorten the path from "I need a fixture" to "the fixture is running".
- Clear over clever: draws and tables must be readable at a glance, never complicated.
- Forgiving: results and tournament details can be corrected without starting over.
- Fits the tournament: sport and format shape scoring and structure, not the other way around.

## Accessibility & Inclusion

Wide age range (12 to 60): readable text sizes, large touch targets, sufficient contrast in light and dark.
