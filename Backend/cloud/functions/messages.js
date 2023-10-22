
Parse.Cloud.define("getMessages", async (request) => {
    const senderId = request.params.senderId;
    const receiverId = request.params.receiverId;
  
    const Message = Parse.Object.extend("message");
    const MUser = Parse.Object.extend("MUser");
  
    const query = new Parse.Query(Message);
    query.equalTo("senderId", senderId);
    query.equalTo("receiverId", receiverId);
  
    const query2 = new Parse.Query(Message);
    query2.equalTo("senderId", receiverId);
    query2.equalTo("receiverId", senderId);
  
    const mainQuery = Parse.Query.or(query, query2);
    mainQuery.include("senderId");
    mainQuery.include("receiverId");
    mainQuery.ascending("createdAt");
  
    try {
      const messages = await mainQuery.find();
      const results = [];
  
      for (const message of messages) {
        const sender = message.get("senderId");
        const receiver = message.get("receiverId");
  
        await sender.fetch();
        await receiver.fetch();
        
        const result = {
          id: message.objectId,
          sender: message.get("senderId").get("firstName") + " " + message.get("senderId").get("lastName"),
          receiver: message.get("receiverId").get("firstName") + " " + message.get("receiverId").get("lastName"),
          des: message.get("description"),
          // Add any other desired message columns
        };
  
        results.push(result);
      }
  
      return results;
    } catch (error) {
      throw new Error("Error retrieving messages: " + error.message);
    }
  });