# Migration vers le cahier des charges PAL

## 1. Base de données

Commandes pour lancer l'installation, les migrations vers la base de données et le serveur 

```bash
npm install --legacy-peer-deps

npm run dev

npx prisma generate

npx prisma migrate dev --name pal_cahier_des_charges
```

Si vous avez déjà des utilisateurs en base sans les champs `role` et `accountStatus`, la migration les ajoutera avec les valeurs par défaut :
- `role = 'STAGIAIRE'`
- `accountStatus = 'PENDING'`

Pour activer un compte **administrateur** (premier déploiement), exécuter en SQL :

```sql
UPDATE "User"
SET role = 'ADMIN', "accountStatus" = 'ACTIVE'
WHERE email = 'votre-email-admin@pal.tg';
```

Pour activer des comptes existants sans les bloquer en attente :

```sql
UPDATE "User"
SET "accountStatus" = 'ACTIVE'
WHERE "accountStatus" = 'PENDING';
```

## 2. Rôles et flux

- **ADMIN** :  Validation des comptes, Création des Projets et Assignation des tâches
- **STAGIAIRE** : Consultation et Modification des statuts des taches 

Un nouveau compte créé via inscription a le rôle **STAGIAIRE** et le statut **PENDING** jusqu’à validation par un chef ou l’admin.
