import React from "react";

let VideoCard = (props) => {
	let videoCardClickHandler = () => {
		props.onVideoSelect(props.video, props.returnId(props.video));
		props.scrollToTop();
	};

	console.log(props);

	return (
		<div className="video-card" onClick={videoCardClickHandler}>
			<img
				src={props.video.snippet.thumbnails.medium.url}
				alt="video thumbnail"
			/>

			<div className="video-info">
				<p className="video-title">{props.video.snippet.title}</p>
				<p className="video-channel">
					{props.video.snippet.channelTitle}
				</p>
			</div>
		</div>
	);
};

export default VideoCard;
