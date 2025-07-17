import { key } from '../../key.js'

const YoutubeService = {
    test: async function() {
        // const url = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${key}&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=viewCount&q=surfing&safeSearch=none&key=${key}`
        // const url = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`
        // const requestOptions = {
        //     method: 'GET',
        //     headers: 
		// 	{ 
		// 		'Content-Type': 'application/json',
		// 		'Authorization': `Bearer ${key}`
		// 	},
        // };

        try {
            // const response = await fetch(url, requestOptions);
            const response = await fetch(url);
			const json = await response.json();
            return json;
        } catch (error) {
            return console.error(error);
        }
    }
}

export default YoutubeService;