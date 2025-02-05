import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { createEvent } from './supabaseClient';
import PostGenerator from './components/PostGenerator';

export default function App() {
  const [link, setLink] = useState('');
  const [writingStyle, setWritingStyle] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePost = async (e) => {
    e.preventDefault();
    setError('');
    if (!link || !writingStyle) {
      setError('Please provide both a link and writing style examples.');
      return;
    }
    setLoadingGenerate(true);
    console.log('Generating post for link:', link);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const post = `Generated LinkedIn Post for ${link}:\n\nBased on your style: "${writingStyle.substring(0, 50)}...", here's a post that resonates with your voice.`;
      setGeneratedPost(post);
      createEvent('post_generated', { link });
      console.log('Post generated:', post);
    } catch (err) {
      console.error('Error generating post:', err);
      Sentry.captureException(err);
      setError('Failed to generate post. Please try again.');
    } finally {
      setLoadingGenerate(false);
    }
  };

  const handlePublishPost = async () => {
    setError('');
    if (!generatedPost) {
      setError('No post to publish.');
      return;
    }
    setLoadingPublish(true);
    console.log('Publishing post:', generatedPost);
    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post: generatedPost, link })
      });
      if (!response.ok) {
        throw new Error('Failed to publish post.');
      }
      const result = await response.json();
      console.log('Publish result:', result);
      createEvent('post_published', { link });
      alert('Post published successfully!');
      setLink('');
      setWritingStyle('');
      setGeneratedPost('');
    } catch (err) {
      console.error('Error publishing post:', err);
      Sentry.captureException(err);
      setError('Failed to publish post. Please try again.');
    } finally {
      setLoadingPublish(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      <PostGenerator
        link={link}
        setLink={setLink}
        writingStyle={writingStyle}
        setWritingStyle={setWritingStyle}
        generatedPost={generatedPost}
        error={error}
        loadingGenerate={loadingGenerate}
        loadingPublish={loadingPublish}
        handleGeneratePost={handleGeneratePost}
        handlePublishPost={handlePublishPost}
      />
      <footer className="mt-8 text-sm text-gray-600">
        <a href="https://www.zapt.ai" target="_blank" rel="noreferrer" className="cursor-pointer">
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}