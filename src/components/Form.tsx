import React, { useState } from 'react';
import { Payload } from "../utils/types";

export interface FormProps {
    id?: string,
    title?: string,
    content?: string,
    lat?: string,
    lng?: string,
    imageUrl?: string,
    error: string,
    onCancel() : any,
    onSave(post: Payload): any
}

const Form = (props: FormProps) => {
    const [state, setState] = useState({
        id: props.id || '',
        title: props.title || '',
        content: props.content || '',
        imageUrl: props.imageUrl || '',
        lat: props.lat || '',
        lng: props.lng || ''
    });

    function updateField(fieldName: string, value: string) {
        setState(currentState => ({
            ...currentState,
            [fieldName]: value
        }));
    }

    function handleSave() {
        props.onSave({
            id: state.id,
            title: state.title,
            content: state.content,
            image_url: state.imageUrl,
            lat: state.lat,
            long: state.lng
        });
    }

    return (
        <div className="fixed w-full h-full top-0 overflow-scroll bg-black-75">
            <div className="bg-white my-4 mx-auto max-w-sm rounded shadow-lg">
              <div className="bg-teal-500 py-4 lg:px-4">
                    <h1 className="text-white font-semibold text-xl tracking-tight">
                        { props.id ? `Edit ${props.title}`: 'Create A New Post'}
                    </h1>
                </div>
                <div role="form" className="px-6 py-4">
                    <div className="mb-4">
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="title"
                        >
                            Title
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Post title"
                            value={state.title}
                            onChange={event => updateField('title', event.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Description
                        </label>
                        <textarea 
                            className="h-48 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="content"
                            value={state.content}
                            onChange={event => updateField('content', event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="image_url"
                        >
                            Image url
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image_url"
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            value={state.imageUrl}
                            onChange={event => updateField('imageUrl', event.target.value)}
                        />
                        {state.imageUrl && (
                            <img className="w-full my-4 shadow shadow-lg" src={state.imageUrl} title={state.imageUrl} alt={state.imageUrl} />
                        )}
                    </div>
                    <div className="mb-4">
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="lat"
                        >
                            Location's Latitude
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lat"
                            type="text"
                            value={state.lat}
                            onChange={event => updateField('lat', event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="lng"
                        >
                            Location's Longitude
                        </label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lng"
                            type="text"
                            value={state.lng}
                            onChange={event => updateField('lng', event.target.value)}
                        />
                    </div>
                    <div className="text-right">
                        <button
                            className="text-teal-500 hover:text-teal-700 font-semibold py-2 px-4 rounded mr-2"
                            onClick={props.onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
                            onClick={handleSave}
                        >
                            { props.id ? 'Save' : 'Create'}
                        </button> 
                    </div>
                    { props.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                            <strong className="font-bold">{props.error}</strong>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Form;