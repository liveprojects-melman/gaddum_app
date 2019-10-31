# Gaddum Mood Music
## This is an Ionic V1 App

To install a development system, check out our how-to, [here](https://github.com/AliceDigitalLabs/Supporting_LiveProjects_2019/wiki/Ionic-and-Cordova-on-Win-10)

## Here's a rough guide to what we'll be doing:

**Goal:** Building and debugging [LittleList](https://github.com/AliceDigitalLabs/little_list) using an Android device and VisualStudio Code

### Installations
We'll go through the process of setting up your development system, whether it's a mac or a pc.

1. Github Desktop
2. MS Visual Studio Code
3. JDK
4. Android Studio
6. Node and Npm
7. Ionic and Cordova

We're very dependent on download speeds and the state of everyone's machines, so we're going to define a rough order of things, and give you support as you work through them.

If you have already installed your development environment, now is a really good time to get some positive karma; come and help your teams get through the pain!

We'll work with a Trello board on the big monitors, so we can jot down common problems and - hopefully - their solutions.

### Windows 10?
Find to How-To, right [here](https://github.com/AliceDigitalLabs/SupportingLiveProjects_2018/wiki/Ionic-and-Cordova-on-Win-10)  

### Mac?
There is a supplemental for Mac users, [here](https://github.com/AliceDigitalLabs/Supporting_LiveProjects_2019/wiki/Ionic-and-Cordova-on-Win-10:-Mac-Supplemental)

### Building

ionic cordova platform add android@6.3.0

ionic cordova run android


### Notes

1. gulpfile.js is missing. Download from https://github.com/ionic-team/ionic-app-base/blob/master/gulpfile.js place the gulpfile.js in the top level of the ionic project

2. Install cordova

```
npm install -g cordova
```

3. Install ionic
```
npm install -g ionic@3.20.0
```  

Note: The latest version (4.3) of the Ionic CLI contains a breaking change. Make sure you use the above version: 3.20.0


* check your installation:

For ionic:  

```
ionic -v
```

For cordova: 
```
cordova -v
```

When you can successfully run ionic, you're on to trying a build!  

* Add the android platform to your project.
 * in the top-level of the project (where you can see config.xml) use the following command:

```
ionic cordova platform add android@6.3.0
```

* Adding the platform should go OK.


* Check you have a gulpfile.js in the top level of your project. If not, download it from https://github.com/ionic-team/ionic-app-base/blob/master/gulpfile.js  

* Check that you have Gradle installed.
```
gradle -v
```
We're running version 4.10

* If Gradle is not installed, go to https://gradle.org/install/
 * Download the zip file. DON'T use a package manager!
 * Create a folder in which to put Gradle: 
 * Extract the contents of the .zip file to the folder.
 * You now need to add the location of the Gradle binaries to your PATH environmnent variable:
 
 For example:
 ```
 C:\Gradle\gradle-4.10.2\bin
 ```

* you will need to add the ionic v1 toolkit  package to the ionic CLI:
(little_list is an ionic v1 project (yes, we're still using ionic v1 and angularjs. BECAUSE.))

```
npm i -D @ionic/v1-toolkit
```


* Now you're ready to try a build:

```
ionic cordova build android
```

This should create an android .apk file for you. in .\platforms\android\app\build\outputs\apk\debug

* Android Studio is installed, but you will need to put the tools in your PATH before you can deploy to a phone.

```
C:\AndroidSDK\platform-tools
```

* connect up your android phone to your PC, using a USB cable. Make sure the device is ready to accept your deployed app:
 * You will need to do that special ['thing'](https://www.digitaltrends.com/mobile/how-to-get-developer-options-on-android/) to get 'Developer Options' available.
 * In developer options, enable USB debugging.
* check that your device is available
```
adb devices
```

* you should see an entry for your device.



* Now give it a try:


```
ionic cordova run android
```

* Hey, presto! We're on your device.


















