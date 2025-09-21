import { key } from '../../key.js'
import SearchYouTubeInfo from '../model/youtube-info.ts';
import VideoInfo from '../model/video-info.ts';

const YoutubeService = {
    test: async function() {
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=viewCount&q=surfing&safeSearch=none&key=${key}`

        try {
            const response = await fetch(url);
			const json = await response.json();
            const results = json.items.map(
                item => new SearchYouTubeInfo(item)
            )
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    SearchYouTube: async function(query) {
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&order=viewCount&q=${query}&safeSearch=none&key=${key}`

        try {
            const response = await fetch(url);
            const json = await response.json();
            const results = json.items.map(
                item => new SearchYouTubeInfo(item)
            )
            return results
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    
    GetVideoInfo: async function(query) {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${query}&key=${key}`

        try {
            const response = await fetch(url);
            const json = await response.json();
            const results = json.items.map(
                statistics => new VideoInfo(statistics)
            )
            return results;
        } catch (error) {
            console.error(error);
        }
    }
}

export default YoutubeService;