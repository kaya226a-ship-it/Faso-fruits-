import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { idea, style } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Veuillez entrer une idée d\'histoire.' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Clé GROQ_API_KEY manquante sur Vercel.' }, { status: 500 });
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
            content: `Tu es le scénariste en chef du studio FASO FRUITS. Transforme l'idée en un scénario de 12 scènes de 6 secondes. Réponds UNIQUEMENT avec un objet JSON valide suivant ce modèle exact :
            {
              "title": "Titre de l'épisode",
              "scenes": [
                {
                  "order": 1,
                  "duration": "6s",
                  "visual": "Description visuelle concise en français (style ${style})",
                  "dialogue": "Dialogue en français (12 mots max)"
                }
              ]
            }`
          },
          {
            role: 'user',
            content: `Histoire : ${idea}. Style : ${style}. Génère exactement 12 scènes courtes.`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Erreur API Groq' }, { status: 500 });
    }

    const rawText = data.choices?.at(0)?.message?.content || '{}';
    const content = JSON.parse(rawText);

    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erreur lors de la génération.' }, { status: 500 });
  }
}

