# Yerbas Browser Extension Wallet Provider

Source code to host a node to serve browser extension wallet requests.

### Setup VPS

1. Obtain an Ubuntu (>= 20.04) VPS with root access and a static IPv4 address.

2. **Login as the root user for steps 3 to 8.** (alternative change user to root via `sudo -i -u root` from your normal account)

3. (Read step 2 first) Setup dependencies

   ```
   sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
   curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
   sudo apt -y install nodejs gcc g++ make sqlite3
   sudo npm install --global yarn
   ```

3. (Read step 2 first) Allow only ports 22 (SSH) and 80 (HTTP) on the VPS:

   ```
   ufw reset
   ufw default deny incoming
   ufw allow 22
   ufw allow 80
   ufw enable
   ```

5. (Read step 2 first) Setup the latest Yerbas binaries and extract to `/root/yerbas`:

   ```
   mkdir /root/yerbas
   cd /root/yerbas
   wget https://github.com/The-Yerbas-Endeavor/yerbas/releases/download/v2.1.1.4/yerbas-ubuntu20-2.1.1.4.tar.gz
   tar -xf yerbas-ubuntu20-2.1.1.4.tar.gz
   chmod +x ./*
   mkdir /root/.yerbascore
   echo 'txindex=1' > /root/.yerbascore/yerbas.conf
   ```

6. (Read step 2 first) Clone and setup this repo in `/root/yerbasbewp`:

   ```
   git clone https://github.com/The-Yerbas-Endeavor/yerbasbrowserwalletprovider.git /root/yerbasbewp
   cd /root/bewp
   yarn install
   cd /root/bewp/database
   sqlite3 database.db
   .read dump.479673.sql
   (Exit sqlite3 prompt using CTRL+D)
   ```

7. (Read step 2 first) Run Yerbas daemon and wait for it to sync

   ```
   cd /root/yerbas-build
   ./yerbasd
   ./yerbas-cli getblockchaininfo        # Use this to check synced height.
   ```

 8. (Read step 2 first) Run provider daemon

    ```
    cd /root/dingobewp
    sudo yarn start
    ```
