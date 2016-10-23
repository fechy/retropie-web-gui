#!/usr/bin/env bash

INSTALL_PATH="/home/pi/web/retropie-web-gui"
INIT_SCRIPT="retropie-web-gui.sh"

# Checks if we are running this script with the right user
function is_right_user {
  USR="$(whoami)";
  if [ "$USR" = 'root' ];
  then
    echo "Please don't run this command as root";
    exit 0;
  fi
}

# Checks if there is already a version of Node installed
function is_node_available {
  type "node" &> /dev/null
}

# Checks if there is already a version of Yarn installed
function is_yarn_available {
  type "yarn" &> /dev/null
}

# Checks if there is already a version of pm2 installed
function is_pm2_available {
  type "pm2" &> /dev/null
}

# Installs Nodejs
# - Without node this project wouldn't exist :)
function install_node {
  if [ is_node_available ];
  then
    echo 'Node already installed. Skipping.'
  else
    echo "Installing Node..";
    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
  fi
}

# Installs YARN
# - This is the package manager (@see https://yarnpkg.com)
function install_yarn {
  if [ is_yarn_available ];
  then
    echo 'Yarn already installed. Skipping.'
  else
    echo 'Installing Yarn...'
    sudo npm install -g yarn
  fi
}

# Installs pm2
# - This is needed for daemonising the node server (@see https://github.com/Unitech/pm2)
function install_pm2 {
  if [ is_pm2_available ];
  then
    echo "pm2 already installed. Skipping"
  else
    echo "Installing pm2 (needs root access)"
    sudo npm install pm2 -g --no-optional
    if [ $? -ne 0 ];
    then
      echo "Error installing pm2"
      exit 0
    fi

    echo "pm2 installed"
  fi
}

# Prepares the environment with all needed programs (node, npm, yarn, pm2)
function run_prepare_env {
  echo 'Preparing the environment...';

  # Check if the directory exists, if not, then create it
  if [[ ! -d $INSTALL_PATH ]];
  then
    echo "Creating directory...";
    EXEC="$(mkdir -p $INSTALL_PATH 2> /dev/null)"
    if [[ ! -d $INSTALL_PATH ]];
    then
      echo "Error creating folder: $EXEC"
      exit 0
    fi
  fi

  cd $INSTALL_PATH;
  install_node;
  install_yarn;
  install_pm2
}

# Gets the latest release from Gitbuh repo
function run_get_release {
  echo 'Downloading latest release';
  # Get latest release url
  LATEST="$(curl -s https://api.github.com/repos/fechy/retropie-web-gui/releases/latest | grep 'browser_' | cut -d\" -f4)"
  if [ "$LATEST" -eq "" ];
  then
    echo "Cannot find latest release"
    exit 0
  fi

  # Download release and unzip it
  curl -LOk $LATEST;
  mv release.zip $INSTALL_PATH/release.zip;
  cd $INSTALL_PATH;
  unzip -o $INSTALL_PATH/release.zip -d $INSTALL_PATH/;
  rm -f $INSTALL_PATH/release.zip;

  if [ $? -ne 0 ];
  then
    echo "$@"
    echo "Something went wrong unzipping the release..."
    exit 0
  fi

  echo "Release downloaded and unzipped."
}

# Runs YARN to install all necessary files
function run_prepare_server {
  cd $INSTALL_PATH;
  yarn --prod;
  if [ $? -ne 0 ];
  then
    echo "Something went wrong running Yarn. Please check the output and re-try";
    exit 0
  fi
}

# Start a new retropie-web server
function run_start_server {
  sudo pm2 start server.js -f --name="retropie-web" -- --release > /dev/null;
  if [ $? -ne 0 ]
  then
    echo "Something went wrong starting the server. Check the output and try again"
    exit 0
  fi

  IP="$(ip route get 1 | awk '{print $NF;exit}')";
  echo "All done. To stop this server just run: pm2 stop retropie-web"
  echo "The server is available at: http://$IP:3000"
}

# Sets the init script
function set_init_script() {
  echo "Copying start up script"
  curl -LOk https://raw.githubusercontent.com/fechy/retropie-web-gui/development/tools/retropie-web-gui.sh;
  sudo cp $INIT_SCRIPT /etc/init.d/;
  sudo chmod +x /etc/init.d/$INIT_SCRIPT;
  sudo update-rc.d $INIT_SCRIPT defaults;
  rm -f $INIT_SCRIPT
}

# Stop any running server
function stop_running_servers {
  if [ is_pm2_available ];
  then
    pm2 stop retropie-web > /dev/null;
  fi
}

# Run all tasks
function run {
  is_right_user;
  #stop_running_servers;
  #run_prepare_env;
  #run_get_release;
  #run_prepare_server;
  #run_start_server;
  #set_init_script
}

run;
