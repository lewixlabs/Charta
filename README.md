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

### Binary release
For Windows 10 you can install official app

<a href='//www.microsoft.com/store/apps/9P6LFW09T9JC?cid=storebadge&ocid=badge'><img src='https://assets.windowsphone.com/85864462-9c82-451e-9355-a3d5f874397a/English_get-it-from-MS_InvariantCulture_Default.png' alt='English badge' width='284' height='104'/></a>

[or download here for windows/macOS/linux](https://github.com/lewixlabs/Charta/releases/latest)

### Build from source code

#### Prerequisites (*linux only*)

    apt install libpcsclite1 libpcsclite-dev

#### Install dependencies and build
    git clone https://github.com/lewixlabs/Charta.git

    cd charta

    yarn

    yarn build

#### Run
    yarn start

