my-website/
├── private-docs/           <-- Tracked in Git, but NOT served on the web
│   ├── cv-source.tex
│   ├── diplomas/
│   └── prizes/
├── public/                 <-- Set this as your Cloudflare Pages "Build output directory"
│   ├── index.html          <-- Main homepage
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── cv.pdf          <-- Only the compiled public PDF goes here
│   │   └── audio/          <-- Piano recordings
│   ├── music/
│   │   └── index.html      <-- Clean URL: website.com/music/
│   ├── ideas/
│   │   └── index.html      <-- Clean URL: website.com/ideas/
│   └── puzzles/
│       └── index.html      <-- Clean URL: website.com/puzzles/
