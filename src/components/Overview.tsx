import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Header from './Header';
import Card from './Card';
import PostView from './PostView';
import useApi from '../api/useApi';

export interface OverviewProps {}

interface OverviewState {
    selectedPost: any
}

const Overview = (props: OverviewProps)=> {
    const [state, setState] = useState<OverviewState>({
        selectedPost: null
    });
    const { posts, fetch, create, remove } = useApi();

    useEffect(function fetchPosts() {
        fetch();
    },
    // eslint-disable-next-line
    []);
    
    async function handleCreate() {
        const payload = {
            title: 'Ferrara',
            content: `Ferrara è una città situata in Emilia-Romagna.
            È nota per gli edifici eretti nel Rinascimento dagli Este,
            signori della città, tra cui il Castello Estense,
            dalle stanze lussuose, il Palazzo dei Diamanti,
             sede della Pinacoteca Nazionale di Ferrara e caratterizzato dalla facciata
             rivestita in blocchi di marmo a forma di diamante,
             e infine la Cattedrale di Ferrara, con facciata romanica a tre cuspidi e campanile in marmo.`,
            lat: '44.84346',
            long: '11.60868',
            image_url: 'https://live.staticflickr.com/7546/15480451774_44101b99e2_k.jpg'  
        };
        create(payload);
    }
    function handleDelete(id: string) {
        remove(id);
    }
    function handleViewPost(post: { id?: string; title: any; content: any; image_url: any; updated_at?: string; created_at?: string; long: any; lat: any; }) {
        const createdAt = moment(post.created_at).format('LL');
        const updatedAt = moment(post.updated_at).format('LL');
        setState(currentState => ({
            ...currentState,
            selectedPost: {
                title: post.title,
                content: post.content,
                imageUrl: post.image_url,
                updatedAt: updatedAt,
                createdAt: createdAt,
                lng: post.long,
                lat: post.lat,
            }
        }));
    }
    function handleOnViewClose() {
        setState(currentState => ({
            ...currentState,
            selectedPost: null
        }));
    }
    return (
        <div>
            <Header 
                onCreate={handleCreate}
            />
            <div className="container mx-auto py-4 px-4">
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
                    {
                        posts.map((post: { id: string; title: string; content: string; image_url: string; updated_at: string; created_at: string; long: string; lat: string; }) => {
                            const createdAt = moment(post.created_at).format('LL');
                            const updatedAt = moment(post.updated_at).format('LL');
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
                                onEdit={() => {}}
                                onDelete={() => handleDelete(post.id)}
                                />
                                );
                            }) 
                        }
                </div>
            </div>
            {   state.selectedPost && (
                    <PostView
                        post={state.selectedPost}
                        onClose={handleOnViewClose}
                    />
                )
            }    
        </div>
    )
}

export default Overview;