const functions = require("firebase-functions");
const cors = require("cors")({ origin: true }); // allow us to make requests from front end in the browser.
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseKey.json"); // contains the private API key and credentials.

// Initialising Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://holiday-chat-agent-c1c27-default-rtdb.europe-west1.firebasedatabase.app/",
});

// Connecting to the Dialogflow API - allows front end to communicate with Dialogflow on the back end.
const { SessionsClient } = require("dialogflow");

// HTTP cloud function
exports.dialogflowGateway = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    // Wrapping the request response with CORS to allow requests to be made from the front end
    cors(request, response, async () => {
      // queryInput is what the user is saying to the bot, sessionId is the unique string ID for the agent to understand context of conversation.
      const { queryInput, sessionId } = request.body;

      // initilising the client with the serviceAccount credentials
      const sessionClient = new SessionsClient({ credentials: serviceAccount });

      // referencing the session with firebase project ID and session ID
      const session = sessionClient.sessionPath(
        "holiday-chat-agent-c1c27",
        sessionId
      );

      // getting response from the chat agent by calling detectIntent - provides an array of responses
      const responses = await sessionClient.detectIntent({
        session,
        queryInput,
      });

      // contains the agents/bots response which I want to display to user in the UI
      const result = responses[0].queryResult;

      // sending the response
      response.send(result);
    });
  });

// HTTP cloud function
const { WebhookClient } = require("dialogflow-fulfillment");

exports.dialogflowWebhook = functions
  .region("europe-west1")
  .https.onRequest(async (request, response) => {
    const agent = new WebhookClient({ request, response });

    const result = request.body.queryResult;

    const sessionId = request.body.session.split("/").pop();

    async function holidaySettingHandler(agent) {
      const db = admin.firestore();
      const profile = db.collection("conversations").doc(sessionId);

      const { location, climate, continent, activitylevel } =
        result.outputContexts[0].parameters;

      await profile.set({ location, climate, continent, activitylevel });
    }

    let intentMap = new Map();
    intentMap.set("HolidayFinderYes", holidaySettingHandler);
    agent.handleRequest(intentMap);
  });

exports.getHolidayResponse = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    cors(request, response, async () => {
      const db = admin.firestore();
      const destinations = [];
      const match = await db
        .collection("destinations")
        .where("climate", "==", request.body.climate)
        .where("location", "==", request.body.location)
        .where("continent", "==", request.body.continent)
        .where("activity-level", "==", request.body.activitylevel)
        .get()
        .then((querySnapshot) => {
          console.log(JSON.stringify(querySnapshot));
          querySnapshot.forEach((destination) => {
            destinations.push(destination.data());
          });
          response.send(destinations);
        });
    });
  });
