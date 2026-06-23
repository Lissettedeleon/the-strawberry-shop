import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { name, type } = body;
    const label = type === "catering" ? "Catering request" : "Contact message";
    return Response.json({ success: true, message: `${label} from ${name} received` });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});