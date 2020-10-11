import AWS from 'aws-sdk';

const rekog = new AWS.Rekognition();

export const cleanup = async (event, context) => {
  let collectionIds;
  try {
    const data = await rekog.listCollections().promise();
    collectionIds = data.CollectionIds;
  } catch (e) {
    throw new Error('Failed to list collections with error: ' + e.message);
  }

  if (collectionIds.length < 5) {
    console.log('fewer than 5 collectionIds. No cleanup done.');
    return;
  }

  const collectionIdsToDelete = collectionIds.slice(5);
  const promises = [];
  for (let id of collectionIdsToDelete) {
    const params = {
      CollectionId: id
     };
     promises.push(rekog.deleteCollection(params).promise());
  }

  try {
    await Promise.race(promises); // just check at least one works, no need to wait for them all. Not a big problem if some aren't cleaned up before the next day.
  } catch(e) {
    throw new Error('Error deleting at least one of the collections. ' + e.message);
  }
};