import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const userId = req.body && req.body.userId;
    const message = req.body && req.body.message;
  
    if (userId && message) {
        context.bindings.signalRMessages = [{
            "userId": userId,
            "target": "newMessage",
            "arguments": [message]
        }];
        context.res = {
            status: 200,
            body: "Message sent to user"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a userId and a message in the request body"
        };
    }

};

export default httpTrigger;