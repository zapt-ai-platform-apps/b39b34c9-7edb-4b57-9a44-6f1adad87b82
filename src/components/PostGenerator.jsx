import React from 'react';

export default function PostGenerator({
  link,
  setLink,
  writingStyle,
  setWritingStyle,
  generatedPost,
  error,
  loadingGenerate,
  loadingPublish,
  handleGeneratePost,
  handlePublishPost
}) {
  return (
    <div className="w-full max-w-xl p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">LinkedIn Post Generator</h1>
      <p className="mb-4 text-center">
        Enter a link and provide examples of your writing style to generate a LinkedIn post in your tone.
      </p>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleGeneratePost}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="link">
            Link URL
          </label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border rounded box-border"
            placeholder="https://example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="writingStyle">
            Your Writing Style Examples
          </label>
          <textarea
            id="writingStyle"
            value={writingStyle}
            onChange={(e) => setWritingStyle(e.target.value)}
            className="w-full p-2 border rounded box-border"
            placeholder="Paste examples of your writing style here..."
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded cursor-pointer disabled:opacity-50"
          disabled={loadingGenerate || loadingPublish}
        >
          {loadingGenerate ? 'Generating...' : 'Generate Post'}
        </button>
      </form>
      {generatedPost && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Generated Post Preview</h2>
          <pre className="whitespace-pre-wrap">{generatedPost}</pre>
          <button
            onClick={handlePublishPost}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded cursor-pointer disabled:opacity-50"
            disabled={loadingPublish}
          >
            {loadingPublish ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      )}
    </div>
  );
}