# Description

<p align="center">
  <img src="https://github.com/QuackSnack/QuackSnackFront/blob/main/front/src/assets/logo/QuackLogo_Dark.png?raw=true" alt="Quack Snack Logo"/>
</p>

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
* `qs-packages` : Install the global packages required to run both projects (Python, PostgreSQL, npm, Node, etc ...).
* `qs-libs` : Install the local libraries required to run both projects (Python, PostgreSQL, Node, etc ...).
* `qs-pass` : Change the superuser's password of the PostgreSQL database (node_modules for React and env for Python).
* `qs-database-create` : Create the database and its user.
* `qs-database-drop` : Delete the database and its user.
* `qs-projects` : Clone both projects.
* `qs-pull-dev` : Pull the modifications from the dev branch for both projects.
* `qs-push-dev` : Push the modifications to the dev branch for both projects.
* `qs-merge-main` : Merge the main branch into the dv branch for both projects.
* `qs-superuser` : Create a superuser for Django admin.
* `qs-venv` : Turn on/off the backend's environment.
* `qs-front` : Start the frontend application.
* `qs-back` : Start the backend application.

* `qs-quick-install` : Install everything required to run both projects. Executes in this order:  `qs-projects`, `qs-install`, `qs-packages`, `qs-pass`, `qs-database-create`, `qs-superuser` and `qs-libs`.

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

## TODO

```
Frontend
  Language swapping
  Theme swapping
  Restaurant interface
  Redirect users not logged in

Backend
  Restaurant logic
  Django authentification
```

