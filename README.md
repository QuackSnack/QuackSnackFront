# Description

This project contains the frontend of a web-application called **QuickSnack** *(for a quick snack)* that propose the typical services of any food chain. This project and the web-application is made purely as an educationnal purpose.

Click here to see the [backend](https://github.com/GregoryHue/QuackSnackBack).

# Setup

This setup was made on a Debian 11 distro, using the Windows 11 WSL. The project is placed in `/home/user/dev/QuickSnackFront`.

***WARNING : It is highly recommended to set this up on an empty distribution as it may mess with your current packages, libraries and database system.***

## By using a shell 

To facilitate the setup and project management, the same shell is proposed in both projects. Use this command to create a folder, pull the project inside of it, then make a quick install with the shell :

```bash
cd && \
mkdir dev && \
cd dev && \
git clone git@github.com:GregoryHue/QuackSnackFront.git && \
cd QuackSnackFront && \
source qs-shell.sh; qs-quick-install
```

This will install the shell in your `~/.bashrc` file. If you wish to remove the shell, use this command from any folder :

```
qs-remove
```

You may need to relog into your session so that it takes effect.

## By installing dependencies manually

Update your packages :

```
sudo apt update && sudo apt upgrade
```

Install all the dependencies :

```
sudo apt install nodejs npm 
```

Versions :
* Node 16.16.0
* Npm 8.11.0
* Python 3.8.10
* PostgreSQL 12.11
* React 18.2.0

## Structure

The structure of the project needs to respect the following :

```
main/
    subfolders/
    subfiles.ext
.gitignore
LICENSE
README.md
qs-shell.sh
```

