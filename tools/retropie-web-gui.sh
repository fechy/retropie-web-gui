#!/bin/sh

### BEGIN INIT INFO
# Provides:          retropie-web
# Required-Start:    $local_fs
# Required-Stop:     $local_fs
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: retropie-web
### END INIT INFO

DAEMON_PATH="/home/pi/web/retropie-web-gui"
DAEMON=pm2
NAME="retropie-web"

case "$1" in
start)
        printf "%-50s" "Starting $NAME...\n"
        sudo pm2 start $DAEMON_PATH/server.js -s -f --name="$NAME" -l /var/logs/$NAME.log -- --release
;;

status)
        printf "%-50s" "Checking $NAME...\n"
        sudo pm2 status $NAME
;;

stop)
        printf "%-50s" "Stopping $NAME\n"
        sudo pm2 stop -s $NAME
;;

restart)
        printf "%-50s" "Restarting $NAME\n"
        sudo pm2 restart -m $NAME
;;

*)
        echo "Usage: $0 {status|start|stop|restart}\n"
        exit 1
esac
