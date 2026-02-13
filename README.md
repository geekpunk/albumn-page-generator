# Album Page Generator

Create a standalone web page for your album — complete with a music player, lyrics, album art, download links, and social links. No streaming service needed. Host it for free on GitHub Pages.

**[See a live example: Ligatures - Agency](https://geekpunk.github.io/ligatures-agency/)**

## What You Get

- Full album player with play/pause, previous/next, and progress seeking
- Clickable album art that flips between front and back covers
- Tracklist with per-song downloads
- Full album ZIP download
- Lyrics viewer for each track
- Social media links (Bandcamp, Instagram, GitHub, Spotify, YouTube, website)
- Shareable links to specific songs
- Fully responsive — works on phones, tablets, and desktops
- Custom color theming
- Free hosting via GitHub Pages

## What You Need

- Your songs as MP3 files
- Front and back album cover images (PNG or JPG)
- A [GitHub account](https://github.com/signup) (free)

## Quick Start

### 1. Create Your Repository

Click the green **"Use this template"** button at the top of this repo (or fork it). Name your new repository — this name becomes part of your URL:

```
https://yourusername.github.io/your-repo-name/
```

### 2. Clone It to Your Computer

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 3. Install Dependencies

You need [Node.js](https://nodejs.org/) installed (version 18 or higher). Then run:

```bash
npm install
```

### 4. Add Your Music

Copy your MP3 files into the `public/songs/` folder:

```
public/
  songs/
    my_first_song.mp3
    my_second_song.mp3
    my_third_song.mp3
```

**Tip:** Use lowercase filenames with underscores instead of spaces (e.g., `my_song.mp3` not `My Song.mp3`).

### 5. Add Your Album Art

Place your cover images in two locations:

```
images/
  Album-Front.png       <-- used for the downloadable ZIP
  Album-Back.png

public/
  images/
    Album-Front.png     <-- used by the web page
    Album-Back.png
```

You can name these files anything you want — just make sure the names match what you put in `album-config.json` (see next step).

### 6. Edit the Config

Open `public/album-config.json` and fill in your album details. This is the only file you really need to customize. See the [Config Reference](#config-reference) below for details on every field.

### 7. Set the Repository Name

Open `package.json` and change the `"name"` field to match your GitHub repository name:

```json
{
  "name": "your-repo-name",
  ...
}
```

This ensures links and assets work correctly when deployed to GitHub Pages.

### 8. Preview Locally

```bash
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`). You should see your album page with your music, art, and colors.

### 9. Deploy to GitHub Pages

Push your changes to the `main` branch:

```bash
git add -A
git commit -m "My album page"
git push origin main
```

The included GitHub Action will automatically build and deploy your site. After a minute or two, your album will be live at:

```
https://yourusername.github.io/your-repo-name/
```

**First-time setup:** You may need to enable GitHub Pages in your repository settings:
1. Go to your repo on GitHub
2. Click **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**

---

## Config Reference

The file `public/album-config.json` drives everything on the page. Here is every field explained:

### Top-Level Fields

| Field | Required | Description |
|-------|----------|-------------|
| `albumName` | Yes | The name of your album. Displayed in the header. |
| `artistName` | Yes | Your artist or band name. Displayed in the header. |
| `pageTitle` | Yes | The browser tab title (e.g., `"My Band – My Album"`). |
| `images` | Yes | Paths to your album cover images (see below). |
| `colors` | Yes | Color scheme for the page (see below). |
| `tracks` | Yes | Array of track objects (see below). |
| `credits` | No | Credits section (see below). |
| `links` | No | Social media links (see below). |
| `footer` | No | Text displayed at the bottom of the page. |
| `downloadZip` | No | Filename for the full-album ZIP download (e.g., `"my-album.zip"`). Set to `null` or remove to hide the download button. |

### `images`

```json
"images": {
  "front": "images/Album-Front.png",
  "back": "images/Album-Back.png"
}
```

Paths are relative to the `public/` folder. The front cover is shown by default; visitors click to flip and see the back.

### `colors`

```json
"colors": {
  "primary": "#5B96C7",
  "heroBackground": "#5B96C7",
  "background": "#1a1a1a",
  "text": "#e0e0e0"
}
```

| Color | What it affects |
|-------|----------------|
| `primary` | Accent color — buttons, links, track numbers, social icons, download button |
| `heroBackground` | Background of the top section (behind album art and player) |
| `background` | Main page background (tracklist, credits area) |
| `text` | Body text color |

**Tip:** For a cohesive look, set `primary` and `heroBackground` to the same color, then pick contrasting values for `background` and `text`. See [Color Examples](#color-examples) below.

### `tracks`

Each track is an object in the `tracks` array:

```json
{
  "side": "A",
  "number": "A1",
  "name": "Song Title",
  "duration": "3'30\"",
  "file": "song_filename.mp3",
  "lyrics": "First line\nSecond line\n\nNew verse"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `side` | Yes | Which side of the record: `"A"` or `"B"`. You can use any labels — the player groups tracks by side automatically. |
| `number` | Yes | Track number label displayed in the list (e.g., `"A1"`, `"B3"`). |
| `name` | Yes | The song title. |
| `duration` | Yes | Display duration as a string (e.g., `"3'30\""`). This is just for display — the player reads actual duration from the MP3 file. |
| `file` | Yes | The MP3 filename. Must match a file in `public/songs/`. |
| `lyrics` | No | Song lyrics as a string. Use `\n` for line breaks. Set to `null` if no lyrics — the Lyrics button will be hidden for that track. |

### `credits`

The credits section supports two types of paragraphs — plain text strings and rich text with links:

```json
"credits": {
  "paragraphs": [
    "Written and performed by My Band.",

    [
      { "text": "Recorded at " },
      { "text": "Cool Studio", "url": "https://coolstudio.com" },
      { "text": " in Brooklyn, NY." }
    ],

    "Mastered by Someone Great."
  ]
}
```

**Plain text:** Just a string — `"Engineered by Jane Doe."`

**Rich text with links:** An array of segments. Each segment is an object:
- `{ "text": "plain text" }` — rendered as plain text
- `{ "text": "link text", "url": "https://..." }` — rendered as a clickable link

You can mix as many plain text and link segments as you need in a single paragraph.

### `links`

Social media links displayed as icon buttons. Include only the ones you want:

```json
"links": {
  "bandcamp": "https://yourband.bandcamp.com/",
  "instagram": "https://www.instagram.com/yourband",
  "github": "https://github.com/yourusername/your-repo",
  "spotify": "https://open.spotify.com/artist/...",
  "youtube": "https://www.youtube.com/@yourband",
  "website": "https://yourband.com"
}
```

Supported types: `github`, `instagram`, `bandcamp`, `spotify`, `youtube`, `website`. Only types with built-in icons will be displayed — any unrecognized types are ignored.

---

## Color Examples

Here are some ready-to-use color schemes. Copy any `colors` block into your config:

**Ocean Blue** (default)
```json
"colors": { "primary": "#5B96C7", "heroBackground": "#5B96C7", "background": "#1a1a1a", "text": "#e0e0e0" }
```

**Crimson**
```json
"colors": { "primary": "#C74B4B", "heroBackground": "#8B2020", "background": "#1a1a1a", "text": "#e0e0e0" }
```

**Forest Green**
```json
"colors": { "primary": "#4CAF50", "heroBackground": "#2E7D32", "background": "#1a1a1a", "text": "#e0e0e0" }
```

**Purple Haze**
```json
"colors": { "primary": "#9C27B0", "heroBackground": "#6A1B9A", "background": "#121212", "text": "#e0e0e0" }
```

**Amber / Gold**
```json
"colors": { "primary": "#FFB300", "heroBackground": "#F57F17", "background": "#1a1a1a", "text": "#e0e0e0" }
```

**Monochrome**
```json
"colors": { "primary": "#ffffff", "heroBackground": "#333333", "background": "#111111", "text": "#cccccc" }
```

**Teal**
```json
"colors": { "primary": "#26A69A", "heroBackground": "#00796B", "background": "#1a1a1a", "text": "#e0e0e0" }
```

**Hot Pink**
```json
"colors": { "primary": "#E91E63", "heroBackground": "#AD1457", "background": "#1a1a1a", "text": "#e0e0e0" }
```

---

## Sharing Songs

You can link directly to a specific song by adding `?song=filename` to your URL (without the `.mp3` extension):

```
https://yourusername.github.io/your-repo-name/?song=my_first_song
```

When someone opens this link, the player will start on that track.

---

## Folder Structure

```
your-repo-name/
├── public/
│   ├── album-config.json      <-- YOUR ALBUM CONFIG (edit this)
│   ├── images/
│   │   ├── Album-Front.png    <-- your front cover
│   │   └── Album-Back.png     <-- your back cover
│   └── songs/
│       ├── song_one.mp3       <-- your MP3 files
│       ├── song_two.mp3
│       └── ...
├── images/
│   ├── Album-Front.png        <-- same covers (for the ZIP download)
│   └── Album-Back.png
├── src/                        <-- app source code (no need to edit)
├── scripts/                    <-- build scripts (no need to edit)
├── package.json                <-- change "name" to your repo name
├── vite.config.js              <-- build config (no need to edit)
└── .github/workflows/          <-- auto-deploy config (no need to edit)
```

**Files you edit:** `public/album-config.json` and `package.json` (just the name field).
**Files you add:** Your images and MP3s into `public/images/`, `public/songs/`, and `images/`.
**Files you leave alone:** Everything in `src/`, `scripts/`, and `.github/`.

---

## FAQ

**Do I need to know how to code?**
No. You only need to edit a JSON config file and copy your music/image files into the right folders.

**How much does hosting cost?**
Nothing. GitHub Pages is free for public repositories.

**Can I use formats other than MP3?**
The player uses the browser's built-in HTML5 audio. MP3 is universally supported. Other formats like OGG or WAV may work but MP3 is recommended.

**Can I have more than two sides?**
Yes. The `side` field can be any string — `"A"`, `"B"`, `"C"`, etc. The player groups and labels tracks by side automatically.

**Can I add a favicon?**
Yes. Place a `favicon.ico` file in the `public/` folder and add this line to `index.html` inside the `<head>` tag:
```html
<link rel="icon" href="favicon.ico" />
```

**How do I update my album after deploying?**
Edit your files, commit, and push to `main`. The GitHub Action will redeploy automatically.

---

## License

Do whatever you want with this. Make your album page. Play your music. DIY or die.
