// essayGenerator.js
// Generate ~200-word essay in English (en), Spanish (es), Swedish (sv), or Portuguese (pt)

function generateEssay(prompt, language = 'en', targetWords = 200) {
  const langs = {
    en: {
      introStarts: [
        `The topic of ${prompt} is important because`,
        `${prompt} has become increasingly relevant since`,
        `When we consider ${prompt}, it's clear that`
      ],
      bodyStarts: [
        `One major aspect is`,
        `Another important point is`,
        `Furthermore, we must consider`
      ],
      connectors: [
        `In addition`,
        `Moreover`,
        `Consequently`,
        `For example`
      ],
      concludeStarts: [
        `In conclusion`,
        `To summarize`,
        `Ultimately`
      ],
      fillerWords: ['significantly', 'clearly', 'notably', 'importantly', 'generally'],
      extraPhrases: [
        'This observation highlights broader trends.',
        'It draws attention to opportunities and challenges that deserve thoughtful response.',
        'People and institutions must adapt and act responsibly.',
        'The implications affect social, economic, and cultural domains.',
        'Understanding these dynamics can guide better decisions.'
      ]
    },

    es: {
      introStarts: [
        `El tema de ${prompt} es importante porque`,
        `${prompt} se ha vuelto cada vez más relevante desde`,
        `Al considerar ${prompt}, queda claro que`
      ],
      bodyStarts: [
        `Un aspecto importante es`,
        `Otro punto relevante es`,
        `Además, debemos considerar`
      ],
      connectors: [
        `Además`,
        `Por otra parte`,
        `En consecuencia`,
        `Por ejemplo`
      ],
      concludeStarts: [
        `En conclusión`,
        `Para resumir`,
        `En definitiva`
      ],
      fillerWords: ['significativamente', 'claramente', 'notablemente', 'importante', 'generalmente'],
      extraPhrases: [
        'Esta observación destaca tendencias más amplias.',
        'Llama la atención sobre oportunidades y desafíos que merecen reflexión.',
        'Las personas e instituciones deben adaptarse y actuar con responsabilidad.',
        'Las implicaciones afectan dominios sociales, económicos y culturales.',
        'Comprender estas dinámicas puede guiar mejores decisiones.'
      ]
    },

    sv: {
      introStarts: [
        `Ämnet ${prompt} är viktigt eftersom`,
        `${prompt} har blivit alltmer relevant sedan`,
        `När vi betraktar ${prompt}, är det tydligt att`
      ],
      bodyStarts: [
        `En viktig aspekt är`,
        `En annan betydande punkt är`,
        `Dessutom bör vi överväga`
      ],
      connectors: [
        `Dessutom`,
        `Vidare`,
        `Som ett resultat`,
        `Till exempel`
      ],
      concludeStarts: [
        `Sammanfattningsvis`,
        `Avslutningsvis`,
        `Slutligen`
      ],
      fillerWords: ['betydligt', 'tydligt', 'anmärkningsvärt', 'viktigt', 'allmänt'],
      extraPhrases: [
        'Denna observation belyser bredare tendenser.',
        'Den pekar på möjligheter och utmaningar som kräver eftertanke.',
        'Människor och institutioner måste anpassa sig och agera ansvarsfullt.',
        'Konsekvenserna påverkar sociala, ekonomiska och kulturella områden.',
        'Att förstå dessa dynamiker kan leda till bättre beslut.'
      ]
    },

    pt: {
      introStarts: [
        `O tema ${prompt} é importante porque`,
        `${prompt} tornou-se cada vez mais relevante desde que`,
        `Ao considerar ${prompt}, fica claro que`
      ],
      bodyStarts: [
        `Um aspecto importante é`,
        `Outro ponto relevante é`,
        `Além disso, devemos considerar`
      ],
      connectors: [
        `Além disso`,
        `Por outro lado`,
        `Consequentemente`,
        `Por exemplo`
      ],
      concludeStarts: [
        `Em conclusão`,
        `Para resumir`,
        `Por fim`
      ],
      fillerWords: ['significativamente', 'claramente', 'notavelmente', 'importante', 'geralmente'],
      extraPhrases: [
        'Esta observação destaca tendências mais amplas.',
        'Chama atenção para oportunidades e desafios que merecem reflexão.',
        'Pessoas e instituições devem adaptar-se e agir com responsabilidade.',
        'As implicações afetam domínios sociais, econômicos e culturais.',
        'Compreender essas dinâmicas pode orientar melhores decisões.'
      ]
    }
  };

  const L = langs[language] || langs['en'];
  const rand = arr => arr[Math.floor(Math.random() * arr.length)];
  const wordCount = s => s.trim().split(/\s+/).filter(Boolean).length;

  const intro = `${rand(L.introStarts)} ${rand(L.fillerWords)}.`;
  const bodySentences = [];
  for (let i = 0; i < 6; i++) {
    bodySentences.push(`${rand(L.bodyStarts)} ${rand(L.fillerWords)} ${rand(L.connectors).toLowerCase()} it influences many aspects of life.`);
  }

  if (language !== 'en') {
    const tailMap = {
      es: 'que influye en muchos aspectos de la vida.',
      sv: 'som påverkar många aspekter av livet.',
      pt: 'que influencia muitos aspectos da vida.'
    };
    const tail = tailMap[language];
    for (let i = 0; i < bodySentences.length; i++) {
      bodySentences[i] = bodySentences[i].replace('it influences many aspects of life.', tail);
    }
  }

  const body = bodySentences.join(' ');
  const conclusion = `${rand(L.concludeStarts)}: ${prompt} ${rand(L.fillerWords)}.`;

  let essay = `${intro}\n\n${body}\n\n${conclusion}`;
  let wc = wordCount(essay);

  while (wc < targetWords) {
    essay += ' ' + rand(L.extraPhrases);
    wc = wordCount(essay);
    if (wc > targetWords + 40) break;
  }
  if (wc > targetWords) {
    const words = essay.split(/\s+/).slice(0, targetWords);
    essay = words.join(' ');
  }

  return { essay: essay.trim(), wordCount: wordCount(essay) };
}

const result = generateEssay("Artificial Intelligence and Society", "sv", 200);
console.log("Word count:", result.wordCount);
console.log("\n--- Essay ---\n");
console.log(result.essay);
