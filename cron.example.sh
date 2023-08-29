SCRIPT_NAME='index.js';
RUN=$(pgrep -f "$SCRIPT_NAME")

if [ "$RUN" == "" ]; then
 cd "$HOME/path_to_root_dir" || exit
 node "$SCRIPT_NAME"
else
 echo "Script is running"
fi

