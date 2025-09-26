import React from 'react';


function Test() {
    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '400px',
        backgroundColor: 'rgba(50, 150, 250, 0.5)', // Semi-transparent background color
        overflow: 'hidden',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '24px',
        opacity: 0,
        transition: 'opacity 0.3s',
    };

    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            style={containerStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{ ...overlayStyle, opacity: hovered ? 1 : 0 }}>
                Hello, Backdrop Filter!
            </div>
        </div>
    );
}

export default Test;