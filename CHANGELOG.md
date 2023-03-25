# Apex Legends Randomizers Changelog

Here you can see what has changed between every new release!

---

## Information

When I say `"back end"` or `"backend"`, I mean `src/utils/index.ts`. Please keep this in mind.

Also, when I say `CRA`, I mean `Create React App`. This should probably be obvious to other React developers, but I'm putting this in here just in case.

Please also note that I may leave out some small details, I'm not very good at documenting, so just bear with me here.

---

## Version 0.3.1

**Changes some components and moves a piece of logic into a separate component.**

This is a very minor update, so there's not a _lot_ to document, but let's get started.

### Additions

None!

### Changes

**Changed:** `LandingPointChooser` component now renders some extra text about whether or not the chosen landing point is on the in-game map.

**Changed:** Weapon info has been moved from the `WeaponChooser` component to the `WeaponInfo` component, and the `WeaponChooser` component now renders that component for weapon information.

### Bug Fixes

No bugs whatsoever, hooray!

---

## Version 0.2.1

**Adds a cool new randomizer which chooses a landing point for you to drop into, as well as some changes and bug fixes!**

This is a pretty big update to the web app, so there's a lot to document here, let's just get started.

### Additions

**Added:** Easy image link/path storage (located at `src/images.json`).

**Added:** `LandingPointChooser` component

**Added:** More functions to the "back end"

**Added:** `Location` and `ApexMap` interfaces to the "back end".

### Changes

**Changed:** `Weapon` interface's `infoURL` property is now optional.

**Changed:** `WeaponChooser` component has some updates, details in the block quote below.

> `WeaponChooser` component changes
>
> **Summary:** The updates to said component has added a check for infoURL as well as making the ammo type be shown with `getAmmoType` instead of `Weapon.ammoType`
>
> ---
>
> **Added:** Check for `infoURL` in the `Weapon` we're looking at, and render the `a` tag if it exists.
>
> **Added:** Extra `if` statement for if `Weapon.ammoType` is equal to `none`, and render a message saying there's no weapon if so.
>
> **Changed:** Call `getAmmoType` to show the `Weapon`'s ammo type in the web app rather than the raw `Weapon.ammoType` value.

**Changed:** Web app now has a different icon as well as manifest updates and a different web app title (please view `public/index.html` as well as `public/manifest.json` if interested).

**Changed:** `noscript` tag now renders something different than the default `CRA` template (please view `public/index.html`).

**Changed:** `ammoTypes` and `legendTypes` arrays are now readonly.

**Changed:** `getMessage` has been renamed to `getErrorMessage` and the argument type has been changed from `Array<any>` to `unknown[]` _(Array of unknown)_.

**Changed:** `getRandomWeaponLoadout` has been renamed to `setRandomWeaponLoadout` and now requires a React setter and sets state directly.

**Changed:** All components are now put in separate `<div>` tags rather than making the DOM _`(Document Object Model)`_ messy by putting all the elements of the components in `<body>`.

**Changed:** Added `type="button"` to all buttons in the app to fix some problems the DOM was having _(very minor issue, but it might cause some incompatibility with older browsers)_.

**Changed:** All React setters in the "back end" now use the `Setter` type from said file.

**Changed:** All read-only `Array`s can now use the `ReadOnlyArray` type from the "back end".

### Bug Fixes

**Fixed:** Loadouts can no longer be a length of 3 _(Caused by the `key` of the div with a weapon's info not being unique)_.

**Fixed:** Weapons are now filtered correctly _(Caused by me being an idiot and not ordering the weapons correctly)_.

**Fixed:** Disabling all ammo types along with `Care Package Weapons` will no longer crash the app.

---

> ## Plans for next version
>
> Switch from **React** to [**Preact**](https://preactjs.com/) _(maybe)_.
>
> Add consequence chooser with custom input rather than preset items in the "back end".
>
> Make separate project packaged with [**Tauri**](https://tauri.app/) _(AKA make a separate version that is a desktop application)_ `(would love to do this)`
