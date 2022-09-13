# qs-shell begin

RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

declare DATABASE_HOST="localhost"
declare DATABASE_PORT="5432"
declare DATABASE_NAME="qs_database"
declare DATABASE_USER="qs_user"
declare DATABASE_PASSWORD="qs_password"

declare DJANGO_SUPERUSER_EMAIL="quacksnack@quack.snack"
declare DJANGO_SUPERUSER_PASSWORD='qs_admin_password'
declare DJANGO_SUPERUSER_USERNAME='qs_admin'

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

# Turn on/off the backend's environment
function qs-venv() {
  if [[ -z "$VIRTUAL_ENV" ]]; then
    printf "${CYAN}Activating virtual env${NC}\n"
    cd $HOME/dev/QuackSnackBack/back && source env/bin/activate
  else
    printf "${CYAN}Deactivating virtual env${NC}\n"
    deactivate && cd $HOME/dev/QuackSnackBack/back
  fi
}

# Set a superuser for Django admin
function qs-superuser() {
  printf "${CYAN}Creating superuser for Django${NC}\n"
  export DJANGO_SUPERUSER_USERNAME
  export DJANGO_SUPERUSER_PASSWORD
  export DJANGO_SUPERUSER_EMAIL
  (cd $HOME/dev/QuackSnackBack/back && source env/bin/activate && ./manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL)
}

# Pull the changes of both projects
function qs-pull-dev() {
  (
    cd $HOME/dev/QuackSnackFront
    if [[ $(git rev-parse --abbrev-ref HEAD) == "dev" ]]; then
      printf "${CYAN}Pulling QuackSnackFront dev${NC}\n"
      cd $HOME/dev/QuackSnackFront && git pull
    else
      printf "${RED}Not on dev branch${NC}\n"
    fi
  )

  (
    cd $HOME/dev/QuackSnackBack
    if [[ $(git rev-parse --abbrev-ref HEAD) == "dev" ]]; then
      printf "${CYAN}Pulling QuackSnackBack dev${NC}\n"
      cd $HOME/dev/QuackSnackBack && git pull
    else
      printf "${RED}Not on dev branch${NC}\n"
    fi
  )
}

# Push the changes of both projects
function qs-push-dev() {
  (
    cd $HOME/dev/QuackSnackFront
    if [[ $(git rev-parse --abbrev-ref HEAD) == "dev" ]]; then
      printf "${CYAN}Pushing to QuackSnackFront dev${NC}\n"
      cd $HOME/dev/QuackSnackFront && git add . && git commit -m "Push: $(date +'%d-%m-%Y %H:%M:%S')" && git push
    else
      printf "${RED}Not on dev branch${NC}\n"
    fi
  )

  (
    cd $HOME/dev/QuackSnackBack
    if [[ $(git rev-parse --abbrev-ref HEAD) == "dev" ]]; then
      printf "${CYAN}Pushing to QuackSnackBack dev${NC}\n"
      cd $HOME/dev/QuackSnackBack && git add . && git commit -m "Push: $(date +'%d-%m-%Y %H:%M:%S')" && git push
    else
      printf "${RED}Not on dev branch${NC}\n"
    fi
  )
}

# Update the main branch of both projects based on the dev
function qs-merge-main() {
  (
    cd $HOME/dev/QuackSnackBack && git checkout main
    if [[ $(git rev-parse --abbrev-ref HEAD) == "main" ]]; then
      printf "${CYAN}Merging QuackSnackBack dev into main${NC}\n"
      git pull origin main && git merge dev && git push
      printf "${CYAN}Pulling QuackSnackBack dev${NC}\n"
      git checkout dev && git pull origin main && git push
    fi
  )

  (
    cd $HOME/dev/QuackSnackFront && git checkout main
    if [[ $(git rev-parse --abbrev-ref HEAD) == "main" ]]; then
      printf "${CYAN}Merging QuackSnackFront dev into main${NC}\n"
      git pull origin main && git merge dev && git push
      printf "${CYAN}Pulling QuackSnackFront dev${NC}\n"
      git checkout dev && git pull origin main && git push
    fi
  )
}

# Change the password of the database superuser
function qs-pass() {
  printf "${CYAN}Configuring database${NC}\n"
  (
    sudo sed -i 's/peer/trust/g' /etc/postgresql/*/main/pg_hba.conf
    sudo sed -i 's/md5/trust/g' /etc/postgresql/*/main/pg_hba.conf
    sudo service postgresql restart
    psql -U postgres -d template1 -c "ALTER USER postgres PASSWORD '$DATABASE_PASSWORD';"
    sudo printf "$DATABASE_HOST:$DATABASE_PORT:$DATABASE_NAME:$DATABASE_USER:$DATABASE_PASSWORD" >~/.pgpass
    sudo chmod 0600 ~/.pgpass
    sudo sed -i 's/trust/md5/g' /etc/postgresql/*/main/pg_hba.conf
    sudo service postgresql restart
  )
}

# Create or drop the qs dabatase
function qs-database-create() {
  printf "${CYAN}Creating database${NC}\n"
  (sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD createdb $DATABASE_NAME)
  printf "${CYAN}Adding user${NC}\n"
  (
    sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD psql -d $DATABASE_NAME -c "create user $DATABASE_USER with encrypted password '$DATABASE_PASSWORD';"
    sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD psql -d $DATABASE_NAME -c "grant all privileges on database $DATABASE_NAME to $DATABASE_USER;"
  )
}

# Create or drop the qs dabatase
function qs-database-drop() {
  printf "${CYAN}Dropping database & user${NC}\n"
  (
    sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD psql -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DATABASE_NAME';"
    sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD dropdb $DATABASE_NAME -e
    sudo -u postgres PGPASSWORD=$DATABASE_PASSWORD dropuser qs_user -e
  )
}

# Installs the global packages
function qs-packages() {
  printf "${CYAN}Installing packages and libraries${NC}\n"
  (
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt install -y python3 python3-pip python3-venv postgresql postgresql-contrib libpq-dev nodejs npm
    sudo service postgresql start
    sudo npm install -g n
    sudo n stable
    sudo n prune
    sudo npm install -g npm@latest
  )
}

# Installs the local libraries for the frontend
function qs-libs-front() {
  printf "${CYAN}Installing frontend libraries${NC}\n"
  (cd $HOME/dev/QuackSnackFront/front && npm install)
}

# Installs the local libraries for the backend
function qs-libs-back() {
  printf "${CYAN}Installing backend libraries${NC}\n"
  (qs-venv && source env/bin/activate && pip install -r requirements.txt && qs-venv)
}

# Make migrations in the database
function qs-migrate() {
  printf "${CYAN}Making migrations${NC}\n"
  (qs-venv && python3 manage.py makemigrations qs && python3 manage.py migrate && qs-venv)
}

# Load base data in the database
function qs-load-data() {
  printf "${CYAN}Loadding data${NC}\n"
  (qs-venv && python3 manage.py loaddata data.json && qs-venv)
}

# Remove the qs shell
function qs-remove() {
  if [ -f $HOME/.qs-bashrc ]; then
    printf "${CYAN}Removing qs-shell${NC}\n"
    rm $HOME/.qs-bashrc
    sed ':a;N;$!ba;s/\n# qs-shell installed\nsource ~\/\.qs-bashrc//g' ~/.bashrc -i
  else
    printf "${RED}Qs-shell is not installed${NC}\n"
  fi
}

# Pulls the projects
function qs-projects() {
  mkdir -p $HOME/dev
  (
    cd $HOME/dev && git clone git@github.com:QuackSnack/QuackSnackBack.git
    cd $HOME/dev && git clone git@github.com:QuackSnack/QuackSnackFront.git
  )
}

# Installs the qs shell
function qs-install() {
  if [ -f $HOME/.qs-bashrc ]; then
    printf "${RED}Qs-shell is already installed${NC}\n"
    qs-remove
    printf "${CYAN}Re-installing qs-shell${NC}\n"
    if [ -f $HOME/dev/QuackSnackBack/qs-shell.sh ]; then
      cat $HOME/dev/QuackSnackBack/qs-shell.sh >~/.qs-bashrc
    elif [ -f $HOME/dev/QuackSnackFront/qs-shell.sh ]; then
      cat $HOME/dev/QuackSnackFront/qs-shell.sh >~/.qs-bashrc
    else
      printf "${RED}file qs-shell.sh couldn't be found${NC}\n"
    fi
    printf "\n# qs-shell installed\nsource ~/.qs-bashrc" >>~/.bashrc
  else
    printf "${CYAN}Installing qs-shell${NC}\n"
    cat $HOME/dev/QuackSnackBack/qs-shell.sh >~/.qs-bashrc
    printf "\n# qs-shell installed\nsource ~/.qs-bashrc" >>~/.bashrc
  fi
}

# Installs all the requirements
function qs-quick-install() {
  printf "${CYAN}Making a quick install${NC}\n"
  (
    qs-projects
    qs-install
    qs-packages
    qs-pass
    qs-database-create
    qs-superuser
    qs-libs-front
    qs-libs-back
    qs-migrate
  )
  printf "${CYAN}\n\n\nRun \"qs-front\" to start the frontend\nor\nRun \"qs-back\" to start the backend${NC}\n"
}

# qs-shell end
