Parse.Cloud.define("addUser", async (request) => {
  const MUser = Parse.Object.extend("MUser");
  const newUser = new MUser();

  newUser.set("firstName", request.params.firstName);
  newUser.set("lastName", request.params.lastName);
  newUser.set("email", request.params.email);
  newUser.set("password", request.params.password);

  try {
    const savedUser = await newUser.save();
    return { success: true, message: "User created successfully", user: savedUser.toJSON() };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

Parse.Cloud.define("logInUser", async (request) => {
  const query = new Parse.Query("MUser");
  query.equalTo("email", request.params.email);
  query.equalTo("password", request.params.password);
  try {
    const user = await query.first({useMasterKey: true});
    
    if (user)
      return user.toJSON();
    else
      return { success: false, message: "Invalid credentials" };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

Parse.Cloud.define("getMUsers", async (request) => {
  const MUser = Parse.Object.extend("MUser");
  const query = new Parse.Query(MUser);

  try {
    const results = await query.find();

    // Process the results
    const users = results.map((user) => {
      return {
        id: user.id,
        username: user.get("username"),
        // Add any other desired user columns
      };
    });

    return users;
  } catch (error) {
    throw new Error("Error retrieving MUsers: " + error.message);
  }
});

Parse.Cloud.define("getMUsersExcept", async (request) => {
  const objectId = request.params.objectId;

  const MUser = Parse.Object.extend("MUser");
  const query = new Parse.Query(MUser);

  try {
    const results = await query.find();

    // Process the results
    const users = results.map((user) => {
      return {
        id: user.id,
        username: user.get("firstName") + " " + user.get("lastName"),
        // Add any other desired user columns
      };
    });

    return users;
  } catch (error) {
    throw new Error("Error retrieving MUsers: " + error.message);
  }
});

Parse.Cloud.define("getUser", async (request) => {
  const objectId = request.params.objectId;

  const MUser = Parse.Object.extend("MUser");
  const query = new Parse.Query(MUser);

  try {
    const result = await query.get(objectId);
    return {
      id: result.objectId,
      username: result.get("firstName") + " " + result.get("lastName"),
      firstName: result.get("firstName"),
      // Add any other desired user columns
    };

  } catch (error) {
    throw new Error("Error retrieving MUser: " + error.message);
  }
});
