# Adatbázis Absztrakciós Réteg

Ez a mappa az adatbázis absztrakciós réteget tartalmazza, amely lehetővé teszi az adatbázis-kezelő egyszerű cseréjét anélkül, hogy az alkalmazás többi részét módosítani kellene.

## Struktúra

### `types.ts`
Tartalmazza az összes adatbázis-specifikus típusdefiníciót és a `DatabaseAdapter` interfészt, amely meghatározza az alkalmazás által használt összes adatbázis műveletet.

### `supabase-adapter.ts`
A Supabase adatbázis-kezelő konkrét implementációja. Ez valósítja meg a `DatabaseAdapter` interfészt Supabase-specifikus hívásokkal.

### `index.ts`
Az aktív adatbázis adapter exportálása. Ez az egyetlen hely, ahol meg kell adni, hogy melyik adaptert használja az alkalmazás.

## Használat

Az alkalmazásban mindenhol a `db` objektumot használjuk:

```typescript
import { db } from '@/lib/db';

// Autentikáció
const { user, error } = await db.auth.signIn(email, password);

// Profilok kezelése
const { data } = await db.profiles.create(profile);

// Ajánlatkérések
const { data } = await db.offerRequests.create(request);
```

## Új Adapter Hozzáadása

Ha át szeretnél váltani másik adatbázis-kezelőre (pl. PostgreSQL, MongoDB, Firebase):

1. Hozz létre egy új adaptert (pl. `postgres-adapter.ts`)
2. Implementáld a `DatabaseAdapter` interfészt
3. Frissítsd az `index.ts` fájlt az új adapter importálásával:

```typescript
// lib/db/index.ts
import { postgresAdapter } from './postgres-adapter';
import type { DatabaseAdapter } from './types';

export const db: DatabaseAdapter = postgresAdapter; // Cseréld ki itt!

export * from './types';
```

## 🚀 Adatbázis Beállítás

### Az adatbázis már készen áll!

A Supabase adatbázis automatikusan elérhető. A táblákat a következő lépésekkel hozhatod létre:

**1. Supabase Dashboard használata (AJÁNLOTT)**
1. Nyisd meg: https://supabase.com/dashboard
2. Válaszd ki a projektet
3. Menj a **SQL Editor** menüpontba
4. Másold be a `lib/db/schema.sql` fájl tartalmát
5. Kattints a **Run** gombra

**2. Táblák a schema.sql fájlból**

A `schema.sql` fájl tartalmazza:
- ✅ `profiles` tábla - felhasználói profilok
- ✅ `offer_requests` tábla - ajánlatkérések
- ✅ RLS policies - biztonsági szabályok
- ✅ Triggerek - automatikus timestamp kezelés

**FONTOS:** A táblák létrehozása után az alkalmazás azonnal használható!

## Előnyök

- **Rugalmasság**: Könnyen válthatsz adatbázis-kezelőt
- **Tesztelhetőség**: Mock adapter-ekkel egyszerűen tesztelhető
- **Tiszta kód**: Üzleti logika elválasztva az adatbázis-rétegtől
- **Típusbiztonság**: TypeScript interfészek biztosítják a típushelyességet
