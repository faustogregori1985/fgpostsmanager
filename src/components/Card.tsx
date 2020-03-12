import React, { useState } from 'react';

export interface CardProps {
    id: string,
    title: string,
    content: string,
    lat: string,
    lng: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    onView(): any,
    onDelete() : any,
    onEdit(): any
}

const Card = (props: CardProps) => {
    const [state, setState] = useState({
        showActions: false
    });
    function toggleActionOverlay() {
        setState(currentState => ({
            showActions: !currentState.showActions
        }));
    }
    return (
        <div
            onMouseEnter={toggleActionOverlay}
            onMouseLeave={toggleActionOverlay}
            className="relative flex flex-col content-streach max-w-sm rounded overflow-hidden shadow-lg">
            {
                state.showActions && (
                    <div className="absolute top-0 h-full w-full bg-white-75 flex flex-col justify-center items-center">
                    <button 
                        className="
                            bg-transparent
                            hover:border-trasparent
                            hover:text-white
                            hover:bg-teal-500
                            text-teal-500
                            font-semibold
                            py-1
                            px-2
                            border
                            border-teal-500
                            rounded
                            mb-2
                        "
                    onClick={props.onView}
                    >
                        View
                    </button>
                    <button 
                        className="
                            bg-transparent
                            hover:border-trasparent
                            hover:text-white
                            hover:bg-teal-500
                            text-teal-500
                            font-semibold
                            py-1
                            px-2
                            border
                            border-teal-500
                            rounded
                            mb-2
                        "
                        onClick={props.onEdit}
                    >
                        Edit
                    </button>
                    <button 
                        className="
                            bg-transparent
                            hover:bg-red-500
                            text-red-700
                            font-semibold
                            hover:text-white
                            py-1
                            px-2
                            border
                            border-red-500
                            hover:border-transparent
                            rounded
                        "
                        onClick={props.onDelete}
                    >
                        Remove
                    </button>
                </div>
                )
            }
            <img className="w-full" src={props.imageUrl} alt={props.title} />
            <div className="px-6 pt-4 text-sm font-semibold text-gray-700">
                Updated on {props.updatedAt}
            </div> 
            <div className="flex-1 flex flex-col content-between">
                <div className="flex-1 px-6 py-4">
                    <div className="font-bold text-xl mb-2">{props.title}</div>
                    <p className="truncate text-gray-700 text-base">
                        {props.content}
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Card;