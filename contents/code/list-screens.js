#/usr/bin/env bash

if [ -f "/usr/bin/qdbus" ]; then
	qdbus="/usr/bin/qdbus"
elif [ -f "/usr/bin/qdbus-qt6" ]; then
	qdbus="/usr/bin/qdbus-qt6"
else
	echo "qdbus not found. Please install qdbus or qdbus-qt6."
	exit 1
fi

script="$(dirname ~/.local/share/kwin/scripts/virtual-desktops-only-on-primary/metadata.json)/contents/code/list-screens.js"
num=$($qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.loadScript $script)

$qdbus org.kde.KWin /Scripting/Script${num} org.kde.kwin.Script.run

journalctl -b QT_CATEGORY=js QT_CATEGORY=kwin_scripting -n 5 --no-pager

$qdbus org.kde.KWin /Scripting/Script${num} org.kde.kwin.Script.stop