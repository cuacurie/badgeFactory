# badgeFactory

Summary

The repository provides a simple web-based “Badge Maker.” The application is an HTML/JavaScript interface that allows users to create a badge, customize its color, shield style, banner style, icon, and text, and then download the badge as a PNG. The index.html file defines the page layout, including SVG elements for the badge preview, color picker input, and carousel controls for shield, ribbon, and icon selection. The style.css file specifies responsive styles for the page, carousel items, and buttons. The main logic lives in main.js and related modules, which defines a small starter set of icon paths and loads the rest asynchronously from multiple JSON chunks. It also contains functions for generating the badge SVG, handling color adjustments, managing carousel interactions, enabling keyboard navigation, editing text, and exporting the badge image.

To try the application locally, serve the files with a simple HTTP server rather
than opening `index.html` directly. From the repository directory you can run:

```sh
python3 -m http.server
```

and then visit <http://localhost:8000> in your browser. Loading the page through
a local server avoids browser restrictions when `fetch` requests the JSON icon
files. You can pick a color, choose icon/shield/banner styles via the carousels,
edit the badge name directly on the preview, and click “Save Badge” to download
a PNG image of your badge.

Icons used in this app are provided by Google Material Design under the Apache License 2.0.
