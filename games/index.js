import { Router } from 'itty-router';

// Create a new router
const router = Router();

router.get('/games/list', async (request, env, context) => {
		let keys = await env.games.list();
		console.log(keys);

		let json = await Promise.all(keys.keys.map(key => env.games.get(key.name, { type: "json" })))
				.then(values => JSON.stringify(values));
		return new Response(json, {
				status: 200,
				headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-type": "application/json"
				}
		});
});

/*
Example post body
{
   "id": "splendor",
   "borrowed": {
     "name":"Paul",
     "email":"pajones@adobe.com",
     "date":"2023-05-12"
   }
}
*/
router.put('/games/borrow', async (request, env, context) => {
	let content = await request.json();
	if (content == undefined) {
		return new Response('Please provide borrowers information.');
	}

	let game = await env.games.get(content.id, { type: "json" });
	game.borrowed = content.borrowed;

	let json = JSON.stringify(game);
	// Just hoping it will finish correctly async.
	env.games.put(game.id, json);

		return new Response(json, {
				status: 200,
				headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-type": "application/json"
				}
		});
});

/*
Example post body
{ "id": "splendor" }
*/
router.put('/games/return', async (request, env, context) => {
		let content = await request.json();
		if (content == undefined) {
				return new Response('Please provide borrowers information.');
		}

		let game = await env.games.get(content.id, { type: "json" });
		delete game.borrowed;

		let json = JSON.stringify(game);
		// Just hoping it will finish correctly async.
		env.games.put(game.id, json);

		return new Response(json, {
				status: 200,
				headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-type": "application/json"
				}
		});
});

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: router.handle,
};
