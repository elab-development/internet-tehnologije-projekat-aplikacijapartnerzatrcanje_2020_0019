
# Veb aplikacija za traženje partnera za trčanje 

Reč je o veb aplikaciji za traženje partnera za trčanje. Aplikacija ima tri moguće korisničke uloge: administratora, ulogovanog trkača i neulogovanog korisnika.
Korišćene tehnologije
•	Laravel
•	React
•	MySQL

# Pokretanje aplikacije
Najpre je potrebno pokrenuti Apache i MySQL u okviru XAMPP-a. Zatim je potrebno pokrenuti redom sledeće komande:

# Kloniranje
•	git clone https://github.com/elab-development/internet-tehnologije-projekat-aplikacijapartnerzatrcanje_2020_0019
•	cd internet-tehnologije-projekat-aplikacijapartnerzatrcanje_2020_0019

# Backend
Uneti redom komande:
•	cd running-partner
•	composer install
•	php artisan migrate
•	php artisan db:seed
•	php artisan serve

# Frontend
Uneti redom komande:
•	cd frontend\React\frontend
•	npm install
•	npm start

# Funkcionalnosti za neulogovanog korisnika:
•	Prijava (Login)
•	Registracija (Register)

# Funkcionalnosti za ulogovanog trkača:
•	Prijava (Login)
•	Prikaz slike trkača
•	Prikaz informacija na profilu
•	Ažuriranje mesta na profilu
•	Upload slike na profilu
•	Prikaz svih trkača
•	Filitriranje trkača prema polu
•	Kreiranje plana trke
•	Prikaz svih komentara plana trke
•	Dodavanje komentara za plan trke
•	Prikaz svih planova trka
•	Kreiranje statistike trke
•	Prikaz statistika trka trkača
•	Izračunavanje prosečne brzine statistike trke
•	Prikaz ekportovane statistike trke na osnovu id-a trkača
•	Odjava (Log out)

# Funkcionalnosti za administratora:
•	Prijava (Login)
•	Prikaz svih trkača
•	Filitriranje trkača prema polu
•	Prikaz svih komentara plana trke
•	Prikaz svih komentara
•	Brisanje komentara
•	Prikaz svih planova trka
•	Prikaz statistika trka svih trkača
•	Odjava (Log out)
