[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/1Zvp0ubu)
# Group assignment 01 - WebGL demo

## Task
The task is to implement a small WebGL program that renders a 3D scene that includes some loaded (or procedurally generated) 3D models that are animated.

The implementation has to be done in teams and will be presented in class (exactly 10 minutes).

The code needs to be committed (pushed) into this Github classroom repository. It will be rendered on the teachers laptop (no CUDA, Win11, Firefox or Chrome or Edge).

The code needs to be explained in a short readme.

## Rating
The rating will be as follows:
- presentation and idea: 30 % 
- arts and/or math: 30 %
- code quality: 40 %

## Hints
In order to load a 3D model, [three.js](https://threejs.org) can be used. Follow the [installation instructions](https://threejs.org/docs/#manual/en/introduction/Installation) and create your own scene. Get inspired by the [examples](https://threejs.org/examples/), but come up with your own ideas and models. Use [some control method from three.js](https://threejs.org/examples/?q=controls) in order to make the scene explorable by the user. Note that the animation shall not be stored in the 3D model file, but needs to be defined by transformations in the WebGL JavaScript code. You can combine results and ideas from your individual assignment-shader project.

# Description of our Work
We started with setting up the basic document by importing three.js into the document and created the basic components like the scene, camera, etc. </br>
We created a custom sticker for the cans and loaded them into the scene as an gltf-file and created a sphere for the sun. </br>
For the background we chose a galaxy-themed image (JPEG) and converted it into a .hdr file. </br>
The Sun shader uses a layered noise function combined with a Fresnel function to achieve the effect of a burning sun. </br>
The cans have a material to let them shine metallic.
The cans are animated with rotations, creating a floating effect.

In order to view the project it has to be either downloaded from github as a zip-Folder, then unzipping it on the computer and opening the folder in vscode or cloning the repository into a local folder.
After that the file index.html needs to be opened with the LiveServer Extension to view it in the browser.
