import React, { useState } from 'react';
function navbar() {

    // const [home, setHome] = useState();

    return (
        <nav className="bg-white mx-8 mb-4">
            <div className="text-gray-900 flex mx-2 pt-4">
                <div className="flex-initial w-24 border border-spacing-2 text-center mr-4">
                    Home
                </div>
                <div className="flex-initial w-24 border border-spacing-2 text-center">
                    test
                </div>
            </div>
        </nav>
    )
}

export default navbar