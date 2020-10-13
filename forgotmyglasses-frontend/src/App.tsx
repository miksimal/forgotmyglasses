/// <reference types="aws-sdk" />

import React, { useState, useEffect } from "react";
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import Rekognition, { CreateCollectionRequest, IndexFacesRequest, SearchFacesByImageRequest } from "aws-sdk/clients/rekognition";
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

AWS.config.region = 'eu-west-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:4a8f8cca-1fe0-4ce5-843c-3118a21061f6',
});
const rekog: AWS.Rekognition = new AWS.Rekognition();

function App() {
  const [trainingUploadIsLoading, setTrainingUploadIsLoading] = useState(false);
  const [friendCheckerUploadIsLoading, setFriendCheckerUploadIsLoading] = useState(false);
  const [collectionId, setCollectionId] = useState<string>("");
  const [isCreatingCollection, setIsCreatingCollection] = useState(true);
  const [robotIsReady, setRobotIsReady] = useState(false);
  const [facesInCollectionCount, setFacesInCollectionCount] = useState(0);

  useEffect(() => {
    async function createCollection() {
      const id = uuidv4();
      setCollectionId(id);
      setIsCreatingCollection(true);
      try {
        const params: CreateCollectionRequest = {
          CollectionId: id
         };
        await rekog.createCollection(params).promise();
      } catch (e) {
        console.log(e.message);
        window.alert("Sorry, something went wrong. Please refresh the page");
      }
      setIsCreatingCollection(false);
    };

    createCollection();
  }, []);

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

  async function indexFace(file: Blob) {
    setTrainingUploadIsLoading(true);
    try {
      const buffer = await readFileAsync(file);
      if (buffer == null) throw new Error('Error reading file');

      const params: IndexFacesRequest = {
        CollectionId: collectionId,
        Image: {
          Bytes: buffer
        }
      };
      const result: Rekognition.IndexFacesResponse  = await rekog.indexFaces(params).promise();
      if (result.FaceRecords && result.FaceRecords.length === 0) {
        window.alert('Woops, no face was registered in that photo. Can you try a different one?');
      } else {
        setRobotIsReady(true);
        setFacesInCollectionCount(facesInCollectionCount + 1);
        ((document.getElementById("friendCheckerDropArea")) as HTMLDivElement).scrollIntoView(true);
      }
    } catch (e) {
      console.log(e.message);
    }
    setTrainingUploadIsLoading(false);
    ((document.getElementById("uploadTrainingPhoto")) as HTMLInputElement).value = "";
  }

  async function searchFace(file: Blob) {
    setFriendCheckerUploadIsLoading(true);
    try {
      const buffer = await readFileAsync(file);
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
      if (result.FaceMatches?.length === 0) {
        window.alert('This is definitely not your friend. Abort!')
        setFriendCheckerUploadIsLoading(false);
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
            message = 'This could be, but probably is not, your friend (less than 75% similarity) - worth a go?'
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
      }
    } catch (e) {
      console.log(e.message);
    }
    ((document.getElementById("uploadFriendPhoto")) as HTMLInputElement).value = "";
    setFriendCheckerUploadIsLoading(false);
  }

  function renderHeadingForTrainingPhotoUpload() {
    if (facesInCollectionCount === 0) {
      return <><h2>Provide a photo of at least one friend.</h2><p>A photo may contain up to 100 faces.</p></>
    }
    else if (facesInCollectionCount > 0 && facesInCollectionCount < 2) {
      return <><h2>One photo added 🎉</h2><p>Add more photos or scroll down to try the friend-checker!</p></>
    }
    else {
      return <><h2>{facesInCollectionCount} photos added 🎉</h2><p>Add more photos or scroll down to try the friend-checker!</p></>
    }
  }

  function indexFaceBasedOnDropEvent(e: React.DragEvent<HTMLDivElement>) {
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      window.alert("Sorry, only one image at at time please");
      return;
    }
    const file = files[0];
    if (!file.type.startsWith("image")) {
      window.alert("File must be an image");
      return;
    }
    indexFace(file);
  }

  function renderTrainingPhotoUpload() {
    return (
      <div>
        {renderHeadingForTrainingPhotoUpload()}
        <input id="uploadTrainingPhoto" onChange={(e) => {const file = e.target.files ? e.target.files[0] : new Blob(); indexFace(file)}} type="file" accept="image/*" capture="camera"></input>
        {trainingUploadIsLoading ? <Spinner animation="border"></Spinner> :
          <div 
            id="trainingPhotoDropArea"
            onClick={() => ((document.getElementById("uploadTrainingPhoto")) as HTMLInputElement).click()}
            onDragEnter={(e) => {e.stopPropagation(); e.preventDefault(); addHighlight("trainingPhotoDropArea");}}
            onDragOver={(e) => {e.stopPropagation(); e.preventDefault(); addHighlight("trainingPhotoDropArea");}}
            onDragLeave={(e) => {e.stopPropagation(); e.preventDefault(); removeHighlight("trainingPhotoDropArea");}}
            onDrop={(e) => {e.stopPropagation(); e.preventDefault(); removeHighlight("trainingPhotoDropArea"); indexFaceBasedOnDropEvent(e);}}
          >
            <FontAwesomeIcon className="PlusIcon" color={"#61dafb"} icon={faPlus} size={"3x"} />
            <div className="TextWithinUploadBox">
              <span>Drag & drop</span>
              <span>or click to upload</span>
            </div>
          </div>
        }
      </div>
    )
  }

  function addHighlight(elementId: string) {
    const dropbox = (document.getElementById(elementId)) as HTMLDivElement;
    dropbox.classList.add('highlight');
  }

  function removeHighlight(elementId: string) {
    const dropbox = (document.getElementById(elementId)) as HTMLDivElement;
    dropbox.classList.remove('highlight');
  }

  function searchFaceBasedOnDropEvent(e: React.DragEvent<HTMLDivElement>) {
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      window.alert("Sorry, only one image at at time please");
      return;
    }
    const file = files[0];
    if (!file.type.startsWith("image")) {
      window.alert("File must be an image");
      return;
    }
    searchFace(file);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Ever forget your glasses and fail to recognise a friend?
        </h2>
        <h4>
          Keep calm and use this robot to help you 👀
        </h4>
        <ul>
            <li>
              <b>Teach the robot</b> by uploading photos of your friends 🍰
            </li>
            <li>
              <b>Ask the robot if someone is your friend</b> by quickly snapping a photo 📸
            </li>
          </ul>
      </header>
      <div>
        {isCreatingCollection ? <Spinner animation="border"></Spinner> : renderTrainingPhotoUpload()}
        {robotIsReady &&
          <div className="FriendChecker">
            <h2>Friend-checker: Snap a photo of your 'friend' 📸</h2>
            <p>If more than one person is present in the photo, the largest face will be used.</p>
            <input id="uploadFriendPhoto" onChange={(e) => {const file = e.target.files ? e.target.files[0] : new Blob(); searchFace(file)}} type="file" accept="image/*" capture="camera"></input>
            {friendCheckerUploadIsLoading ? <Spinner animation="border"></Spinner> :
              <div 
                id="friendCheckerDropArea"
                onClick={() => ((document.getElementById("uploadFriendPhoto")) as HTMLInputElement).click()}
                onDragEnter={(e) => {e.stopPropagation(); e.preventDefault(); addHighlight("friendCheckerDropArea");}}
                onDragOver={(e) => {e.stopPropagation(); e.preventDefault(); addHighlight("friendCheckerDropArea");}}
                onDragLeave={(e) => {e.stopPropagation(); e.preventDefault(); removeHighlight("friendCheckerDropArea");}}
                onDrop={(e) => {e.stopPropagation(); e.preventDefault(); removeHighlight("friendCheckerDropArea"); searchFaceBasedOnDropEvent(e);}}
              >
                <FontAwesomeIcon className="PlusIcon" color={"#61dafb"} icon={faPlus} size={"3x"} />
                <div className="TextWithinUploadBox">
                  <span>Drag & drop</span>
                  <span>or click to upload</span>
                </div>
              </div>
            }
          </div>
        }
        {!isCreatingCollection && <p className="Disclaimer">Note: extracted facial features from the training photos are stored for a maximum of 24 hours. Your data will be used only by you. For photos uploaded in the 'friend-checker' nothing is stored.</p>}
      </div>
    </div>
  );
}

export default App;
