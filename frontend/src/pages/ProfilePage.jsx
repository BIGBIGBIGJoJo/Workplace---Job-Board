import React, { useState, useEffect } from 'react'

const ProfilePage = () => {

  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const validateFile = (selectedFile) => {
    const allowedTypes = ['application/pdf'];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(url);
      setError('');
    } else {
      setError('Please upload a PDF file.');
    }
  };

  // Select File
  const handleSelectFile = () => {
    const fileInput = document.querySelector(".file-input")
    fileInput.click();
  }

  // Drag File
  const handleDropFile = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !name || !phone || !email) {
      setError('Please finish your profile before submitting.');
      return;
      // add some UI for successful submission...
    }

  };

  useEffect(() => {
    console.log(file, dragOver, previewUrl, name, email, summary, error)
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  });

  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center p-4`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Upload Your CV / Resume</h2>
          <div className="border-2 border-dashed rounded-lg p-6 h-10/12 overflow-y-auto flex flex-col items-center justify-center">
            {!file ? (
              <div
                className={`h-full flex flex-col items-center justify-center text-center ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onDragOver={() => setDragOver(true)}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDropFile}
              >
                <p className="text-gray-500 mb-2">Drag and drop your CV here, or</p>
                <button
                  className="upload-button block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                  onClick={handleSelectFile}
                >
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="file-input hidden"
                  />
                </button>
              </div>
            ) : (
              <div className="h-full">
                {previewUrl ? (
                  <div className="h-full">
                    <iframe
                      src={previewUrl}
                      title="CV Preview"
                      className="w-full h-8/10 border-none"
                    />
                    <button
                      className="upload-button block mx-auto mt-6 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                      onClick={handleSelectFile}
                    >
                      Browse Files
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="file-input hidden"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <p>
                      {file.type === 'application/pdf'
                        ? 'Loading preview...'
                        : `${file.name} is not available.`}
                    </p>
                    <p className="mt-5 mb-2">Please upload a PDF file</p>
                    <button
                      className="upload-button block mx-auto bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                      onClick={handleSelectFile}
                    >
                      Browse Files
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="file-input hidden"
                      />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {error && <p className="text-red-500 mt-6">{error}</p>}
        </div>


        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-gray-600">Your Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-tl-xl rounded-br-xl"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-tl-xl rounded-br-xl"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-tl-xl rounded-br-xl"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Self Summary:</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Briefly describe yourself, your qualifications and etc."
                rows="5"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage