# Description

This project contains the frontend of a web-application called **QuickSnack** *(for a quick snack)* that propose the typical services of any food chain. It is made purely as an educationnal purpose.

Click here to see the [backend](https://github.com/QuackSnack/QuackSnackBack).

# Setup

This setup was made on a Debian 11 distro, using the Windows 11 WSL. The project is placed in `/home/user/dev/QuickSnackFront`.

***WARNING : It is highly recommended to set this up on an empty distribution as it will probably mess with your current packages, libraries and database system.***

## Shell

To facilitate the setup and project management, a shell called `qs-shell` is proposed in both projects. The following commands create a folder, pull the project inside of it, then make a quick install with the shell :

```bash
cd && \
mkdir dev && \
cd dev && \
git clone git@github.com:QuackSnack/QuackSnackFront.git && \
cd QuackSnackFront && \
source qs-shell.sh; qs-quick-install
```

This will install the shell in your `~/.bashrc` file. Here is an overview of the commands that the shell proposes :

* `qs-install` : Install the shell.
* `qs-remove` : Remove the shell.
* `qs-libs` : Install the global libraries required to run both projects.
* `qs-pass` : Change the superuser's password of the PostgreSQL database.
* `qs-database [create|drop]` : Create or delete the database and its user.
* `qs-projects` : Pull both projects and install the local libraries required.
* `qs-push` : Push the modifications on both projects.
* `qs-front` : Start the frontend application.
* `qs-back` : Start the backend application.

## Versions

* Node 16.16.0
* Npm 8.11.0
* Python 3.8.10
* PostgreSQL 14.5
* React 18.2.0

## Structure

The structure of the project needs to respect the following :

```
main/
    subfolders/
    subfiles.ext
.gitignore
LICENSE
qs-shell.sh
README.md
```

