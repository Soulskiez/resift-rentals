const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const pages = 50;

// gets the genres and imageUrl
// everything else comes from their lovely restful endpoint
function scrapePage(pageHtml) {
  const dom = new JSDOM(pageHtml);
  const { document } = dom.window;

  const genres = Array.from(document.querySelectorAll('.movie_info a'))
    .map(n => ({ href: n.href, text: n.textContent.trim() }))
    .filter(({ href }) => href.includes('browse'))
    .filter(({ text }) => !!text)
    .map(({ text }) => text);

  const bgs = document
    .querySelector('.heroImage')
    .dataset.bgSrcset.split(',')
    .map(x => x.trim());
  const imageUrl = bgs[bgs.length - 1];

  if (!genres.length) throw new Error('no genres');
  if (!imageUrl) throw new Error('no image url');

  return { genres, imageUrl };
}

async function main() {
  const movies = [];

  for (let i = 1; i <= pages; i += 1) {
    console.log(`page ${(i / pages) * 100}%`);
    const response = await fetch(
      `https://www.rottentomatoes.com/api/private/v2.0/browse?maxTomato=100&services=amazon%3Bhbo_go%3Bitunes%3Bnetflix_iw%3Bvudu%3Bamazon_prime%3Bfandango_now&certified&sortBy=release&type=dvd-streaming-all&page=${i}`,
    );
    const data = await response.json();
    const { results } = data;

    for (const result of results) {
      try {
        // console.log(`getting ${result.title}`);
        const page = await fetch(`https://www.rottentomatoes.com${result.url}`);
        const pageHtml = await page.text();
        const { genres, imageUrl } = scrapePage(pageHtml);

        const movie = {
          id: result.id,
          name: result.title,
          imageUrl,
          posterUrl: result.posters.primary,
          synopsis: result.synopsis,
          genres,
          actors: result.actors,
          mpaaRating: result.mpaaRating,
          trailerUrl: result.mainTrailer.sourceId,
          tomatoScore: result.tomatoScore,
          theaterReleaseDate: result.theaterReleaseDate,
          runtime: result.runtime,
        };

        for (const [key, value] of Object.entries(movie)) {
          if (!value) throw new Error(`missing ${key}`);
        }

        movies.push(movie);
      } catch (e) {
        // console.warn(e);
      }
    }
  }

  await writeFile('./movies.json', JSON.stringify(movies, null, 2));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
