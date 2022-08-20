# qs-shell begin

RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

declare DATABASE_HOST="localhost"

declare DATABASE_PORT="5432"

declare DATABASE_NAME="qs_database"

declare DATABASE_USER="qs_user"
    
declare DATABASE_PASSWORD="qs_password"

# Runs the frontend
function qs-front() {
    (cd $HOME/dev/QuackSnackFront/front && npm start)
}

# Runs the backend
function qs-back() {
    if service postgresql status | grep -Fq 'down'; then    
        sudo service postgresql start    
    fi
    (cd $HOME/dev/QuackSnackBack/back && source env/bin/activate && python3 manage.py runserver)
}

# Pulls the changes on every project
function qs-pull() {
    printf  "${CYAN}pulling QuackSnackBack${NC}\n"
    (cd $HOME/dev/QuackSnackBack && git status && git fetch git pull)
    printf  "${CYAN}pulling QuackSnackFront${NC}\n"
    (cd $HOME/dev/QuackSnackFront && git status git fetch git pull)
}

# Push the changes on every projects
function qs-push() {
    printf  "${CYAN}pushing to QuackSnackBack${NC}\n"
    (cd $HOME/dev/QuackSnackBack && git status && git add . && git commit -m "Updated: `date +'%d-%m-%Y %H:%M:%S'`" && git push)
    printf  "${CYAN}puhsing to QuackSnackFront${NC}\n"
    (cd $HOME/dev/QuackSnackFront && git status && git add . && git commit -m "Updated: `date +'%d-%m-%Y %H:%M:%S'`" && git push)
}

# Change the password of the database superuser 
function qs-pass() {
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

# Create or drop the qs dabatase
function qs-database() {
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
        sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD dropuser qs_user -e
    else
        printf  "${CYAN}create / drop${NC}\n"
    fi
}

# Installs all required libraries
function qs-libs() {
    printf  "${CYAN}installing packages and libraries${NC}\n"
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt install -y python3 python3-pip python3-venv postgresql postgresql-contrib libpq-dev nodejs npm
    sudo service postgresql start
    sudo npm install -g n
    sudo n stable
    sudo n prune
    sudo npm install -g npm@latest
}

# Remove the qs shell
function qs-remove() {
    if grep -Fxq "\nsource ~/.qs-bashrc" ~/.bashrc
    then
        printf  "${CYAN}removing qs-shell${NC}\n"
        rm $HOME/.qs-bashrc
        sed -i '/^\nsource ~\/\.qs-bashrc/d' ~/.bashrc
    else
        printf  "${RED}qs-shell is not installed${NC}\n"
    fi 
}

# Pulls the projects
function qs-projects() {
    mkdir -p $HOME/dev

    (cd $HOME/dev && git clone git@github.com:QuackSnack/QuackSnackBack.git)
    (cd && cd $HOME/dev/QuackSnackBack && git checkout dev && cd back/ && python3 -m venv env  && source env/bin/activate && pip install -r requirements.txt && python3 manage.py makemigrations qs && python3 manage.py migrate && python3 manage.py loaddata data.json && deactivate)
    
    (cd $HOME/dev && git clone git@github.com:QuackSnack/QuackSnackFront.git)
    (cd && cd $HOME/dev/QuackSnackFront && git checkout dev && cd front/ && npm install)
}

# Installs the qs shell
function qs-install() {
    if grep -Fxq "\nsource ~/.qs-bashrc" ~/.bashrc
    then
        printf  "${RED}qs-shell is already installed${NC}\n"
        qs-remove
        printf  "${CYAN}re-installing qs-shell${NC}\n"
        cat $HOME/dev/QuackSnackBack/qs-shell.sh > ~/.qs-bashrc
        printf  "\nsource ~/.qs-bashrc" >> ~/.bashrc
    else
        printf  "${CYAN}installing qs-shell${NC}\n"
        cat $HOME/dev/QuackSnackBack/qs-shell.sh > ~/.qs-bashrc
        printf  "\nsource ~/.qs-bashrc" >> ~/.bashrc
    fi 
}

# Installs all the requirements
function qs-quick-install() {
    printf  "${CYAN}making a quick install${NC}\n"
    qs-install
    qs-libs
    qs-pass
    qs-database "create"
    qs-projects
    printf  "${CYAN}run \"qs-front\" to start the frontend\nrun \"qs-back\" to start the backend${NC}\n"
}
