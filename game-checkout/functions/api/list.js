export async function onRequest(context) {
    // if (context.request.headers.get('x-cfp') != env.CFP_PASSWORD) {
    //     return new Response(JSON.stringify({"error": "forbidden"}), {status: 403, headers: {...corsHeaders,}});
    // }
    return new Response('{"hello":"world"}');
    // let keys = await context.env.games.list();
    //
    // let json = await Promise.all(keys.keys.map(key => env.games.get(key.name, { type: "json" })))
    //     .then(values => JSON.stringify(values));
    // return new Response(json, {
    //     status: 200,
    //     headers: {
    //         ...corsHeaders,
    //         "Content-type": "application/json"
    //     }
    // });
}