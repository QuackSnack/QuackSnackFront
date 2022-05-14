# fd-shell begin

RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

declare DATABASE_HOST="localhost"

declare DATABASE_PORT="5432"

declare DATABASE_NAME="fd_database"

declare DATABASE_USER="fd_user"
    
declare DATABASE_PASSWORD="fd_password"
    
function fd-front() {
    cd
    cd dev/FoodDistributionFront/front
    npm run dev
}    

function fd-back() {
    cd
    cd dev/FoodDistributionBack/back
    python3 manage.py runserver
}

function fd-pass() {
    printf  "${CYAN}configuring database${NC}\n"
    sudo sed -i 's/peer/trust/g' /etc/postgresql/*/main/pg_hba.conf
    sudo sed -i 's/md5/trust/g' /etc/postgresql/*/main/pg_hba.conf
    sudo service postgresql restart
    psql -U postgres -d template1 -c "ALTER USER postgres PASSWORD '$DATABASE_PASSWORD';" 
    sudo printf "$DATABASE_HOST:$DATABASE_PORT:$DATABASE_NAME:$DATABASE_USER:$DATABASE_PASSWORD" > ~/.pgpass
    sudo chmod 0600 ~/.pgpass
    sudo sed -i 's/trust/md5/g' /etc/postgresql/*/main/pg_hba.conf
    sudo service postgresql restart
}

function fd-database() {

    if [ -n "$1" ] && [ "$1" == "create" ]; then
        printf  "${CYAN}creating database${NC}\n"
        sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD createdb $DATABASE_NAME
        printf  "${CYAN}adding user${NC}\n"
        sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD psql -d $DATABASE_NAME -c "create user $DATABASE_USER with encrypted password '$DATABASE_PASSWORD';"
        sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD psql -d $DATABASE_NAME -c "grant all privileges on database $DATABASE_NAME to $DATABASE_USER;"
    elif [ -n "$1" ] && [ "$1" == "drop" ]; then
        printf  "${CYAN}dropping database & user${NC}\n"
        sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD psql -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DATABASE_NAME';"
        sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD dropdb $DATABASE_NAME -e
        sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD dropuser fd_user -e
    else
        printf  "${CYAN}create / drop${NC}\n"
    fi
}

function fd-libs() {
    printf  "${CYAN}installing packages and libraries${NC}\n"
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt install -y python3 python3-pip postgresql postgresql-contrib libpq-dev nodejs npm
    sudo service postgresql restart
    sudo python3 -m pip install psycopg2
    sudo python3 -m pip install django
    sudo npm update -g npm
    sudo npm install -g n
    sudo n stable
}

function fd-remove() {
    if grep -Fxq "source ~/.fd-bashrc" ~/.bashrc
    then
        printf  "${CYAN}removing fd-shell${NC}\n"
        rm ~/.fd-bashrc
        sed -i '/^source ~\/\.fd-bashrc/d'  ~/.bashrc
    else
        printf  "${RED}fd-shell is not installed${NC}\n"
    fi 
}

function fd-projects() {
    mkdir -p $HOME/dev
    cd $HOME/dev
    git clone https://gitlab.com/GregoryHue/FoodDistributionBack.git
    cd FoodDistributionBack/back
    python3 manage.py makemigrations && python3 manage.py migrate
    git clone https://gitlab.com/GregoryHue/FoodDistributionFront.git
    cd FoodDistributionFront/front
    npm install
}

function fd-install() {
    if grep -Fxq "source ~/.fd-bashrc" ~/.bashrc
    then
        printf  "${RED}fd-shell is already installed${NC}\n"
        fd-remove
        printf  "${CYAN}re-installing fd-shell${NC}\n"
        cat ./fd-shell.sh >> ~/.fd-bashrc
        printf  "\nsource ~/.fd-bashrc" >> ~/.bashrc
    else
        printf  "${CYAN}installing fd-shell${NC}\n"
        cat ./fd-shell.sh >> ~/.fd-bashrc
        printf  "\nsource ~/.fd-bashrc" >> ~/.bashrc
    fi 
}

function fd-quick-install() {
    printf  "${CYAN}making a quick install${NC}\n"
    fd-install
    fd-libs
    fd-projects
    fd-pass
    fd-database "create"
    printf  "${CYAN}run \"fd-front\" to start the frontend\nrun \"fd-back\" to start the backend${NC}\n"
}