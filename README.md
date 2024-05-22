# Virtual Desktops Only On Primary

This is a script that brings a feature similar to GNOME Mutter's `workspaces-only-on-primary` option, that is switchable virtual desktops on the primary monitor, and non-switchable virtual desktops on other monitors.

Functionality:
* All windows placed on monitors other than the primary, are automatically set to be shown on all virtual desktops.
* When window is moved to a primary screen, it will be assigned to a current virtual desktp.

This can be considered a hack, but from the user's perspective, this effectively results in having multiple switchable virtual desktops on the primary monitor, and fixed non-switchable virtual desktops on other monitors.
That's how GNOME Shell handles workspaces by default, and the script mimics that.

## IMPORTANT:
This script is intended for, and works best on laptops that have external monitor connected.
The script might not work well on desktops with multiple monitors due to unpredictable power management for each monitor.

For fine tuning the script provides some configuration, e.g. if you primary display is not the first one in KWin list.
In that case, in order to determine the index of you screen use the bash script that is shipped in the package:

`bash ~/.local/share/kwin/scripts/virtual-desktops-only-on-primary/list-screens.sh`

After running this script in the terminal you should see the names and the index numbers of your screens. You can then adjust the configuration accordingly.
