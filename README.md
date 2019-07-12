# gaddum_app
The consumer app for the gaddum project. Share music for your mood.



This repository contains the code for the Ionic + Cordova crossplatform mobile app.

The master branch holds the release code, which builds for mobile.

During development, GitHub pages is used to demo the app to the client in the browser, via the master branch / docs folder.

The mobile code contains services which are dependent on Cordova components, which are not available to the browser. 

When developing UI components, these services are replaced by dummy services which simply supply canned data. The 'real' services are commented out of the application's index.html, and replaced by references to the dummy services.

When releasing a new version, the python script setcordovaversion.py is used to correctly update the version information in the config.xml file.

When releasing a demo for distribution to GitHub Pages, the new release is copied across, to the /docs folder, replaing what is there, tested locally, and then checked in.

The demo application is then available at: <https://cmdt.github.io/gaddum_app/www/index.html>

