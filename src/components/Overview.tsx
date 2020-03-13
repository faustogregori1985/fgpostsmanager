import React, { useEffect, useState } from "react";
import moment from "moment";
import { PostType, Payload } from "../utils/types";
import Header from "./Header";
import Card from "./Card";
import PostView from "./PostView";
import Form from "./Form";
import useApi from "../api/useApi";

export interface OverviewProps {}

interface OverviewState {
  selectedPost: any,
  action: string,
  error: string
}

const VIEW_POST_ACTION = "VIEW";
const CREATE_POST_ACTION = "CREATE";
const EDIT_POST_ACTION = "EDIT";

const Overview = (props: OverviewProps) => {
  const [state, setState] = useState<OverviewState>({
    selectedPost: null,
    action: '',
    error: ''
  });
  const { posts, isLoading, fetch, create, update, remove } = useApi();

  useEffect(
    function fetchPosts() {
      fetch();
    },
    // eslint-disable-next-line
    []
  );

  function transformApiPost(post: PostType) {
    const createdAt = moment(post.created_at).format("LL");
    const updatedAt = moment(post.updated_at).format("LL");
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        imageUrl: post.image_url,
        updatedAt: updatedAt,
        createdAt: createdAt,
        lng: post.long,
        lat: post.lat,
    };
  }

  async function handleCreate(newPost: Payload) {
    create(newPost);
  }

  function handleDelete(id: string) {
    remove(id);
  }
  
  function handleUpdate(post: Payload) {
    if(update(post)) {
        handleOnClose();
    } else {
        setState(currentState => ({
            ...currentState,
            error: 'An error occurred, post not updated!'
        }));
    }
  }

  function handleViewPost(post: PostType) {
    setState(currentState => ({
      ...currentState,
      selectedPost: transformApiPost(post),
      action: VIEW_POST_ACTION
    }));
  }

  function handleEditPost(post: PostType) {
    setState(currentState => ({
      ...currentState,
      selectedPost: transformApiPost(post),
      action: EDIT_POST_ACTION
    }));
  }

  function handleCreatePost() {
    setState(currentState => ({
      ...currentState,
      selectedPost: null,
      action: CREATE_POST_ACTION
    }));
  }

  function handleOnClose() {
    setState(currentState => ({
      ...currentState,
      selectedPost: null,
      action: "",
      error: ''
    }));
  }

  return (
    <div>
      <Header onCreate={handleCreatePost} />
      <div className="container mx-auto py-4 px-4">
        {posts.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl text-teal-700 my-4">No Posts Available</h1>
                <button
                    className="text-white bg-teal-700 hover:bg-teal-500 hover:text-white font-semibold py-2 px-4 rounded"
                    onClick={handleCreatePost}
                >
                    Create The First Post!
                </button> 
            </div>
        )}
        <div
          className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-4
                    "
        >   
          {posts.map((post: PostType) => {
            const createdAt = moment(post.created_at).format("LL");
            const updatedAt = moment(post.updated_at).format("LL");
            return (
              <Card
                id={post.id}
                title={post.title}
                content={post.content}
                imageUrl={post.image_url}
                updatedAt={updatedAt}
                createdAt={createdAt}
                lng={post.long}
                lat={post.lat}
                onView={() => handleViewPost(post)}
                onEdit={() => handleEditPost(post)}
                onDelete={() => handleDelete(post.id)}
              />
            );
          })}
        </div>
      </div>
      {state.selectedPost && state.action === VIEW_POST_ACTION && (
        <PostView post={state.selectedPost} onClose={handleOnClose} />
      )}
      {state.action === CREATE_POST_ACTION && (
        <Form error={state.error} onCancel={handleOnClose} onSave={handleCreate} />
      )}
      {state.selectedPost && state.action === EDIT_POST_ACTION && (
        <Form 
            id={state.selectedPost.id}
            title={state.selectedPost.title}
            content={state.selectedPost.content}
            lat={state.selectedPost.lat}
            lng={state.selectedPost.lng}
            imageUrl={state.selectedPost.imageUrl}
            error={state.error}
            onCancel={handleOnClose}
            onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default Overview;
