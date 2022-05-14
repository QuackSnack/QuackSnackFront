# Description

This project contains the frontend of a web-application called **FoodDistribution** that propose the typical services of any food chain. This project and the web-application is made purely as an educationnal purpose.

Click here to see the [backend](https://github.com/GregoryHue/FoodDistributionBack).


# Setup

This setup was made on a Debian 11 distro, using the Windows 11 WSL. The project is placed in `/home/user/dev/FoodDistributionFront`.

## By using a shell

To facilitate the setup and project management, the same shell is proposed in both projects. Use this command to create a folder, pull the project inside of it, then make a quick install with the shell :

```bash
cd && && mkdir dev && cd dev && git clone https://gitlab.com/GregoryHue/FoodDistributionBack.git && cd FoodDistributionFront && source fd-shell.sh; fd-quick-install
```

This will install the shell in your `~/.bashrc` file. The shell includes the following commands :

* `fd-install` : install the shell in `~/.bashrc`.
* `fd-remove` : remove the shell in `~/.bashrc`.
* `fd-projects` : pull every projects.

If you wish to remove the shell, use this command from any folder :

```
fd-remove
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
* Nodejs v12.22.5
* Npm 7.5.2

## Structure

The structure of the project needs to respect the following :

```
main/
    subfolders/
    subfiles.ext
.gitignore
LICENSE
LICENSE.md
fd-shell.sh
```
