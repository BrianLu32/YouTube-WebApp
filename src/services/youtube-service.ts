import { key } from '../../key.js'
import SearchYouTubeInfo from '../model/youtube-info';
import VideoInfo from '../model/video-info';
import Channel from '../model/channel-snippet'

const YoutubeService = {
    SearchYouTube: async function(query: String) {
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&order=viewCount&q=${query}&safeSearch=none&key=${key}`

        try {
            const response = await fetch(url);
            const json = await response.json();
            const results: SearchYouTubeInfo[] = json.items.map(
                (item: SearchYouTubeInfo) => new SearchYouTubeInfo(item)
            )
            return results
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    
    GetVideoInfo: async function(query: String) {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${query}&key=${key}`

        try {
            const response = await fetch(url);
            const json = await response.json();
            const results: VideoInfo[] = json.items.map(
                (statistics: VideoInfo) => new VideoInfo(statistics)
            )
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    GetChannel: async function(query: String) {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${query}&key=${key}`

        try {
            const response = await fetch(url);
            const json = await response.json();
            const results: Channel[] = json.items.map(
                (snippet: Channel) => new Channel(snippet)
            )
            return results;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default YoutubeService;