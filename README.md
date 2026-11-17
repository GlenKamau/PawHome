# PawHome

PawHome is a pet adoption website. Visitors can look at pets, find one they like, and send a request to adopt it. Shelters can add new pets to the website.

It is a **single page application**: the browser loads one page, and React swaps the content when you click a link, so the page never reloads.

This is a group project built by five people with **React** and **Tailwind CSS**.

---

## 1. What we have installed so far

| Tool | What it does (in simple words) |
|---|---|
| **React** (`react`, `react-dom`) | Lets us build the website out of small pieces called components |
| **Vite** | The tool that runs the website on our computers while we work and builds it at the end |
| **React Router** (`react-router-dom`) | Moves between pages (Home, Pet list...) without reloading the browser |
| **Tailwind CSS** (`tailwindcss`, `@tailwindcss/vite`) | Styles the website using short class names like `bg-ivory` instead of writing long CSS |
| **Lucide React** (`lucide-react`) | Gives us icons (paw, menu, dog, cat...) |
| **json-server 0.17.4** (dev tool) | Turns the file `db.json` into a fake backend, so we can read, add, edit and delete pets. We use version 0.17.4 on purpose, because the newer version works differently |
| **ESLint** | Checks our code for mistakes while we write it |
| **Google Fonts** (Barlow and Open Sans) | The two fonts of the website. They are loaded in `index.html`, not installed with npm |

**Not installed yet:** Jest and React Testing Library (for our tests). Whoever sets them up should add them to this list.

---

## 2. How to run the project

Run these steps once, after you clone the project:

```bash
npm install
```

Every time you work, open **two terminals**:

```bash
npm run api     # terminal 1: starts the fake database on http://localhost:3001
npm run dev     # terminal 2: starts the website (Vite shows the address)
```

If the website shows "We could not load the pets", the first terminal (`npm run api`) is not running.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the website |
| `npm run api` | Starts the fake database from `db.json` |
| `npm run reset-db` | Puts `db.json` back to the original data from `db.seed.json` |

---

## 3. What every file and folder does

```
PawHome/
  db.json
  db.seed.json
  index.html
  package.json
  package-lock.json
  vite.config.js
  eslint.config.js
  .gitignore
  README.md
  public/
    images/
      pets/
      species/
  src/
    main.jsx
    App.jsx
    index.css
    api/
      pets.js
    context/
      PetsContext.jsx
    components/
      layout/
        Layout.jsx
        Header.jsx
        Footer.jsx
      home/
        SpeciesCards.jsx
        FeaturedPets.jsx
        HowItWorks.jsx
        CallToAction.jsx
    pages/
      HomePage.jsx
      PetListPage.jsx
      PetDetailPage.jsx
      PetCreatePage.jsx
      PetEditPage.jsx
      AdoptionPage.jsx
    assets/
```

### Files in the main folder

| File | What it does |
|---|---|
| `db.json` | Our fake database. It holds the pets, the shelters and the adoption applications. It changes when you add, edit or delete things while testing |
| `db.seed.json` | A clean copy of the original data. It never changes. `npm run reset-db` copies it back into `db.json` |
| `index.html` | The one and only HTML page. It loads the fonts and the React app |
| `package.json` | The list of tools we installed and the commands (`dev`, `api`, `reset-db`) |
| `package-lock.json` | Remembers the exact version of every tool, so everyone gets the same ones. Do not edit it by hand |
| `vite.config.js` | The settings for Vite, including the Tailwind and React plugins |
| `eslint.config.js` | The rules ESLint uses to check our code |
| `.gitignore` | Tells Git which files NOT to save (like `node_modules`) |
| `README.md` | This file |

### `public/` folder

| Folder | What it does |
|---|---|
| `public/images/pets/` | Photos of each pet. Each pet has two photos, named like `simba-1.jpg` and `simba-2.jpg` |
| `public/images/species/` | The four photos for the Home page cards: `dogs.jpg`, `cats.jpg`, `rabbits.jpg`, `birds.jpg` |

If a photo is missing, the website shows an icon instead, so nothing looks broken.

### `src/` folder (our code)

| File | What it does |
|---|---|
| `main.jsx` | Where the app starts. It wraps the app in the router (for page links) and the pets provider (for shared data) |
| `App.jsx` | The list of every page and its address. Each person edits their own page file, not this one |
| `index.css` | Turns on Tailwind and holds our **colors and fonts** (the theme) |
| `api/pets.js` | The only file that talks to the database. It has the functions to get, add, change, replace and delete pets |
| `context/PetsContext.jsx` | Loads the pets once and shares them with every page. It also has the functions pages use to change pets (see section 5) |
| `components/layout/Layout.jsx` | Puts the Header and Footer around every page. The current page appears in the middle |
| `components/layout/Header.jsx` | The teal menu bar at the top, with the phone menu button |
| `components/layout/Footer.jsx` | The teal footer at the bottom |
| `components/home/SpeciesCards.jsx` | The "Find your new best friend" title and the four cards: dogs, cats, rabbits and birds |
| `components/home/FeaturedPets.jsx` | Shows 3 available pets on the Home page |
| `components/home/HowItWorks.jsx` | The three steps of adoption |
| `components/home/CallToAction.jsx` | The banner asking shelters to list a pet |
| `pages/HomePage.jsx` | The Home page. It puts the four home sections in order |
| `pages/PetListPage.jsx` | The page with all the pets. **(Tevin builds it)** |
| `pages/PetDetailPage.jsx` | The page for one pet. **(Emmanuel builds it)** |
| `pages/PetCreatePage.jsx` | The form to add a pet. **(Leonard builds it)** |
| `pages/PetEditPage.jsx` | The form to edit a pet. **(Leonard builds it)** |
| `pages/AdoptionPage.jsx` | The adoption form. **(Cornelius builds it)** |
| `assets/` | Came with the Vite template. We do not use it. Pet photos go in `public/images` |

**Rule of thumb:** a **page** is one whole screen. A **component** is a smaller piece that a page uses.

---

## 4. Pages and addresses

| Page | Address | Who builds it | What it does |
|---|---|---|---|
| Home | `/` | Glen | The landing page. It links to the other pages |
| Pet list | `/pets` | Tevin | Cards of all pets with a photo and short description, grouped by category |
| Pet details | `/pets/:id` | Emmanuel | Everything about one pet, with more photos |
| Adoption | `/adopt` and `/pets/:id/adopt` | Cornelius | The adoption form. `/adopt` lets you choose a pet. `/pets/:id/adopt` already has the pet chosen |
| Add pet | `/pets/new` | Leonard | A form to add a pet, with its pictures |
| Edit pet | `/pets/:id/edit` | Leonard | The same form, filled with the pet's current details |

`:id` is the number of a pet. For example, `/pets/3` shows the pet with id 3.

If someone types an address that does not exist, they are sent back to the Home page.

---

## 5. How the data works

```
db.json  ->  json-server  ->  api/pets.js  ->  PetsContext.jsx  ->  pages
(storage)    (fake server)    (fetches)        (loads and shares)   (show it)
```

1. `db.json` stores the data.
2. `npm run api` starts json-server, which makes it available at `http://localhost:3001`.
3. `api/pets.js` asks for that data.
4. `PetsContext.jsx` loads it once and shares it.
5. Pages read it with one line, and **never** call the database themselves:

```jsx
import { usePets } from "../context/PetsContext";

const { pets, shelters, loading, error } = usePets();
```

### What `usePets()` gives you

| Name | What it is |
|---|---|
| `pets` | The list of all pets |
| `shelters` | The list of shelters |
| `loading` | `true` while the data is still loading |
| `error` | An error message if loading failed, otherwise empty |
| `addPet(data)` | Adds a new pet |
| `updatePet(id, changes)` | Changes part of a pet, like its status |
| `replacePet(id, pet)` | Replaces the whole pet (used by the edit form) |
| `removePet(id)` | Deletes a pet |
| `submitApplication(petId, form)` | Saves an adoption application and sets the pet to `pending` |

### The words you will see

| Word | Meaning |
|---|---|
| GET | Read data |
| POST | Add something new |
| PATCH | Change a small part |
| PUT | Replace the whole thing |
| DELETE | Remove something |

### What a pet looks like in `db.json`

```json
{
  "id": 1,
  "name": "Simba",
  "species": "dog",
  "breed": "Labrador Mix",
  "ageYears": 2,
  "gender": "male",
  "size": "large",
  "goodWithKids": true,
  "description": "Energetic and loves fetch.",
  "status": "available",
  "shelterId": 1,
  "images": ["/images/pets/simba-1.jpg", "/images/pets/simba-2.jpg"],
  "createdAt": "2026-11-02T09:00:00.000Z",
  "updatedAt": "2026-11-02T09:00:00.000Z"
}
```

| Field | Allowed values |
|---|---|
| `species` | `dog`, `cat`, `rabbit`, `bird`, `other` |
| `size` | `small`, `medium`, `large` |
| `gender` | `male`, `female` |
| `status` | `available`, `pending`, `adopted` |
| `images` | A list of photo paths. **The first photo is the cover** on the cards |
| `shelterId` | The `id` of a shelter in the `shelters` list |

An adoption application is saved in `applications` with: `petId`, `applicantName`, `email`, `phone`, `homeType`, `message`, `status` and `createdAt`.

**Do not edit `db.json` by hand.** If the data gets messy, run `npm run reset-db`. If we need a new field, the change goes into `db.seed.json` and `db.json` together, in a Pull Request the whole team reviews.

---

## 6. The theme (colors and fonts)

The theme lives in `src/index.css`, so every page looks the same. Use the names below, not random colors.

| Share | Color | Name in code | Use it for |
|---|---|---|---|
| 60% | Warm Ivory `#f3eee8` | `ivory` | Page background |
| 30% | Deep Teal `#17645f` | `teal-deep` | Header, footer, banners, links |
| 10% | Coral Orange `#ff6845` | `coral` | Main action buttons and highlights only |

**Fonts:** Barlow for headings and Open Sans for everything else. This happens automatically. You do not need a font class.

### Class cheat sheet

```
Page background      bg-ivory            Card background     bg-card
Borders              border-ivory-deep   Main text           text-ink
Muted text           text-ink-soft       Links, accents      text-teal-deep
Teal buttons         bg-teal-deep text-ivory hover:bg-teal-dark
Coral buttons        bg-coral text-ink hover:bg-coral-dark
Soft badges          bg-teal-tint text-teal-deep
```

### Two color rules

- Coral buttons use **dark text** (`text-ink`), never white. White on coral is hard to read.
- Never use coral as a **text** color on ivory. Use it for backgrounds and borders only.

Design for phones first, then bigger screens: write the normal classes first, then add `sm:`, `md:` and `lg:` for larger screens.

---

## 7. The team and the branches

| Member | Pages | Branch |
|---|---|---|
| **Glen** | Home page, plus the layout, data and theme | `feature/glen-data-layer` |
| **Cornelius** | Adoption page | `feature/cornelius-layout-adoption` |
| **Tevin** | Pet list page | `feature/tevin-pet-list` |
| **Leonard** | Add pet and Edit pet pages | `feature/leonard-pet-form` |
| **Emmanuel** | Pet details page | `feature/emmanuel-pet-details` |

Everyone only edits their own page files. If you need a change in someone else's file, ask them.

### How the branches work

```
main                  the final website. Updated only at the very end
  ^
production            where everyone's finished work is joined together
  ^  ^  ^  ^  ^
Glen  Cornelius  Tevin  Leonard  Emmanuel     (personal branches)
```

### Git rules

1. **Never push straight to `main` or `production`.**
2. Only work on your own branch.
3. Every day before you start, bring in the latest work (see below).
4. Save your work often with a short message, like `git commit -m "add search box"`.
5. When your feature is ready, open a **Pull Request into `production`**.
6. Your reviewer checks it and the group leader gives the final OK.

| Your work | Is checked by |
|---|---|
| Glen | Cornelius |
| Cornelius | Tevin |
| Tevin | Leonard |
| Leonard | Emmanuel |
| Emmanuel | Glen |

### Commands for every day

```bash
git checkout production
git pull origin production              # get the latest team work
git checkout feature/your-branch
git merge production                    # bring it into your branch
npm install                             # in case someone added a new tool

# ...do your work, then save and share it:

git status                              # check what changed
git add .
git commit -m "add search box"
git push origin feature/your-branch
# then open a Pull Request into production on GitHub
```

Before you commit, check `git status`. If `db.json` is in the list and you did not mean to change it, run `npm run reset-db` first.

---

## 8. Rules for the code

1. Only change **your own files**.
2. Use the **theme classes** from section 6.
3. Pages get data with `usePets()`. They never call `fetch` themselves.
4. Photos go in `public/images/`, and the database stores paths like `/images/pets/simba-1.jpg`.
5. Write **3 tests** for your own page.
6. If you are stuck for more than a day, tell the team.

---

## 9. Tests (coming soon)

We will test with **Jest** and **React Testing Library**. They are not installed yet. Each person writes 3 tests for their own page: it shows the right content, a button or form works, and one error case.

---

## 10. Known limits

- The database is fake. There is no login and no real server, so anyone can add, edit or delete pets.
- Photos are file paths. We do not upload files.
- Adoption requests are saved, but there is no page for a shelter to review them yet.