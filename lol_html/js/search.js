module.exports = {
    HTML:(title, name, info) => {
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
      <div id="search_res"> ${name}</div>
      <div>${info.title}</div>
      </body>
      </html>
      `;
    }
  }