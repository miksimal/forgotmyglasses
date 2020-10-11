/// <reference types="aws-sdk" />

import React, { useState, ChangeEvent, } from "react";
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import Rekognition, { CreateCollectionRequest, IndexFacesRequest, SearchFacesByImageRequest } from "aws-sdk/clients/rekognition";

AWS.config.region = 'eu-west-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:4a8f8cca-1fe0-4ce5-843c-3118a21061f6',
});
const rekog: AWS.Rekognition = new AWS.Rekognition();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [collectionId, setCollectionId] = useState<string>(uuidv4());
  const [aboutToStart, setAboutToStart] = useState(true);
  const [trainingTheRobot, setTrainingTheRobot] = useState(false);
  const [robotIsReady, setRobotIsReady] = useState(false);
  const [facesInCollectionCount, setFacesInCollectionCount] = useState(0);

  async function createCollection() {
    setIsLoading(true);
    try {
      const params: CreateCollectionRequest = {
        CollectionId: collectionId
       };
      await rekog.createCollection(params).promise();
      setCollectionId(collectionId);
      setAboutToStart(false);
      setTrainingTheRobot(true);
    } catch (e) {
      console.log(e.message);
    }
  }

  function readFileAsync(file: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      let reader: FileReader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      reader.readAsArrayBuffer(file);
      // thanks https://simon-schraeder.de/posts/filereader-async/
    })
  }

  async function indexFace(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? e.target.files : [new Blob()];
    setIsLoading(true);
    try {
      const buffer = await readFileAsync(files[0]);
      if (buffer == null) throw new Error('Error reading file');

      const params: IndexFacesRequest = {
        CollectionId: collectionId,
        Image: {
          Bytes: buffer
        },
        MaxFaces: 1,
      };
      const result: Rekognition.IndexFacesResponse  = await rekog.indexFaces(params).promise();
      if (result.FaceRecords && result.FaceRecords.length === 0) {
        window.alert('Woops, no face was registered in that photo. Can you try a different one?');
      } else {
        setRobotIsReady(true);
        setFacesInCollectionCount(facesInCollectionCount + 1);
        ((document.getElementById("uploadTrainingPhoto")) as HTMLInputElement).value = "";
      }
    } catch (e) {
      console.log(e.message);
    }
    setIsLoading(false);
  }

  async function searchFace(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? e.target.files : [new Blob()];
    setIsLoading(true);
    try {
      const buffer = await readFileAsync(files[0]);
      if (buffer == null) throw new Error('Error reading file');

      const params: SearchFacesByImageRequest = {
        CollectionId: collectionId,
        Image: {
          Bytes: buffer
        },
        MaxFaces: 1,
      };
      const result: Rekognition.SearchFacesByImageResponse  = await rekog.searchFacesByImage(params).promise();
      if (!result.FaceMatches) return;
      if (result.FaceMatches?.length == 0) {
        window.alert('This is definitely not your friend. Abort!')
        setIsLoading(false);
        ((document.getElementById("uploadFriendPhoto")) as HTMLInputElement).value = "";
        return;
      }
      if (result.FaceMatches[0]) {
        const similarity = result.FaceMatches[0].Similarity;
        if (!similarity) return;
        let message: string;
        switch (true) {
          case (similarity < 50):
            message = 'This is probably not your friend (less than 50% similarity)';
            break;
          case (similarity < 75):
            message = 'This could be, but probability is not, your friend (less than 75% similarity) - worth a go?'
            break;
          case (similarity < 90):
            message = 'This is probably your friend (greater than 75% similarity)! Say hello!'
            break;
          case (similarity < 99.5):
            message = 'This is almost certainly your friend (greater than 90% similarity)! Say hello!'
            break;
          case (similarity <= 100):
            message = 'This is DEFINITELY your friend (100% similarity score)!'
            break;
          default:
            message = 'Something went wrong, sorry!';
        }
        window.alert(message);
        ((document.getElementById("uploadFriendPhoto")) as HTMLInputElement).value = "";
      }
    } catch (e) {
      console.log(e.message);
      setIsLoading(false);
      ((document.getElementById("uploadFriendPhoto")) as HTMLInputElement).value = "";
    }
  }

  function renderHeadingForTrainingPhotoUpload() {
    if (facesInCollectionCount === 0) {
      return <h2>Provide at least one photo of your friend (the more the better)</h2>
    }
    else if (facesInCollectionCount > 0 && facesInCollectionCount < 2) {
      return <h2>Great stuff, you've added a photo. Got one more?</h2>
    }
    else {
      return <h2>Great stuff! you've added {facesInCollectionCount} photos so far.</h2>
    }
  }

  function renderTrainingPhotoUpload() {
    return (
      <div>
        {renderHeadingForTrainingPhotoUpload()}
        <input id="uploadTrainingPhoto" onChange={indexFace} type="file" accept="image/*" capture="camera"></input>
      </div>
    )
  }
  // Styling TODO:
  // nicer looking photo inputs https://medium.com/better-programming/handling-file-inputs-with-javascript-9f2d3a007f05 ; https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/ - make nicer looking drop areas and filepicker
  // add spinners for loading states
  // add nicer modal instead of window alert?
  // simple favicon that's not the react one :)

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Ever forget your glasses and fail to recognise your friend? 🤦‍♀️
        </h2>
        <h3>
          No? But <i>what if!?</i> Keep calm and use this robot to help you recognise them 👀
        </h3>
        <p>
          Simply:
          <ul>
            <li>
              <b>Teach the robot</b> by uploading a few photos of your friend's face 📸
            </li>
            <li>
              <b>Use your new cyborg skill</b> by subtly snapping a photo of their face and we'll tell you if it's your friend! 👋
            </li>
          </ul>
        </p>
      </header>
      <body>
        {aboutToStart &&
          <div>
            <h2>Ready to get started?!</h2>
            <button onClick={createCollection}>Yes!</button>
          </div>
        }
        {trainingTheRobot && renderTrainingPhotoUpload()}
        {robotIsReady &&
          <div>
            <h2>The robot has been trained! Snap a photo of your 'friend' and we'll tell you if it's your friend</h2>
            <input id="uploadFriendPhoto" onChange={searchFace} type="file" accept="image/*" capture="camera"></input>
          </div>
        }
        <p>Note: I do not store your photos. Facial features are extracted from photos and used to recognise similarities. Your data will only be used by you and will be deleted within 24 hours.</p>
      </body>
    </div>
  );
}

export default App;
