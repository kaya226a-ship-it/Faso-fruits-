import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { idea, style } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Veuillez entrer une idée d\'histoire.' }, { status: 400 });
    }

    const response = await fetch('https://groq.com', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `Tu es le scénariste en chef du studio d'animation FASO FRUITS. Transforme l'idée de l'utilisateur en un scénario structuré de 12 scènes de 6 secondes chacune. Réponds UNIQUEMENT avec un objet JSON valide sans aucun texte autour, suivant exactement ce modèle :
            {
              "title": "Titre accrocheur de l'épisode",
              "scenes": [
                {
                  "order": 1,
                  "duration": "6s",
                  "visual": "Description visuelle très précise en français (cadrage, décor, action, émotion du personnage, style ${style})",
                  "dialogue": "Dialogue naturel en français de 14 mots maximum"
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Idée de l'histoire : ${idea}. Style visuel : ${style}. Génère les 12 scènes.`
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }),
    });

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la génération du scénario.' }, { status: 500 });
  }
              }
