import React from "react";

class VideoContainer extends React.Component {
	render() {
		return this.props.selectedVideoId && this.props.showVideo ? (
			<div className="video-container">
				<div className="video-container-main">
					<iframe
						src={`https://www.youtube.com/embed/${this.props.selectedVideoId}`}
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>

				<div className="video-info">
					<p className="video-title">
						{this.props.selectedVideo.snippet.title}
					</p>
					<p className="channel-title">
						{this.props.selectedVideo.snippet.channelTitle}
					</p>
					<div className="video-description">
						{this.props.selectedVideo.snippet.description}
					</div>
				</div>
			</div>
		) : null;
	}
}

export default VideoContainer;
