
# fd-shell begin

#!/bin/bash

RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

function fd-front() {
    if [ -n "$1" ] && [ "$1" == "build" ]; then
        printf  "${CYAN}building frontend${NC}\n"
        npm run --prefix $HOME/dev/FoodDistributionFront/front/ build
    elif [ -n "$1" ] && [ "$1" == "start" ]; then
        printf  "${CYAN}starting frontend${NC}\n"
        npm run --prefix $HOME/dev/FoodDistributionFront/front/ serve
    else
        printf  "${CYAN}start / build${NC}\n"
    fi
}

function fd-back() {
    if [ -n "$1" ] && [ "$1" == "start" ]; then
        printf  "${CYAN}starting backend${NC}\n"
        python3 $HOME/dev/FoodDistributionBack/back/manage.py runserver
    elif [ -n "$1" ] && [ "$1" == "migrate" ]; then
        printf  "${CYAN}migrating backend${NC}\n"
        python3 $HOME/dev/FoodDistributionBack/back/manage.py makemigrations
        python3 $HOME/dev/FoodDistributionBack/back/manage.py migrate
    else
        printf  "${CYAN}start / migrate${NC}\n"
    fi
}

function fd-database() {
    declare DATABASE_NAME="fd_database"

    if [ -n "$1" ] && [ "$1" == "create" ]; then
        printf  "${CYAN}creating database${NC}\n"
        sudo apt-get update
        sudo service postgresql restart
        sudo -u postgres createdb $DATABASE_NAME -e
        sudo -u postgres psql -d $DATABASE_NAME -c "create user fd_user with encrypted password 'fd_password';"
        sudo -u postgres psql -d $DATABASE_NAME -c "grant all privileges on database $DATABASE_NAME to fd_user;"
    elif [ -n "$1" ] && [ "$1" == "drop" ]; then
        printf  "${CYAN}dropping database & user${NC}\n"
        sudo -u postgres psql -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DATABASE_NAME';"
        sudo -u postgres dropdb $DATABASE_NAME -e
        sudo -u postgres dropuser fd_user -e
    else
        printf  "${CYAN}create / drop${NC}\n"
    fi
}

function fd-projects() {
    sudo apt update
    sudo apt upgrade
    sudo apt install python3 python3-pip postgresql postgresql-contrib libpq-dev psycopg2 nodejs npm dbus-x11 gnome-terminal
    sudo service postgresql restart
    sudo python3 -m pip install Django
    sudo npm update -g npm
    sudo npm install -g @vue/cli
    sudo npm install -g n
    sudo n stable
    mkdir -p $HOME/dev
    cd $HOME/dev
    if [ -n "$1" ] && [ "$1" == "front" ]; then
        printf  "${CYAN}pulling front${NC}\n"
        git clone git@github.com:GregoryHue/FoodDistributionFront.git
    elif [ -n "$1" ] && [ "$1" == "back" ]; then
        printf  "${CYAN}pulling back${NC}\n"
        git clone git@github.com:GregoryHue/FoodDistributionBack.git
    elif [ -n "$1" ] && [ "$1" == "both" ]; then
        printf  "${CYAN}pulling front and back${NC}\n"
        git clone git@github.com:GregoryHue/FoodDistributionFront.git
        git clone git@github.com:GregoryHue/FoodDistributionBack.git
        cd FoodDistributionFront/front
        npm install
    else
        printf  "${CYAN}front / back / both${NC}\n"
    fi
}

function fd-remove() {
    if grep -Fxq "# fd-shell begin" ~/.bashrc
    then
        printf  "${CYAN}removing fd-shell${NC}\n"
        sed -i '/^# fd-shell begin/,/^# fd-shell end/{/^# fd-shell begin/!{/^# fd-shell end/!d}}' ~/.bashrc
        sed -i '/^# fd-shell begin/d' ~/.bashrc
        sed -i '/^# fd-shell end/d'  ~/.bashrc
    else
        printf  "${RED}fd-shell is not installed${NC}\n"
    fi 
}

function fd-install() {
    if grep -Fxq "# fd-shell begin" ~/.bashrc
    then
        printf  "${RED}fd-shell is already installed${NC}\n"
        fd-remove
        printf  "${CYAN}re-installing fd-shell${NC}\n"
        cat ./fd-shell.sh >> ~/.bashrc
    else
        printf  "${CYAN}installing fd-shell${NC}\n"
        cat ./fd-shell.sh >> ~/.bashrc
    fi 
}

# fd-shell end