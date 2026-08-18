// api/save-content.js
// Función serverless de Vercel. Recibe el contenido editado desde /admin.html
// y lo guarda en content.json dentro del repositorio de GitHub.
// Al hacer commit, Vercel detecta el cambio y vuelve a publicar el sitio automáticamente.
//
// Variables de entorno necesarias en Vercel (Project Settings > Environment Variables):
//   ADMIN_PASSWORD   -> la contraseña que usará el psicólogo para guardar cambios
//   GITHUB_TOKEN     -> Personal Access Token de GitHub con permiso de escritura sobre el repo
//   GITHUB_OWNER     -> tu usuario u organización de GitHub (ej: "robert123")
//   GITHUB_REPO      -> el nombre del repositorio (ej: "sitio-rene-chisco")
//   GITHUB_BRANCH    -> rama a actualizar (normalmente "main")

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  const { password, content } = req.body || {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Contraseña incorrecta.' });
    return;
  }

  if (!content) {
    res.status(400).json({ error: 'No se recibió contenido para guardar.' });
    return;
  }

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const token = process.env.GITHUB_TOKEN;
  const path = 'content.json';

  if (!owner || !repo || !token) {
    res.status(500).json({ error: 'Faltan variables de entorno de GitHub en Vercel.' });
    return;
  }

  try {
    // 1. Obtener el sha actual del archivo (necesario para actualizarlo)
    const getRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json'
        }
      }
    );

    let sha;
    if (getRes.ok) {
      const getData = await getRes.json();
      sha = getData.sha;
    }

    const contentString = JSON.stringify(content, null, 2);
    const contentBase64 = Buffer.from(contentString, 'utf-8').toString('base64');

    // 2. Crear o actualizar el archivo en GitHub
    const putRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Actualización de contenido desde el panel de administración',
          content: contentBase64,
          branch,
          ...(sha ? { sha } : {})
        })
      }
    );

    if (!putRes.ok) {
      const errData = await putRes.json();
      res.status(500).json({ error: 'Error al guardar en GitHub', details: errData });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Contenido actualizado. El sitio se está publicando de nuevo (tarda entre 30 y 60 segundos).'
    });
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
  }
};