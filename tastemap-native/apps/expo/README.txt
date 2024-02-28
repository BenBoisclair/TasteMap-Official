---- Fix Expo Error ----
ExpoImage requires a higher version of minimum deployment target than 13.4 (IOS version).
To fix this you need run preinstall locally then edit the deployment target to one of the compatible version.
After running prebuild, edit ios/Podfile and ios/tastemap.xcodeproj/proj.pbxproj to set minimum ios deployment target to 13.4.

Note: minimum deployment target set under Expo's app.json won't be respected. (prob a bug)
