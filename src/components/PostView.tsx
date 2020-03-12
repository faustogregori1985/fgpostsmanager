import React from 'react';
interface PostViewProps {
    post: any,
    onClose(): any,
}
const PostView = (props: PostViewProps) => {
    return (
      <div className="overflow-scroll fixed w-full h-full top-0 flex items-center justify-center bg-black-75">
        <div className="bg-white max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={props.post.imageUrl} alt={props.post.title} />
          <div className="px-6 py-4">
            <h1 className="font-bold text-xl mb-2">{props.post.title}</h1>
            <p className="text-gray-700 text-base mb-2">
              {props.post.content}  
            </p>
            <a 
              className="font-semibold text-teal-700 hover:underline"
              href={`https://maps.google.com/?q=${props.post.lat},${props.post.lng}`}
              target="blank"
            >
              Find {props.post.title} on the map
            </a>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Updated on {props.post.updatedAt}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Created on {props.post.createdAt}</span>
          </div>
          <div className="bg-teal-500 text-center py-4 lg:px-4">
          <button
            className="bg-transparent hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
              onClick={props.onClose}
            >
              Close
            </button>    
          </div>
        </div>
      </div>
    );
};

export default PostView;