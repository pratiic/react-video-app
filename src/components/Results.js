import React from "react";
import VideoCard from "./VideoCard";

let Results = ({ videos, children, onVideoSelect, scrollToTop, className }) => {
	let returnId = (video) => {
		if (video.id.kind) {
			return video.id.videoId;
		}

		return video.id;
	};

	return videos.length > 0 ? (
		<div className="results">
			{children}

			<div className={`results-main ${className}`}>
				{videos.map((video) => {
					return (
						<VideoCard
							video={video}
							key={video.etag}
							id={returnId(video)}
							onVideoSelect={onVideoSelect}
							returnId={returnId}
							scrollToTop={scrollToTop}
						/>
					);
				})}
			</div>
		</div>
	) : null;
};

export default Results;
