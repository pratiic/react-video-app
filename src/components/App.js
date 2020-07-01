import React from "react";
import "./css/style.css";
import SearchBar from "./SearchBar";
import Results from "./Results";
import Heading from "./Heading";
import VideoContainer from "./VideoContainer";

class App extends React.Component {
	state = {
		popularVideos: [],
		videos: [],
		searched: false,
		query: "",
		selectedVideo: null,
		selectedVideoId: null,
		showVideo: true,
	};

	apiInfo = {
		url: "https://www.googleapis.com/youtube/v3/",
		videoSearch: "search",
		videoOthers: "videos",

		order: "relevance",
		chart: "mostPopular",
		videoCategoryId: 24,

		key: "AIzaSyCwLQB3e1IT0Qe1ZuK4c_ACn6uBVyDBfKE",

		part: "snippet",

		maxResults: {
			popularVideos: 45,
			searchedVideos: 25,
		},

		page: 1,
	};

	embedInfo = (
		<iframe
			width="853"
			height="480"
			src="https://www.youtube.com/embed/0JbSJY83_08"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	);
	embedInfo = "";

	componentDidMount() {
		let {
			url,
			videoOthers,
			chart,
			videoCategoryId,
			maxResults,
			key,
		} = this.apiInfo;

		//when the app first loads up, popular videos are retrieved

		fetch(
			`${url}${videoOthers}?chart=${chart}&videoCategoryId=${videoCategoryId}&maxResults=${maxResults.popularVideos}&key=${key}`
		)
			.then((response) => response.json())
			.then((data) => {
				//the id of resulting videos is used to retrieve details about the videos
				this.retrieveDetailedVideos(data.items);
			})
			.catch((error) => console.log(error));
	}

	//this retrieves detailed videos using their id
	retrieveDetailedVideos = (videos) => {
		let { url, videoOthers, part, key } = this.apiInfo;

		let newDetailedVideos = [];

		videos.forEach((video) => {
			fetch(`${url}${videoOthers}?part=${part}&id=${video.id}&key=${key}`)
				.then((response) => response.json())
				.then((data) => {
					newDetailedVideos = [...newDetailedVideos, data.items[0]];
					if (
						newDetailedVideos.length ===
						this.apiInfo.maxResults.popularVideos
					) {
						this.setState({
							popularVideos: [
								...this.state.popularVideos,
								...newDetailedVideos,
							],
						});
					}
				})
				.catch((error) => console.log(error));
		});
	};

	onVideoSearch = (searchTerm) => {
		let { url, videoSearch, part, order, maxResults, key } = this.apiInfo;
		fetch(
			`${url}${videoSearch}?part=${part}&order=${order}&kind=video&q=${searchTerm}&maxResults=${maxResults.searchedVideos}&key=${key}`
		)
			.then((response) => response.json())
			.then((data) => {
				this.setState({ videos: [] });
				this.setState({
					searched: true,
					videos: [...this.state.videos, ...data.items],
					query: searchTerm,
					showVideo: false,
				});
			})
			.catch((error) => console.log(error));
	};

	onVideoSelect = (selectedVideo, selectedVideoId) => {
		this.setState({
			selectedVideo: selectedVideo,
			selectedVideoId: selectedVideoId,
			showVideo: true,
		});
	};

	returnFinalVideos = () => {
		if (this.state.searched) {
			return this.state.videos;
		}
		return this.state.popularVideos;
	};

	returnHeadingValue = () => {
		return this.state.searched
			? `search results for "${this.state.query}"`
			: "popular videos";
	};

	scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	render() {
		return (
			<React.Fragment>
				<SearchBar
					placeholder={"Search for videos..."}
					onVideoSearch={this.onVideoSearch}
				/>

				<VideoContainer
					selectedVideo={this.state.selectedVideo}
					selectedVideoId={this.state.selectedVideoId}
					showVideo={this.state.showVideo}
				/>

				<Results
					videos={this.returnFinalVideos()}
					onVideoSelect={this.onVideoSelect}
					scrollToTop={this.scrollToTop}
					className={this.state.searched ? "search-results" : null}
				>
					<Heading
						class={"heading-primary"}
						value={this.returnHeadingValue()}
					/>
				</Results>
			</React.Fragment>
		);
	}
}

export default App;
