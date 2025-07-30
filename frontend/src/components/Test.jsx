import React from 'react';

function Test() {
  const openPopup = () => {
    // Open a new window
    const newWindow = window.open('', 'PopupWindow', 'width=400,height=400');

    // Write HTML to the new window with a container and script tags
    newWindow.document.write(`
      <html>
        <head>
          <title>Popup Window</title>
          <!-- Include React and ReactDOM via CDN -->
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </head>
        <body>
          <div id="popup-root"></div>
          <script type="text/babel">
            // Define the React component for the popup
            function PopupComponent() {
              return (
                <div>
                  <h1>Popup Window</h1>
                  <p>This is a React component in a new window!</p>
                  <button onClick={() => window.close()}>Close Window</button>
                </div>
              );
            }

            // Render the component in the new window
            ReactDOM.render(<PopupComponent />, document.getElementById('popup-root'));
          </script>
        </body>
      </html>
    `);
    newWindow.document.close(); // Close the document to ensure rendering
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup Window</button>
    </div>
  );
}

export default Test;