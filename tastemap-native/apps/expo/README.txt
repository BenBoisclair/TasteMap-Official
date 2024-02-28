---- Fix Expo Error ----
ExpoImage requires a higher version of minimum deployment target than 11 (IOS version).
To fix this you need run preinstall locally then edit the deployment target to one of the compatible version.
After running prebuild, edit ios/Podfile to set minimum ios deployment target to 16.7.5.

Note: minimum deployment target set under Expo's app.json won't be respected. (prob a bug)
