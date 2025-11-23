# Video Setup Instructions

Place your hero video file in the `public/videos` directory with the following specifications:

## File Location
```
public/videos/hero-video.mp4
```

## Video Requirements

### Format
- **Container**: MP4 (H.264)
- **Codec**: H.264 for maximum browser compatibility
- **Audio**: Optional (video is muted by default)

### Recommended Specs
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Aspect Ratio**: 16:9
- **Frame Rate**: 24fps or 30fps
- **Bitrate**: 5-10 Mbps for high quality, 2-5 Mbps for web-optimized
- **Duration**: Keep under 30 seconds for optimal loading

### Optimization Tips
1. **Compress the video** using tools like:
   - HandBrake (free, cross-platform)
   - FFmpeg command:
     ```bash
     ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 5M -b:a 128k public/videos/hero-video.mp4
     ```

2. **Consider WebM format** for better compression:
   - Add a WebM version: `public/videos/hero-video.webm`
   - Update video element to include both:
     ```html
     <video>
       <source src="/videos/hero-video.webm" type="video/webm">
       <source src="/videos/hero-video.mp4" type="video/mp4">
     </video>
     ```

3. **File size recommendations**:
   - Aim for < 5MB for quick loading
   - Maximum 10-15MB to maintain good performance

## Directory Structure
```
public/
├── images/
│   └── logo.svg
└── videos/
    └── hero-video.mp4    ← Place your video here
```

## After Adding Video
1. Place your video file at `public/videos/hero-video.mp4`
2. Restart the dev server if needed: `npm run dev`
3. Video will be accessible at `http://localhost:3000/videos/hero-video.mp4`

## Troubleshooting
- **Video not playing?** Check browser console for errors
- **Format issues?** Ensure it's H.264 encoded MP4
- **Slow loading?** Compress the video file
- **Black screen?** Verify file path and permissions
