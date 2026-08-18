module.exports = async (req, res) => {
  const code = req.query.code;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
    });
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      res.status(400).send('Error de autenticacion: ' + (tokenData.error_description || tokenData.error));
      return;
    }

    const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });
    const message = 'authorization:github:success:' + payload;
    const messageJs = JSON.stringify(message);

    const html = '<script>' +
      '(function() {' +
      'function receiveMessage(e) {' +
      'window.opener.postMessage(' + messageJs + ', e.origin);' +
      'window.removeEventListener("message", receiveMessage, false);' +
      '}' +
      'window.addEventListener("message", receiveMessage, false);' +
      'window.opener.postMessage("authorizing:github", "*");' +
      '})();' +
      '</script>';

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (e) {
    res.status(500).send('Error en el proceso de autenticacion: ' + e.message);
  }
};
