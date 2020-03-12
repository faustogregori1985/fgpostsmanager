import { useState } from 'react';
import axios from 'axios';

interface Payload {
    title: string,
    content: string,
    lat: string,
    long: string,
    image_url: string  
}

interface ApiState {
    posts: any[],
    isLoading: boolean
}

export default function useApi() {
    const endpoint = 'https://wf-challenge-abqs4otg74.herokuapp.com';
    const [state, setState] = useState<ApiState>({
        posts: [],
        isLoading: false
    });
    return {
        posts: state.posts,
        isLoading: state.isLoading,
        async fetch() {
            try {
                setState(currentState => ({
                    ...currentState,
                    isLoading: true
                }));
                const response = await axios.get(`${endpoint}/api/v1/posts`);
                setState(currentState => ({
                    posts: response.data,
                    isLoading: false
                }));
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        },
        async create(data: Payload) {
            try {
                setState(currentState => ({
                    ...currentState,
                    isLoading: true
                }));
                const response = await axios.post(`${endpoint}/api/v1/posts`, data);
                console.log(response);
                setState(currentState => ({
                    ...currentState,
                    posts: [...currentState.posts, response.data],
                    isLoading: false
                }));
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        async update(id: string, data: Payload) {
            try {
                setState(currentState => ({
                    ...currentState,
                    isLoading: true
                }));
                const response = await axios.put(`${endpoint}/api/v1/posts/${id}`);
                console.log(response);
                return response;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        async remove(id: string){
            try {
                setState(currentState => ({
                    ...currentState,
                    isLoading: true
                }));
                const response = await axios.delete(`${endpoint}/api/v1/posts/${id}`);
                setState(currentState => ({
                    ...currentState,
                    posts: currentState.posts.filter(current => current.id !== id),
                    isLoading: false
                }));
                console.log(response);
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
}