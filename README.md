# RetroPie Web GUI
The main goal of this project is to supply yet another way of managing emulators files on the Retropie.
So far there are a couple of options when you have to handle the files, between them FTP and SSH are the most common.
This methods can be far less intuitive and impossible for the less experienced.

Therefore this project!

This project is set to provide a web interface where the user can manage the systems files, add and remove, and perform
simple task like checking for duplicates or invalid files.

## Getting the server
SSH into the Pi (https://www.raspberrypi.org/documentation/remote-access/ssh/).
On the root directory and as user `pi` (If not sure run `whoami`, it should output `pi`) run the following command:
````
wget -qO- https://raw.githubusercontent.com/fechy/retropie-web-gui/master/tools/install.sh | bash
````
This will run all necessary tasks to set up the server. Follow the output for important messages.
Once its finished, it will output the URL you have to visit to have access to the server, it should be of the fashion:
````
http://192.168.0.100:3000
````
The URL is basically the IP address of the PI and the port 3000 where Node is publishing the server.

## Working with and from the code
In the case that you want to collaborate or simply work in the project from the code, follow these instructions:
~~~~
NOTE: Experience in NodeJS, ReactJS and ES6 is needed
~~~~

## Setting up the environment
Since this is a node application, we are going to need to install Nodejs in our Raspberry Pi.
To do so, follow this simple steps:
````
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
````

Make sure you have at least the v6.7.0 Node version:
````
node --version
````

And also at least the NPM version 3.10.3:
````
npm --version
````

At last, although not necessary, this project uses YARN (https://yarnpkg.com), if you feel like using it instead of NPM, then do:
````
npm install -g yarn
````

## Installing and running
Now you need the server, so:
- Download the release and unzip it inside `/home/pi/web/retropie-webui`
- Navigate to `/home/pi/web/retropie-webui/config/` and open `retropie.json`. This file contains the path to retropie directory. If you have the original installation of RetroPie and you haven't modify the path, then you should be already set.
- Then from the `/home/pi/web/retropie-webui/` directory run one of this commands:
````
npm run start --release
````
Or if you have YARN:
````
yarn start --release
````

This will set up the server. Now to test it, from your computer (That should be connected to the same network than the RPi), 
go to the ip of the pi and the port 3000. For example:
````
http://192.168.1.100:3000
````

If you see the GUI then you are set.

## Whats missing (for now)
* [x] Set to run the server automatically on start
* [ ] Support file renaming
* [ ] Support for manage splash screens
* [ ] Support for sub directories
* [ ] Support for Systems with multiple directories (Like Mame)
* [ ] Support for moving/copying files

## Donating
This is a "only to help and learn" project. If you wan't to support the project, consider donating to RetroPie (https://retropie.org.uk/donate/)

## Open Source
* **React**: This project was build all using ReactJS framework.
* **React Starter Kit:** This project has created using Kriasoft's React Starter Kit (https://github.com/kriasoft/react-starter-kit) as a base.
