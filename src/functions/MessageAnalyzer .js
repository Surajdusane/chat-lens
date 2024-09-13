export class MessageAnalyzer {
    constructor(messages) {
        this.messages = Array.isArray(messages) ? messages : [];
    }

    // Helper method to parse the time string into a 24-hour format hour
    static parseTime(timeStr) {
        // Normalize whitespace by replacing non-breaking spaces with regular spaces
        timeStr = timeStr.replace(/\u202F/g, ' ');

        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (period === 'pm' && hours !== 12) hours += 12;
        if (period === 'am' && hours === 12) hours = 0;

        return hours;
    }

    // Count the most frequent words in messages and sort them in descending order
    countMostFrequentWords() {
        if (!Array.isArray(this.messages)) {
            console.error("this.messages is not an array");
            return [];
        }

        const wordCounts = {};
        this.messages.forEach(message => {
            // Remove punctuation and convert to lower case
            const words = message.message
                .replace(/["“”]/g, '') // Remove double quotes
                .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "") // Remove other punctuation
                .toLowerCase()
                .split(/\s+/);

            words.forEach(word => {
                if (word) {
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                }
            });
        });

        // Convert wordCounts to an array and sort by frequency
        const sortedWordCounts = Object.entries(wordCounts)
            .sort(([, countA], [, countB]) => countB - countA); // Sort descending

        return sortedWordCounts;
    }

    // Count the number of messages per sender
    countMessagesPerSender() {
        if (!Array.isArray(this.messages)) {
            console.error("this.messages is not an array");
            return {};
        }

        return this.messages.reduce((acc, message) => {
            acc[message.sender] = (acc[message.sender] || 0) + 1;
            return acc;
        }, {});
    }

    // Analyze online activity by time
    countMessagesByTime() {
        if (!Array.isArray(this.messages)) {
            console.error("this.messages is not an array");
            return {};
        }

        // Initialize activity for all 24 hours
        const hours = Array.from({ length: 24 }, (_, hour) => `${hour}:00-${hour + 1}:00`);
        const activity = hours.reduce((acc, hourRange) => {
            acc[hourRange] = { Techeir: 0, Sahil: 0 }; // Initialize with zero counts
            return acc;
        }, {});

        // Populate activity based on messages
        this.messages.forEach(message => {
            const hour = MessageAnalyzer.parseTime(message.time);
            const key = `${hour}:00-${hour + 1}:00`;
            if (activity[key]) {
                activity[key][message.sender] = (activity[key][message.sender] || 0) + 1;
            }
        });

        return activity;
    }
}

// // Example usage with JSON data
// const messages = [
//     { "time": "1:07 pm", "sender": "Techeir", "message": "Hello Suraj" },
//     { "time": "1:08 pm", "sender": "Techeir", "message": "This is Soumya" },
//     { "time": "1:08 pm", "sender": "Techeir", "message": "From Techeir" },
//     { "time": "1:08 pm", "sender": "Sahil", "message": "hello mam" },
//     { "time": "1:08 pm", "sender": "Techeir", "message": "It's sir actually" },
//     { "time": "1:09 pm", "sender": "Sahil", "message": "ohh sorry" },
//     { "time": "1:09 pm", "sender": "Sahil", "message": "hello sir" },
//     { "time": "5:57 pm", "sender": "Techeir", "message": "Hello" },
//     { "time": "5:58 pm", "sender": "Techeir", "message": "<Media omitted>" },
//     { "time": "5:58 pm", "sender": "Techeir", "message": "<Media omitted>" },
//     { "time": "5:58 pm", "sender": "Techeir", "message": "<Media omitted>" },
//     { "time": "5:59 pm", "sender": "Techeir", "message": "Please make sure to Submit all these by tomorrow same time. Time limit is 24 hours." },
//     { "time": "5:59 pm", "sender": "Techeir", "message": "Do let me know if you have any questions." },
//     { "time": "6:46 pm", "sender": "Sahil", "message": "Ok sir" },
//     { "time": "6:49 pm", "sender": "Techeir", "message": "Thank you for your message. We're unavailable right now, but will respond as soon as possible." },
//     { "time": "7:12 pm", "sender": "Sahil", "message": "Ok sir" },
//     { "time": "5:13 pm", "sender": "Sahil", "message": "<Media omitted>" }
// ];

// const analyzer = new MessageAnalyzer(messages);

// console.log('Most Frequent Words:', analyzer.countMostFrequentWords());
// console.log('Message Counts Per Sender:', analyzer.countMessagesPerSender());
// console.log('Online Activity by Time:', analyzer.countMessagesByTime());
