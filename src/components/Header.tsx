import React from 'react';

interface HeaderProps {
    onCreate(): any
}

const Header = (props: HeaderProps) => {
    return (
        <header className="bg-teal-500 sticky top-0 ">
            <div className="container mx-auto flex items-center justify-between flex-wrap  p-6">
                <h1 className="text-white font-semibold text-xl tracking-tight">Posts</h1>
                <button
                    data-testid="header-create-post-button"
                    className="
                        text-sm
                        px-4
                        py-2
                        leading-none
                        border
                        rounded
                        text-white
                        border-white
                        hover:border-transparent
                        hover:text-teal-500
                        hover:bg-white
                    "
                    onClick={props.onCreate}
                >
                    Create Post
                </button>
            </div>
        </header>
    );
};

export default Header;