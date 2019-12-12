# Charta 💳
## Dev tool for smartcard/pos developers
### Charta is a cross platform app which helps developers/testers to interact with chip cards and send apdus

Smartcards supported:
- ISO 7816 (e.g. emv cards, Italian CRS/CNS cards, etc)
- Memory Cards (cards actually supported are SLEXX28 & SLExx42 with ACR38 Reader)

UI with ISO 7816 card
![charta](screenshots/mainscreenshot.png)

UI with Memory Card
![charta](screenshots/mainscreenshot-memorycard.png)

### Binary releases
https://github.com/lewixlabs/Charta/releases/latest

### Build from source code

#### Prerequisites (*linux only*)

    apt install libpcsclite1 libpcsclite-dev

#### Build
    git clone https://github.com/lewixlabs/Charta.git

    cd charta

    yarn

#### Run
    yarn start

