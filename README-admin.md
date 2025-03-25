# Administrativní rozhraní - KLUB APBT

Tato dokumentace popisuje implementaci administrativního rozhraní pro web Klubu APBT.

## Přehled

Administrativní rozhraní je implementováno jako samostatná část SPA aplikace, přístupná na cestě `/admin`. Přístup je chráněn pomocí Firebase Authentication a umožňuje správu obsahu webu.

## Technologie

- React + TypeScript
- Firebase (Authentication, Firestore, Storage)
- Material UI pro uživatelské rozhraní
- CKEditor pro WYSIWYG editor
- React Hook Form pro formuláře

## Struktura souborů

```
src/
├── components/
│   ├── AdminLayout/          # Layout pro admin sekci
│   ├── ConfirmDialog/        # Dialog pro potvrzení akcí
│   ├── DataTable/            # Tabulka pro zobrazení dat
│   ├── Editor/               # WYSIWYG editor
│   ├── FileUpload/           # Komponenta pro nahrávání souborů
│   └── ProtectedRoute/       # Komponenta pro chráněné cesty
├── contexts/
│   └── AuthContext.tsx       # Kontext pro správu autentizace
├── firebase/
│   └── config.ts             # Konfigurace Firebase
├── pages/
│   └── admin/
│       ├── Dashboard.tsx     # Dashboard stránka
│       ├── Login.tsx         # Přihlašovací stránka
│       ├── News/             # Správa novinek
│       │   ├── NewsList.tsx  # Seznam novinek
│       │   └── NewsForm.tsx  # Formulář pro přidání/úpravu novinky
│       └── index.ts          # Export admin komponent
├── services/
│   └── firestore.ts          # Služby pro práci s Firestore
├── types/
│   └── models.ts             # TypeScript typy pro data
└── utils/
    └── slugify.ts            # Utility pro generování URL slugů
```

## Funkce

### Autentizace

Přihlášení je implementováno pomocí Firebase Authentication s podporou:

- Přihlášení e-mailem a heslem
- Přihlášení pomocí Google účtu

### Správa obsahu

Administrativní rozhraní umožňuje CRUD operace pro:

- Novinky
- Akce
- Galerie
- Sponzory
- Dokumenty

### WYSIWYG editor

Pro úpravu textového obsahu je integrován CKEditor s následujícími funkcemi:

- Formátování textu (tučné, kurzíva, seznamy)
- Vkládání odkazů
- Vkládání obrázků
- Vkládání tabulek

### Správa souborů

Nahrávání souborů je implementováno pomocí Firebase Storage:

- Nahrávání obrázků pro novinky, akce, galerie a sponzory
- Nahrávání dokumentů (PDF, DOC, atd.)
- Automatické generování náhledů

## Konfigurace Firebase

Pro správné fungování administračního rozhraní je potřeba nakonfigurovat Firebase v souboru `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};
```

## Rozšíření

Pro implementaci dalších sekcí (akce, galerie, sponzoři, dokumenty) je možné použít stejný vzor jako u novinek:

1. Vytvořit seznam položek (např. `EventsList.tsx`)
2. Vytvořit formulář pro přidání/úpravu položky (např. `EventForm.tsx`)
3. Přidat cesty do `App.tsx`
4. Přidat položku do menu v `AdminLayout.tsx`

## Zabezpečení

Přístup k administračnímu rozhraní je chráněn pomocí:

1. Firebase Authentication pro ověření uživatele
2. Komponenty `ProtectedRoute` pro ochranu cest
3. Pravidel zabezpečení v Firebase Firestore a Storage
