# Description

<p align="center">
  <img src="https://github.com/QuackSnack/QuackSnackFront/blob/main/front/src/asset/logo/QuackLogo_Dark.png?raw=true" alt="Quack Snack Logo"/>
</p>

This project contains the frontend of a web-application called **QuackSnack** *(for a quick snack)* that propose the typical services of any food chain. It is made purely as an educationnal purpose.

<p align="center">
  <img src="https://github.com/QuackSnack/QuackSnackFront/blob/main/screenshot.png?raw=true" alt="Quack Snack Screenshot"/>
</p>

Click here to see the [backend](https://github.com/QuackSnack/QuackSnackBack).

# Setup

This setup was made on a Debian 11 distro, using the Windows 11 WSL. The project is placed in `$HOME/dev/QuackSnackFront`.

***WARNING : It is highly recommended to set this up on an empty distribution as it will probably mess with your current packages, libraries and database system.***

## Shell

To facilitate the setup and project management, a shell called `qs-shell` is proposed in both projects. The first step is to create an SSH key and associate it to your GitHub profile. The following command will generate an SSH key :

```bash
ssh-keygen -t rsa -b 4096
```

The following command displays the content of your key. Copy it and add it to your [GitHub account](https://github.com/settings/keys) :

```bash
cd $HOME && cat .ssh/id_rsa.pub
```

Assuming your GitHub account has the rights to work on these projects, you should now be able to execute the following command, which installs the shell and setup both projects :

```bash
cd $HOME && \
sudo mkdir dev && \
cd dev && \
git clone git@github.com:QuackSnack/QuackSnackFront.git && \
cd QuackSnackFront && \
source qs-shell.sh; qs-quick-install
```

Here is an overview of the commands that the shell proposes :

* `qs-install` : Install the shell.
* `qs-remove` : Remove the shell.
* `qs-packages` : Install the global packages required to run both projects (Python, PostgreSQL, npm, Node, etc ...).
* `qs-libs` : Install the local libraries required to run both projects (node_modules for React and env for Python).
* `qs-pass` : Change the superuser's password of the PostgreSQL database.
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
screenshot.png
```
