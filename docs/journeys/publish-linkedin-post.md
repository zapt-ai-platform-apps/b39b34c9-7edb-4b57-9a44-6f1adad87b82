# Publish LinkedIn Post

This journey explains how to publish your generated LinkedIn post.

## Steps

1. **Review the Generated Post**  
   - After generating a post preview, review it carefully in the preview section.

2. **Publish the Post**  
   - Click the "Publish Post" button.
   - The app will send your post to LinkedIn via a backend API call.
   - A loading state will indicate that the post is being published.

3. **Confirmation and Reset**  
   - Once successfully published, a success message will be displayed.
   - The form resets, allowing you to start a new post generation process.

## Important Information

- Ensure you have generated a post before attempting to publish.
- In case of failures, an error message will be shown and the error logged to Sentry.
- The publishing process simulates sending the post to LinkedIn.