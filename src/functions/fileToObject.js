export const handleFile = (files) => {
    return new Promise((resolve, reject) => {
      if (!files || files.length === 0) {
        console.error("No files were provided.");
        reject("No files provided");
        return;
      }
  
      const file = files[0]; // Handle only the first file
  
      // Check if the file is of the correct type
      if (file.type !== "text/plain") {
        console.error("The provided file is not valid.");
        reject("Invalid file type");
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const text = event.target.result;
        const chatData = parseChatText(text);
        // console.log(chatData); // Output the chat data to the console
        resolve(chatData); // Resolve the promise with the parsed data
      };
  
      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
        reject(error); // Reject the promise if there is an error
      };
  
      reader.readAsText(file); // Read the file as plain text
    });
  };
  
  // Function to parse the WhatsApp chat text
  const parseChatText = (text) => {
    const lines = text.split("\n"); // Split the text into lines
    const messages = [];
  
    // Loop through each line and extract messages
    lines.forEach((line) => {
      // Filter out system messages
      if (
        line.includes(
          "Messages to this chat and calls are now secured with end-to-end encryption."
        ) ||
        line.includes("joined using this group's invite link") ||
        line.trim() === "" ||
        line.includes("<media") ||
        line.includes("omitted>")
      ) {
        return; // Skip system messages
      }
  
      // Basic logic to extract the message based on WhatsApp chat format (you may need to refine this for your chat format)
      const messageParts = line.split(" - ");
      if (messageParts.length > 1) {
        const timeAndSender = messageParts[0].split(", ");
        const time = timeAndSender[1];
        const sender = messageParts[1].split(":")[0];
        const message = messageParts[1].split(":")[1];
  
        if (sender && message) {
          messages.push({
            time: time.trim(),
            sender: sender.trim(),
            message: message.trim(),
          });
        }
      }
    });
  
    return messages; // Return parsed messages
  };
  